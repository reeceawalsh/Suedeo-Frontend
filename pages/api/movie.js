import axios from "axios";

// handles adding a restaurant to the database, takes a yelp id and a name.
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { tmdb_id, title, type } = req.query;

        try {
            const response = await axios.post(
                `${process.env.BACKEND_URL}/movies`,
                {
                    data: {
                        tmdb_id,
                        title,
                        type,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({
                // error: "An error occurred whilst adding a movie.",
            });
        }
    } else if (req.method === "GET") {
        const { tmdb_id } = req.query;
        try {
            const response = await axios.get(
                `${process.env.BACKEND_URL}/movies?filters[tmdb_id][$eq]=${tmdb_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                    },
                }
            );

            if (response.data.data.length > 0) {
                res.status(200).json(response.data.data);
            } else {
                res.status(204).json({ message: "No movie found in Strapi." });
            }
        } catch (error) {
            console.error("Error in movie.js:", error);
            res.status(500).json({
                message: "An error occurred whilst searching for a movie.",
            });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
