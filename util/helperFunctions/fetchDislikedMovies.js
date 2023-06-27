import axios from "axios";

export default async function fetchDislikedMovies(id) {
    if (id) {
        try {
            const response = await axios.get(`/api/getUserDetails?id=${id}`);
            return response.data.bad_movies;
        } catch (error) {
            console.error(error.message);
        }
    }
}
