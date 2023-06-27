import React, { createContext, useState, useContext, useEffect } from "react";
import handleRatingChange from "@component/util/helperFunctions/handleRatingChange";
import { useUser } from "@component/util/context/UserContext";
import fetchLikedMovies from "../helperFunctions/fetchLikedMovies";
import fetchDislikedMovies from "../helperFunctions/fetchDislikedMovies";
import { useCookies } from "react-cookie";

export const MovieContext = createContext();

export const useMovies = () => {
    return useContext(MovieContext);
};

export function MovieProvider({ children }) {
    const [likedMovies, setLikedMovies] = useState([]);
    const [dislikedMovies, setDislikedMovies] = useState([]);
    const { user } = useUser();
    const [cookies, setCookie, removeCookie] = useCookies(["id"]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const likedMoviesList =
                    (await fetchLikedMovies(cookies.id)) || [];
                const dislikedMoviesList =
                    (await fetchDislikedMovies(cookies.id)) || [];
                setLikedMovies(likedMoviesList);
                setDislikedMovies(dislikedMoviesList);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };
        console.log(likedMovies);
        fetchMovies();
    }, [cookies.jwt]);

    useEffect(() => {
        console.log("liked movies", likedMovies);
        console.log("disliked movies", dislikedMovies);
    }, [likedMovies, dislikedMovies]);

    const handleRating = async (id, liked, disliked) => {
        // if (loading) return;
        // setLoading(true);

        if (liked) {
            const action = likedMovies.some((m) => m.tmdb_id == id)
                ? "unlike"
                : "like";
            console.log(action);
            await handleRatingChange(
                id,
                action,
                likedMovies,
                dislikedMovies,
                user,
                setLikedMovies,
                setDislikedMovies
            );
        } else if (disliked) {
            const action = dislikedMovies.some((m) => m.tmdb_id == id)
                ? "undislike"
                : "dislike";
            await handleRatingChange(
                id,
                action,
                likedMovies,
                dislikedMovies,
                user,
                setLikedMovies,
                setDislikedMovies
            );
        }

        // setLoading(false);
    };

    const value = {
        likedMovies,
        dislikedMovies,
        handleRating,
    };

    return (
        <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
    );
}
