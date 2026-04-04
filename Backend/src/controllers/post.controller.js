import { postModel } from "../models/post.model.js";
import { generateTags, generateSummary, generateTitle, generateEmbedding, generateClustername } from "../services/ai.service.js";
import { imagetextExtractorandUpload, pdftextExtractor } from "../services/reader.service.js";
import { uploadFile } from "../services/imageupload.service.js";
import index from "../config/vectordb.js";
import { collectionModel } from "../models/collection.model.js";

export async function createPost(req, res) {
    let { url, type } = req.body
    const file = req.file
    let post = null, summary = null, title = null, text = null, collectionName = null, collectionId = null, tags = null
    if (file) {
        const buffer = file.buffer
        if (file.mimetype.startsWith("image")) {
            text = await imagetextExtractorandUpload(buffer, file.mimetype)
        }
        else {
            text = await pdftextExtractor(buffer)
        }
        url = await uploadFile(file)
        summary = await generateSummary(text)
        title = await generateTitle(text)
        tags = await generateTags(text)
    } else {
        summary = await generateSummary(url)
        title = await generateTitle(url)
        tags = await generateTags(url)
    }

    const embedding = await generateEmbedding(title + " " + summary + " " + text)
    if (!embedding || embedding.length === 0) {
        return res.status(500).json({ message: "Failed to generate embedding" })
    }
    const result = await index.query({
        vector: embedding,
        topK: 1,
        filter: {
            userId: req.user.id,
            type: "collection"
        },
        includeMetadata: true
    })
    const bestMatch = result.matches?.[0];
    if (bestMatch && bestMatch.score >= 0.94) {
        const collection = await collectionModel.findById(bestMatch.id)
        const oldcollectionembedding = collection.centroidEmbedding
        const newcollectionembedding = oldcollectionembedding.map((v, i) => {
            return ((v * collection.itemCount) + embedding[i]) / (collection.itemCount + 1);
        })
        collection.centroidEmbedding = newcollectionembedding
        collection.itemCount = collection.itemCount + 1
        await collection.save();
        await index.upsert({
            records: [
                {
                    id: collection._id.toString(),
                    values: newcollectionembedding,
                    metadata: {
                        userId: req.user.id,
                        type: "collection",
                        collectionname: collection.name
                    }
                }
            ]
        });
        collectionName = collection.name
        collectionId = collection._id
    }
    else {
        const existingcollections = await collectionModel.find({ user: req.user.id })
        const generatedcollectionName = await generateClustername(title + " " + summary + " " + text, existingcollections)

        const matchByName = existingcollections.find(c => c.name.toLowerCase() === generatedcollectionName.toLowerCase());

        if (matchByName) {
            collectionId = matchByName._id;
            collectionName = matchByName.name;
            matchByName.itemCount += 1;
            await matchByName.save();
        } else {
            const newcollection = await collectionModel.create({ user: req.user.id, name: generatedcollectionName, centroidEmbedding: embedding, itemCount: 1 })
            collectionId = newcollection._id;
            collectionName = newcollection.name;
            await index.upsert({
                records: [
                    {
                        id: newcollection._id.toString(),
                        values: embedding,
                        metadata: {
                            userId: req.user.id,
                            type: "collection",
                            collectionname: collectionName
                        }
                    }
                ]
            });
        }
    }
    post = await postModel.create({ user: req.user.id, title, summary, tags, url, type, folder: collectionName, folderId: collectionId })
    await index.upsert({
        records: [
            {
                id: post._id.toString(),
                values: embedding,
                metadata: {
                    userId: req.user.id,
                    type: "post"
                }
            }
        ]
    });
    res.status(201).json({
        message: "Post created successfully",
        post,
        collectionId,
        collectionName
    })
}
export async function getPosts(req, res) {
    const posts = await postModel.find({ user: req.user.id })
    return res.status(200).json({ message: "Posts fetched successfully", posts })
}