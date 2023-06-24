import MovieItem from "./MovieItem";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles/list.module.css";

// https://api.themoviedb.org/3/discover/movie?api_key=&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')

export default function List({ streamingProvider }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // fetch movie
        axios
            .get(
                "https://api.themoviedb.org/3/movie/popular?api_key=dbe4608d19182e24de51d5d4e342e8df&language=en-US&page=1"
            )
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={styles.list}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {movies.map((movie, index) => {
                        return <MovieItem key={index} {...movie} />;
                    })}
                </div>
            </div>
        </div>
    );
}
