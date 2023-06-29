import Layout from "@component/components/Layout";
import Watchlist from "@component/components/Watchlist";
import { useEffect, useState, useContext } from "react";
import { useMovies } from "@component/util/context/MovieContext";
import fetchTmdbMovieInfo from "@component/util/helperFunctions/fetchTmdbMovieInfo";
import styles from "./styles/home.module.css";

export default function WatchlistPage() {
    const { watchlist } = useMovies();
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const populate = async () => {
            let moviePromises = [];
            let tvPromises = [];
            watchlist.map((item) => {
                if (item.type == "movie") {
                    moviePromises.push(
                        fetchTmdbMovieInfo(item.tmdb_id, "movie")
                    );
                } else if (item.type == "tv") {
                    tvPromises.push(fetchTmdbMovieInfo(item.tmdb_id, "tv"));
                }
            });

            let movieWatchlist = await Promise.all(moviePromises);
            movieWatchlist = movieWatchlist
                .map((item) => item?.data)
                .filter(Boolean); // Filter out any undefined values
            setMovies(movieWatchlist);

            let tvWatchlist = await Promise.all(tvPromises);
            tvWatchlist = tvWatchlist.map((item) => item?.data).filter(Boolean); // Filter out any undefined values
            setTv(tvWatchlist);

            setLoading(false);
        };
        if (watchlist) populate();
    }, [watchlist]);
    const mediaTypes = ["Movies", "Series"];
    return (
        <Layout>
            <div className="container">
                {mediaTypes.map((item, index) => {
                    return (
                        <div className={styles.container} key={index}>
                            <div className={styles.titleContainer}>
                                <h1 className={styles.title}>{item}</h1>
                                <h2 className={styles.title2}>
                                    {item == "Movies"
                                        ? movies.length === 0 &&
                                          "Movies watchlist is empty"
                                        : tv.length === 0 &&
                                          "Series watchlist is empty"}
                                </h2>
                            </div>
                            {item == "Movies" ? (
                                <Watchlist media={movies} />
                            ) : (
                                <Watchlist media={tv} />
                            )}
                        </div>
                    );
                })}
                <p className={styles.infoTip}>
                    {movies.length === 0 &&
                        tv.length === 0 &&
                        "Click the star in the top right corner of any show or movie you'd like to add to your watchlist."}
                </p>
            </div>
        </Layout>
    );
}
