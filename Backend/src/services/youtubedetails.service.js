import axios from "axios";

export const getVideoDetails = async (url) => {
    let id;
    if (url.includes("youtu.be/")) {
        id = url.split("youtu.be/")[1].split("?")[0];
    } else {
        id = url.split("v=")[1].split("&")[0];

    }
    console.log(id)
    const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
            params: {
                part: "snippet,contentDetails",
                id: id,
                key: process.env.YOUTUBE_API_KEY
            }
        }
    );

    const data = res.data.items[0];

    const result = {
        title: data.snippet.title,
        description: data.snippet.description,
    };
    return JSON.stringify(result);
};