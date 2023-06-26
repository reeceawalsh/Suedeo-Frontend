import MovieItem from "./MovieItem";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styles from "./styles/list.module.css";
import convertProviders from "@component/util/helperFunctions/convertProviders";
import { MediaTypeContext } from "@component/util/context/MediaTypeContext";
import fetchMovieId from "@component/util/helperFunctions/fetchMovieId";

export default function List(props) {
    const { mediaType } = useContext(MediaTypeContext);
    const [movies, setMovies] = useState([]);
    let provider = convertProviders(props.provider);

    const changeMediaType = () => {
        changeMedia();
        loadPages();
    };

    useEffect(() => {
        changeMediaType();
    }, [mediaType]);

    const changeMedia = () => {
        axios
            .get(
                `https://api.themoviedb.org/3/discover/${mediaType}?api_key=dbe4608d19182e24de51d5d4e342e8df&language=en-US&region=GB&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=${provider}&watch_region=GB&with_watch_monetization_types=flatrate`
            )
            .then((response) => {
                setMovies([...response.data.results]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadPages = () => {
        for (let i = 2; i < 10; i++) {
            axios
                .get(
                    `https://api.themoviedb.org/3/discover/${mediaType}?api_key=dbe4608d19182e24de51d5d4e342e8df&language=en-US&region=GB&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&with_watch_providers=${provider}&watch_region=GB&with_watch_monetization_types=flatrate`
                )
                .then((response) => {
                    setMovies((prev) => [...prev, ...response.data.results]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className={styles.list}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Add the movie to strapi and  */}
                    {movies.map((movie, index) => {
                        return <MovieItem key={movie.id} {...movie} />;
                    })}
                </div>
            </div>
        </div>
    );
}
