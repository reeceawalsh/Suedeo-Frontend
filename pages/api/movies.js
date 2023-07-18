import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const movieData = req.body.data.movieData;
        try {
            const response = await axios.post(
                `${process.env.BACKEND_URL}/movies/batch`,
                {
                    data: {
                        movieData,
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
            console.error("Error in handler:", error);
            res.status(500).json({
                error: "An error occurred whilst adding movies.",
            });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
