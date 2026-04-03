import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as homeApi from "../Services/home.api";
import { setCollections, setPosts, setLoading, setError } from "../home.slice";

export const useHome = () => {
    const dispatch = useDispatch();
    const { collections, posts, loading, error } = useSelector((state) => state.home);

    const fetchHomeData = useCallback(async () => {
        dispatch(setLoading(true));
        try {
            const collectionsData = await homeApi.getCollections();
            const postsData = await homeApi.getPosts();
            
            dispatch(setCollections(collectionsData.collections));
            dispatch(setPosts(postsData.posts));
            dispatch(setError(null));
        } catch (err) {
            dispatch(setError(err.message || "Failed to fetch neural pathways"));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    useEffect(() => {
        fetchHomeData();
    }, [fetchHomeData]);

    return {
        collections,
        posts,
        loading,
        error,
        fetchHomeData
    };
};
