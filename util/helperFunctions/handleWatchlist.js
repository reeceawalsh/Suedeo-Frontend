import fetchMovieId from "./fetchMovieId";
import addToWatchlist from "./addToWatchList";

const handleWatchlistToggle = async (
    movieId,
    watchlist,
    setWatchlist,
    user,
    mediaType
) => {
    // Fetch the local id, using the tmdb_id (api) id.
    const movie = { id: await fetchMovieId(movieId), tmdb_id: movieId };

    // Add a parameter called type that is either tv or movie.
    if (mediaType == "tv") movie.type = "tv";
    if (mediaType == "movie") movie.type = "movie";

    // Create a copy to prevent mutating the original state.
    let newWatchlist = [...watchlist];

    // True if the movie is on the watchlist and false if its not.
    const onWatchList = newWatchlist.some((m) => m.id == movie.id);

    // If it is, remove it, if its not then add it.
    if (onWatchList) {
        newWatchlist = newWatchlist.filter((m) => m.id != movie.id);
    } else {
        newWatchlist.push(movie);
    }

    // Create an array of all of the local ids to be used to add to the users watchlist.
    const tempWatchlist = newWatchlist.map((m) => m.id);

    // Update local state.
    setWatchlist(newWatchlist);

    // Update the backend
    await addToWatchlist(tempWatchlist, user.id);
};

export default handleWatchlistToggle;
