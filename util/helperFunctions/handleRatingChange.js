import addToDisliked from "@component/util/helperFunctions/addToDisliked";
import addToLiked from "@component/util/helperFunctions/addToLiked";
import fetchMovieId from "@component/util/helperFunctions//fetchMovieId";

// This function is used to update the list of liked and disliked movies locally and on the backend.
const handleRatingChange = async (
    movieId,
    action,
    likedMovies,
    dislikedMovies,
    user,
    setLikedMovies,
    setDislikedMovies
) => {
    // Uses the tmdb_id (from the api) to get the local id of the movie from the database. Creates an object with the local id and the tmdb_id.
    const movie = { id: await fetchMovieId(movieId), tmdb_id: movieId };

    // Checks if movie is already in likedMovies or dislikedMovies.
    const isLiked = likedMovies.some((m) => m.id === movie.id);
    const isDisliked = dislikedMovies.some((m) => m.id === movie.id);

    // Create new arrays for likedMovies and dislikedMovies to prevent mutating the original state.
    let newLikedMovies = [...likedMovies];
    let newDislikedMovies = [...dislikedMovies];

    // Handle different actions.
    if (action === "like") {
        // Add the movie to liked movies.
        newLikedMovies.push(movie);
        // If the movie was disliked, remove it from disliked movies.
        if (isDisliked) {
            newDislikedMovies = newDislikedMovies.filter(
                (m) => m.id !== movie.id
            );
        }
    } else if (action === "unlike") {
        // Remove the movie from the liked movies.
        newLikedMovies = newLikedMovies.filter((m) => m.id !== movie.id);
    } else if (action === "dislike") {
        // Add the movie to disliked movies.
        newDislikedMovies.push(movie);
        // If the movie was liked, remove it from liked movies.
        if (isLiked) {
            newLikedMovies = newLikedMovies.filter((m) => m.id !== movie.id);
        }
    } else if (action === "undislike") {
        // Remove the movie from disliked movies.
        newDislikedMovies = newDislikedMovies.filter((m) => m.id !== movie.id);
    }

    // Create an array of ids for liked and disliked. This is the format required to send to the backend, just a list of local id's.
    const tempLiked = newLikedMovies.map((m) => m.id);
    const tempDisliked = newDislikedMovies.map((m) => m.id);

    // Console logs for debugging.
    console.log(tempLiked, "liked movies");
    console.log(tempDisliked, "disliked movies");

    // Update state variables.
    setLikedMovies(newLikedMovies);
    setDislikedMovies(newDislikedMovies);

    // Update the backend.
    await addToDisliked(tempDisliked, user.id);
    await addToLiked(tempLiked, user.id);
};

export default handleRatingChange;
