import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getCollections, getPosts } from "../Services/home.api";
import { setCollections, setPosts, setLoading, setError, addPost } from "../home.slice";

export const useHome = () => {
    const dispatch = useDispatch();
    const { collections, posts, loading, error } = useSelector((state) => state.home);

    const fetchHomeData = async () => {
        dispatch(setLoading(true));
        try {
            const collectionsData = await getCollections();
            const postsData = await getPosts();

            if (collectionsData?.collections) dispatch(setCollections(collectionsData.collections));
            if (postsData?.posts) dispatch(setPosts(postsData.posts));
            dispatch(setError(null));
        } catch (err) {
            dispatch(setError(err.message || "Failed to fetch neural pathways"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCreatePost = async (payload) => {
        dispatch(setLoading(true));
        try {
            const formData = new FormData();
            formData.append('url', payload.content);
            formData.append('type', payload.type);

            if (payload.file) {
                formData.append('file', payload.file);
            }

            const response = await createPost(formData);

            if (response?.post) {
                dispatch(addPost(response.post));
                fetchHomeData();
            }
            dispatch(setError(null));
            return response;
        } catch (err) {
            const errorMessage = err?.message || "Failed to create post";
            dispatch(setError(errorMessage));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        collections,
        posts,
        loading,
        error,
        fetchHomeData,
        handleCreatePost
    };
};
