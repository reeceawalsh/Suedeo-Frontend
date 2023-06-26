import axios from "axios";

export default async function fetchDislikedMovies(jwt) {
    if (jwt) {
        try {
            const response = await axios.get("/api/user", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            return response.data.bad_movies;
        } catch (error) {
            console.error(error.message);
        }
    }
}
