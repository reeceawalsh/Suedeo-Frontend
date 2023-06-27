import React, { createContext, useState, useContext, useEffect } from "react";
import handleRatingChange from "@component/util/helperFunctions/handleRatingChange";
import { useUser } from "@component/util/context/UserContext";
import fetchLikedMovies from "../helperFunctions/fetchLikedMovies";
import fetchDislikedMovies from "../helperFunctions/fetchDislikedMovies";
import { useCookies } from "react-cookie";
import fetchWatchList from "../helperFunctions/fetchWatchList";
import handleWatchlistToggle from "../helperFunctions/handleWatchlist";

export const MovieContext = createContext();

export const useMovies = () => {
    return useContext(MovieContext);
};

export function MovieProvider({ children }) {
    const [likedMovies, setLikedMovies] = useState([]);
    const [dislikedMovies, setDislikedMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const { user } = useUser();
    const [cookies, setCookie, removeCookie] = useCookies(["id"]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [likedMoviesList, dislikedMoviesList, watchlistList] =
                    await Promise.all([
                        fetchLikedMovies(cookies.id),
                        fetchDislikedMovies(cookies.id),
                        fetchWatchList(cookies.id),
                    ]);

                setLikedMovies(likedMoviesList || []);
                setDislikedMovies(dislikedMoviesList || []);
                setWatchlist(watchlistList || []);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

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
    };

    const handleWatchlist = async (id) => {
        await handleWatchlistToggle(id, watchlist, setWatchlist, user);
    };

    const value = {
        likedMovies,
        dislikedMovies,
        handleRating,
        handleWatchlist,
        watchlist,
    };

    return (
        <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
    );
}
