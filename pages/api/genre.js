import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const response = await axios.get(
                `${process.env.BACKEND_URL}/genres`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response);

            const genres = response.data.map((genre) => [genre.id, genre.name]);
            console.log(genres);
            res.status(200).json({ genres });
        } catch (error) {
            res.status(500).json({ error: "Error retrieving genres" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
