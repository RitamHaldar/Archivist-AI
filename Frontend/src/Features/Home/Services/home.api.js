import axios from "axios";

const api = axios.create({
    baseURL: "https://archivist-ai.onrender.com",
    withCredentials: true,
});

export const getPosts = async () => {
    try {
        const response = await api.get("/api/posts/get-posts");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createPost = async (formData) => {
    try {
        const response = await api.post("/api/posts/create", formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getCollections = async () => {
    try {
        const response = await api.get("/api/collections/get-collections");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const semanticSearch = async (query) => {
    try {
        const response = await api.post("/api/posts/semantic-search", { query });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

