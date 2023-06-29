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

export default function List(props) {
    const { mediaType } = useContext(MediaTypeContext);
    // const [rating, setRating] = useState("Default");
    const [movies, setMovies] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
    let provider = convertProviders(props.provider);
    const settings = {
        dots: true, // Show dots below the slider
        infinite: true, // Should the carousel loop
        speed: 500, // Animation speed
        slidesToShow: 8, // How many slides to show at once
        slidesToScroll: 8, // How many slides to scroll at once
        adaptiveHeight: true, // Auto change height of slider
        lazyLoad: true, // Lazy loads the components as the slider moves
        responsive: [
            // Responsive breakpoints. Need to reduce amount of slides as the screen gets smaller.
            {
                breakpoint: 2200,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7,
                },
            },
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },

            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false,
                    infinite: true,
                    arrows: true,
                    centerMode: true,
                },
            },
        ],
    };

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
            <div>
                <Slider {...settings}>
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
