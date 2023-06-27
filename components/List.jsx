import MovieItem from "./MovieItem";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styles from "./styles/list.module.css";
import convertProviders from "@component/util/helperFunctions/convertProviders";
import { MediaTypeContext } from "@component/util/context/MediaTypeContext";
import fetchLikedMovies from "@component/util/helperFunctions/fetchLikedMovies";
import fetchDislikedMovies from "@component/util/helperFunctions/fetchDislikedMovies";
import fetchMovieId from "@component/util/helperFunctions/fetchMovieId";
import { useCookies } from "react-cookie";

export default function List(props) {
    const { mediaType } = useContext(MediaTypeContext);
    // const [rating, setRating] = useState("Default");
    const [movies, setMovies] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
    let provider = convertProviders(props.provider);

    const changeMediaType = () => {
        changeMedia();
        loadPages();
    };

    // const getLocalMovieData = async (movie) => {
    //     let title = movie.title;
    //     if (!title) title = movie.name;
    //     if (movie) {
    //         // will fetch the id if it's in strapi and add it to strapi if its not.
    //         await fetchMovieId(movie.id, title, mediaType);
    //     }
    // };

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

    // useEffect(() => {
    //     movies.forEach((movie) => {
    //         getLocalMovieData(movie);
    //     });
    // }, [movies]);

    // const handleRating = (id) => {
    //     let currentRating = "Default";
    //     likedMovies?.forEach((movie) => {
    //         if (movie.tmdb_id == id) currentRating = "liked";
    //     });
    //     dislikedMovies?.forEach((movie) => {
    //         if (movie.tmdb_id == id) currentRating = "disliked";
    //     });
    //     return currentRating;
    // };
    console.log(movies);
    return (
        <div className={styles.list}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {movies.map((movie, index) => {
                        console.log(movie);
                        return (
                            <MovieItem key={movie.id + "provider"} {...movie} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
