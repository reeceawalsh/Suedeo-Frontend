export default async function handler(req, res) {
    if (req.method === "POST") {
        const { tmdb_id, title, type } = req.query;

        try {
            const response = await axios.post(
                `${process.env.BACKEND_URL}/movies/batch`,
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
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
