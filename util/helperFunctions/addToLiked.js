import axios from "axios";
import fetchLikedMovies from "./fetchLikedMovies";

export default async function addToLiked(movie, userID, jwt) {
    console.log("Movie to add to liked movies.", movie);
    const movies = await fetchLikedMovies(jwt);
    if (userID && movies) {
        try {
            const response = await axios.put("/api/addToLiked", {
                userID,
                movies,
            });
            if (response.status === 201) {
                console.log("Added to liked movies", response);
            } else if (response.status === 204) {
                console.log("Movie not found");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    }
}
