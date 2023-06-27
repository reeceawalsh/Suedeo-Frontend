import axios from "axios";

export default async function addToWatchlist(movies, userID) {
    if (userID && movies) {
        try {
            const response = await axios.put("/api/addToWatchlist", {
                userID,
                movies,
            });
            if (response.status === 201) {
                console.log("Added to watchlist.", response);
            } else if (response.status === 204) {
                console.log("Movie not found");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    }
}
