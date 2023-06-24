import MovieItem from "./MovieItem";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles/list.module.css";
import convertProviders from "@component/util/helperFunctions/convertProviders";

export default function List(props) {
    const [movies, setMovies] = useState([]);
    const [mediaType, setMediaType] = useState("movie");
    let provider = convertProviders(props.provider);

    const changeMediaType = () => {
        setMediaType((prevState) => {
            return prevState === "movie" ? "tv" : "movie";
        });
        changeMedia();
        loadPages();
    };

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

    let changeTo = mediaType === "movie" ? "Movies" : "Series";

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

    useEffect(() => {
        changeMediaType();
    }, [provider]);

    return (
        <div className={styles.list}>
            {/* <button 
        type="button"
        className="toggleBtn" 
        onClick={changeMediaType}
        >
        {changeTo}
        </button> */}
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
