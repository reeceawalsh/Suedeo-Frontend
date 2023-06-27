import fetchMovieId from "./fetchMovieId";
import addToWatchlist from "./addToWatchList";

const handleWatchlistToggle = async (
    movieId,
    watchlist,
    setWatchlist,
    user,
    mediaType
) => {
    // Fetch the movie ID from your service
    const movie = { id: await fetchMovieId(movieId), tmdb_id: movieId };
    if (mediaType == "tv") movie.type = "tv";
    if (mediaType == "movie") movie.type = "movie";
    let newWatchlist = [...watchlist];

    const onWatchList = newWatchlist.some((m) => m.id == movie.id);

    if (onWatchList) {
        newWatchlist = newWatchlist.filter((m) => m.id != movie.id);
    } else {
        newWatchlist.push(movie);
    }

    const tempWatchlist = newWatchlist.map((m) => m.id);
    console.log(newWatchlist);

    setWatchlist(newWatchlist);
    // Update the backend
    await addToWatchlist(tempWatchlist, user.id);
};

export default handleWatchlistToggle;
