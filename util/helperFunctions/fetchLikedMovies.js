import axios from "axios";

export default async function fetchLikedMovies(id) {
    if (id) {
        try {
            const response = await axios.get(`/api/getUserDetails?id=${id}`);
            console.log(response.data);
            return response.data.liked_movies;
        } catch (error) {
            console.error(error.message);
        }
    }
}
