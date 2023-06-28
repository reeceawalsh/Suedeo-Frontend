import axios from "axios";
export default async function handler(req, res) {
    const { mediaType, provider, page } = req.query;

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.TMDB_API_KEY}&language=en-US&region=GB&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_providers=${provider}&watch_region=GB&with_watch_monetization_types=flatrate`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}
