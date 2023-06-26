import addToDisliked from "@component/util/helperFunctions/addToDisliked";
import addToLiked from "@component/util/helperFunctions/addToLiked";
import fetchMovieId from "./fetchMovieId";

const handleRatingChange = async (
    movieId,
    type,
    prevType,
    likedMovies,
    dislikedMovies,
    user
) => {
    // Fetch the movie ID from your service
    const movie = { id: await fetchMovieId(movieId), tmdb_id: movieId };
    // Checks if movie is already in likedMovies or dislikedMovies
    const isLiked = likedMovies.some((m) => m.id === movie.id);
    const isDisliked = dislikedMovies.some((m) => m.id === movie.id);
    // Depending on the new rating, update the liked and disliked movies arrays
    if (type === "liked") {
        // Remove from disliked if there and not already in liked
        if (!isLiked) {
            if (isDisliked) {
                dislikedMovies = dislikedMovies.filter(
                    (m) => m.id !== movie.id
                );
            }
            // Add to liked
            likedMovies.push(movie);
        } else {
            likedMovies = likedMovies.filter((m) => m.id !== movie.id);
        }
    } else if (type === "disliked") {
        if (!isDisliked) {
            // Remove from liked if there and not already in disliked
            if (isLiked) {
                likedMovies = likedMovies.filter((m) => m.id !== movie.id);
            }
            // Add to disliked
            dislikedMovies.push(movie);
        } else {
            dislikedMovies = dislikedMovies.filter((m) => m.id !== movie.id);
        }
    }

    const tempLiked = likedMovies.map((m) => m.id);
    const tempDisliked = dislikedMovies.map((m) => m.id);

    console.log(tempLiked, "liked movies");
    console.log(tempDisliked, "disliked movies");
    // Update the backend
    await addToDisliked(tempDisliked, user.id);
    await addToLiked(tempLiked, user.id);
};

export default handleRatingChange;
