import addToDisliked from "@component/util/helperFunctions/addToDisliked";
import addToLiked from "@component/util/helperFunctions/addToLiked";
import fetchMovieId from "./fetchMovieId";

const handleRatingChange = async (
    movieId,
    action,
    likedMovies,
    dislikedMovies,
    user,
    setLikedMovies,
    setDislikedMovies
) => {
    // Fetch the movie ID from your service
    const movie = { id: await fetchMovieId(movieId), tmdb_id: movieId };

    // Checks if movie is already in likedMovies or dislikedMovies
    const isLiked = likedMovies.some((m) => m.tmdb_id === movie.tmdb_id);
    const isDisliked = dislikedMovies.some((m) => m.tmdb_id === movie.tmdb_id);
    console.log(dislikedMovies);
    console.log(movie.tmdb_id);
    console.log(isDisliked);
    console.log(action);
    let newLikedMovies = [...likedMovies];
    let newDislikedMovies = [...dislikedMovies];

    // fine till here
    if (action === "like") {
        newLikedMovies.push(movie);
        if (isDisliked) {
            newDislikedMovies = newDislikedMovies.filter(
                (m) => m.id !== movie.id
            );
        }
        console.log(newLikedMovies, "new liked movies");
    } else if (action === "unlike") {
        newLikedMovies = newLikedMovies.filter((m) => m.id !== movie.id);
    } else if (action === "dislike") {
        newDislikedMovies.push(movie);
        if (isLiked) {
            newLikedMovies = newLikedMovies.filter((m) => m.id !== movie.id);
        }
    } else if (action === "undislike") {
        newDislikedMovies = newDislikedMovies.filter((m) => m.id !== movie.id);
    }

    const tempLiked = newLikedMovies.map((m) => m.id);
    const tempDisliked = newDislikedMovies.map((m) => m.id);

    console.log(tempLiked, "liked movies");
    console.log(tempDisliked, "disliked movies");

    setLikedMovies(newLikedMovies);
    setDislikedMovies(newDislikedMovies);
    // Update the backend
    await addToDisliked(tempDisliked, user.id);
    await addToLiked(tempLiked, user.id);
};

export default handleRatingChange;
