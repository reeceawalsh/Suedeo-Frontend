import axios from "axios";

export default async function fetchWatchList(id) {
    if (id) {
        try {
            const response = await axios.get(`/api/getUserDetails?id=${id}`);
            return response.data.watch_list;
        } catch (error) {
            console.error(error.message);
        }
    }
}
