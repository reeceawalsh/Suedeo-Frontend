import axios from "axios";
export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id, type } = req.query;
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
