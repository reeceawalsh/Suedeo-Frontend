import axios from "axios";

// updates the users list of favourites
export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { uuid, movies } = req.body;
        const data = JSON.stringify({
            movies: movies,
        });
        try {
            const response = await axios.put(
                `${process.env.BACKEND_URL}/users/${uuid}?populate=*`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
