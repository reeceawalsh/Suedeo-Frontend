import React, { createContext, useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "@component/util/context/UserContext";

// Helper functions
import handleRatingChange from "@component/util/helperFunctions/handleRatingChange";
import fetchLikedMovies from "../helperFunctions/fetchLikedMovies";
import fetchDislikedMovies from "../helperFunctions/fetchDislikedMovies";
import fetchWatchList from "../helperFunctions/fetchWatchList";
import handleWatchlistToggle from "../helperFunctions/handleWatchlist";

// Create a new context for Movie.
export const MovieContext = createContext();

// A hook that allows the use of MovieContext from anywhere in the application.
export const useMovies = () => {
    return useContext(MovieContext);
};

// This is a Provider component that wraps its children with the Movie context, giving it's children access to the values.
export function MovieProvider({ children }) {
    // Set state for likedMovies, dislikedMovies and watchlist. Storing these here ensures they are accessible and up to date everywhere.
    const [likedMovies, setLikedMovies] = useState([]);
    const [dislikedMovies, setDislikedMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const { user } = useUser(); // Get the current user from User context
    const [cookies, setCookie, removeCookie] = useCookies(["id"]); // Access the id cookie.

    // When the jwt cookie changes (i.e. the user changes), fetch the movies that the user likes, dislikes, and watches.
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Create an array for each correlating promise to resolve into.
                const [likedMoviesList, dislikedMoviesList, watchlistList] =
                    await Promise.all([
                        fetchLikedMovies(cookies.id),
                        fetchDislikedMovies(cookies.id),
                        fetchWatchList(cookies.id),
                    ]);

                // Update state variables with their corresponding arrays of data. If they don't exist then update with an empty array, i.e. the user doesn't have any movies in that category.
                setLikedMovies(likedMoviesList || []);
                console.log(likedMovies);
                setDislikedMovies(dislikedMoviesList || []);
                setWatchlist(watchlistList || []);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        // Need to create and call a function because a promise is returned and useEffect expects nothing or a cleanup function be returned.
        fetchMovies();
    }, [cookies.jwt]);

    // This useEffect is used for debugging and checking movies are being added where they are supposed to be. Console.logging directly after these functions in the fetchMovies function wont show the correct state because setState is asynchronous and it wont have updated when the console.log is called.
    useEffect(() => {
        console.log("liked movies", likedMovies);
        console.log("disliked movies", dislikedMovies);
        console.log("watchlist", watchlist);
    }, [likedMovies, dislikedMovies, watchlist]);

    // Handle rating function, calls helper function to change the like/dislike status of a movie. A movie cannot be liked and disliked simultaneously so liking a disliked movie involves two operations. First it must be removed from disliked, and then added to liked.
    const handleRating = async (id, liked, disliked) => {
        if (liked) {
            // Checking what the action should be. If the movie is liked, then the button is being clicked to unlike the movie. If it's not currently liked then the button is being clicked to like the movie.
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
            // Checking what the action should be. If the movie is disliked, then the button is being clicked to undislike the movie. If it's not currently disliked then the button is being clicked to dislike the movie.
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

    // Handle watchlist function, calls helper function to add/remove a movie to/from the watchlist. This function takes an id and a mediaType. The id is the tmdb_id, which will be used to grab the Strapi id, to add it to the watchlist. The media type is from the MediaTypeContext and will add a type to the movie before adding it to the watchlist. Now the watchlist page can toggle between tv shows and movies.
    const handleWatchlist = async (id, mediaType) => {
        await handleWatchlistToggle(
            id,
            watchlist,
            setWatchlist,
            user,
            mediaType
        );
    };

    // These are accessible through the useMovies context.
    const value = {
        likedMovies,
        dislikedMovies,
        handleRating,
        handleWatchlist,
        watchlist,
    };

    // Render the context provider with children components wrapped inside.
    return (
        <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
    );
}
