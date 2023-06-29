import MovieItem from "./MovieItem";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styles from "./styles/list.module.css";
import convertProviders from "@component/util/helperFunctions/convertProviders";
import { MediaTypeContext } from "@component/util/context/MediaTypeContext";
import { useCookies } from "react-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderSettings from "@component/lib/data/sliderSettings";
import fetchMovieId from "@component/util/helperFunctions/fetchMovieId";

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
    //         // will fetch the id if it's in the db and add it to the db if its not.
    //         await fetchMovieId(movie.id, title, mediaType);
    //     }
    // };

    useEffect(() => {
        changeMediaType();
    }, [mediaType]);

    const changeMedia = () => {
        axios
            .get(
                `/api/fetchMovies?mediaType=${mediaType}&provider=${provider}&page=1`
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
                    `/api/fetchMovies?mediaType=${mediaType}&provider=${provider}&page=${i}`
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

    return (
        <div>
            <div className="listContainer">
                <Slider {...sliderSettings}>
                    {movies.map((movie, index) => {
                        return (
                            <MovieItem key={movie.id + "provider"} {...movie} />
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}
