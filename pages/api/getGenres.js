import axios from "axios";

export default async function handler(req, res) {
    try {
        const apiKey = process.env.TMDB_API_KEY;
        const response = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-GB`
        );

        const genres = response.data.genres.map((genre) => [
            genre.id,
            genre.name,
        ]);

        res.status(200).json({ genres });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving genres" });
    }
}
