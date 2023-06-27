import axios from "axios";

async function updateWatchlist(userID, movies, retryCount = 0) {
    const maxRetries = 3;
    try {
        const data = JSON.stringify({
            watch_list: movies,
        });

        const response = await axios.put(
            `${process.env.BACKEND_URL}/users/${userID}?populate=*&`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                    "Content-Type": "application/json",
                },
                maxBodyLength: Infinity,
            }
        );

        return response.data;
    } catch (error) {
        if (error.message.includes("Deadlock") && retryCount < maxRetries) {
            console.log("Deadlock detected, retrying...");
            return updateWatchlist(userID, movies, retryCount + 1);
        } else {
            throw error;
        }
    }
}

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { userID, movies } = req.body;

        console.log("Movies to add to watchlist", movies);
        try {
            const response = await updateWatchlist(userID, movies);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
