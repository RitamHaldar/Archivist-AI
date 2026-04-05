import { ChatMistralAI, MistralAIEmbeddings } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, createAgent } from "langchain"
import { tool } from "@langchain/core/tools"
import { z } from "zod"
import { extractContent } from "./websitescrap.service.js"
import { getVideoDetails } from "./youtubedetails.service.js"

const model = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-small-latest"
})

const scraptool = tool(
    async ({ url }) => {
        return await extractContent(url)
    },
    {
        name: "extractContent",
        description: "Extract text content from a website URL",
        schema: z.object({
            url: z.string().describe("The URL of the website to scrape")
        })
    }
)

const youtubetool = tool(
    async ({ url }) => {
        return await getVideoDetails(url)
    },
    {
        name: "getVideoDetails",
        description: "Extract details like title and description from a YouTube video URL use only if the link contains youtube.com or youtube",
        schema: z.object({
            url: z.string().describe("The URL of the YouTube video")
        })
    }
)

const agent = createAgent({
    model,
    tools: [scraptool, youtubetool],
    systemMessage: "You are a helpful assistant that can extract information from images, websites, and YouTube videos. Use the tools provided when a URL or image is mentioned.",
})

export async function generateTags(content) {
    const systemPromt = `You are a tagging assistant.

Your task is to generate between 5 and 10 relevant tags for the given content.

Strict Rules:

Return only a valid JSON array of strings.
Do not include any explanation, notes, headings, markdown, or extra text.
Each tag must be:
lowercase
a single word only
short and relevant to the content
Hyphens are allowed only when necessary (example: "machine-learning").
Do not use spaces inside tags.
Do not generate duplicate tags.
Do not generate generic tags unless they are clearly relevant.
Do not generate more than 10 tags or fewer than 5 tags.
Tags must describe the main topics, themes, technologies, industries, or concepts in the content.
Output must always follow this exact format:

["tag1","tag2","tag3"]`
    const response = await agent.invoke({
        messages: [
            new SystemMessage(systemPromt),
            new HumanMessage(content)
        ]
    })
    let text = response.messages[response.messages.length - 1].content;
    text = text.replace(/```json\n?|```/g, "").trim();
    return JSON.parse(text);
}


export async function generateSummary(content) {
    const systemPromt = `You are a summarization assistant.

Generate a concise summary of the following content.

Rules:
- Summary should be deatiled and of 60 to 70 words
- Use clear and concise language
- Return only the summary
`
    const response = await agent.invoke({
        messages: [
            new SystemMessage(systemPromt),
            new HumanMessage(content)
        ]
    })
    return response.messages[response.messages.length - 1].content
}

export async function generateTitle(content) {
    const systemPromt = `You are a title generation assistant.

Generate a catchy and relevant title for the following content.

Rules:
- Title should be short
- Use clear and concise language
- Return only the title
`
    const response = await agent.invoke({
        messages: [
            new SystemMessage(systemPromt),
            new HumanMessage(content)
        ]
    })
    return response.messages[response.messages.length - 1].content
}

export async function generateEmbedding(content) {
    const embedding = new MistralAIEmbeddings({
        apiKey: process.env.MISTRAL_API_KEY,
        model: "mistral-embed"
    })
    const result = await embedding.embedQuery(content)
    return result
}

export async function generateClustername(content, existingcollections) {
    const systemPromt = `You are a professional taxonomy and research categorization assistant.
    
    Categorize the following content into a high-level, relevant research cluster name.
    Existing clusters in the system: ${existingcollections.map(collection => collection.name).join(", ")}
    
    Categorization Rules:
    - The name should be professional, short (1-2 words), and represent a broad but distinct topic (e.g., 'Software Engineering', 'Neuroscience', 'Finance', 'System Design').
    - If the content is technical/code-related, use the specific programming language name (e.g., 'Java', 'Python', 'React') only if it is the primary focus.
    - If it's a general technical resource, use a descriptive name like 'Software Engineering' or 'Data Science'.
    - If an existing cluster from the list above is a PERFECT fit, return that EXACT name.
    - Differentiate between related but distinct technologies (e.g., do NOT put 'Java' in a 'Python' cluster).
    - Return ONLY the name.
`
    const response = await agent.invoke({
        messages: [
            new SystemMessage(systemPromt),
            new HumanMessage(content)
        ]
    })
    return response.messages[response.messages.length - 1].content
}