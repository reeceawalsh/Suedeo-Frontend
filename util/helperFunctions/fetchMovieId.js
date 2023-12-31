import axios from "axios";
export default async function fetchMovieId(id, title, type) {
    let movie;
    let uuid; // this is the local movie id in strapi.
    if (id) {
        try {
            const response = await axios.get(`/api/movie?tmdb_id=${id}`);
            if (response.data.length > 0) {
                movie = response.data[0].attributes;
                uuid = response.data[0].id;
                return uuid;
            } else {
                // need to add the movie to the collection
                const createResponse = await axios.post(
                    `/api/movie?tmdb_id=${id}&title=${title}&type=${type}`
                );
                movie = createResponse.data.data[0];
                return movie;
            }
        } catch (error) {
            // console.error("An error occurred:", error.message);
        }
    } else {
        console.error("Invalid name or id passed to fetch movie id.");
    }
}
