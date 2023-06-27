import axios from "axios";
export default async function fetchTmdbMovieInfo(id, type) {
    if (id) {
        try {
            const response = await axios.get(
                `/api/getMovieDetail?type=${type}&id=${id}`
            );
            return response;
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    } else {
        console.error("Invalid name or id passed to fetch movie id.");
    }
}
