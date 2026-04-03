import ImageKit, { toFile } from "@imagekit/nodejs";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_KIT_KEY
});

export const uploadFile = async (file) => {
    const uploadedFile = await imagekit.files.upload({
        file: await toFile(Buffer.from(file.buffer)),
        fileName: file.originalname,
        folder: "posts"
    });
    return uploadedFile.url;
};