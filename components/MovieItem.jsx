import { useState, useEffect, useContext } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRating from "./StarRating";
import axios from "axios";
import styles from "./styles/movieItem.module.css";
import setGenre from "@component/util/helperFunctions/setGenre";
import sliceDescription from "@component/util/helperFunctions/sliceDescription";
import { useUser } from "@component/util/context/UserContext";
import genreList from "@component/lib/data/genreList";
import { useMovies } from "@component/util/context/MovieContext";
import { MediaTypeContext } from "@component/util/context/MediaTypeContext";
import { useRouter } from "next/router";
import Image from "next/image";

// Retrieves the correct path for the poster image
const getPosterURL = (poster_path) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`;
};

// Retrieves the correct path for the backdrop image
const getBackDropURL = (backdrop_path) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face/${backdrop_path}`;
};

export default function MovieItem({
    index,
    id,
    backdrop_path,
    poster_path,
    title,
    name,
    release_date,
    overview,
    genre_ids,
    genres,
    vote_average,
    first_air_date,
}) {
    const {
        likedMovies,
        dislikedMovies,
        handleRating,
        handleWatchlist,
        watchlist,
    } = useMovies();
    const [isHovered, setIsHovered] = useState(null);
    const [watch, setWatch] = useState();
    const [liked, setLiked] = useState();
    const [disliked, setDisliked] = useState();
    const [formattedGenres, setFormattedGenres] = useState();
    const { user } = useUser();
    const { mediaType } = useContext(MediaTypeContext);
    const router = useRouter();
    const [type, setType] = useState();

    const handleWatchlistClick = async () => {
        await handleWatchlist(id, mediaType);
    };

    // handles clicking on thumbs up
    const handleLikedClick = async () => {
        await handleRating(id, true, false);
    };

    // handles clicking on thumbs down
    const handleDislikedClick = async () => {
        await handleRating(id, false, true);
    };

    const handleMoreInfoClick = () => {
        router.push({
            pathname: `/${id}`,
            query: { id, type },
        });
    };

    // initially checks if the movie should be liked or disliked based on strapi backend, doesn't run again after this as it's taken over by local state.
    useEffect(() => {
        if (likedMovies?.some((movie) => movie.tmdb_id == id)) {
            // console.log("User like ", title);
            setLiked(true);
            setDisliked(false);
        } else {
            setLiked(false);
        }
        if (dislikedMovies?.some((movie) => movie.tmdb_id == id)) {
            // console.log("User dislikes ", title);
            setDisliked(true);
            setLiked(false);
        } else {
            setDisliked(false);
        }
        if (watchlist?.some((movie) => movie.tmdb_id == id)) {
            // console.log("User has ", title, " on their watch list");
            setWatch(true);
        } else {
            setWatch(false);
        }
    }, [likedMovies, dislikedMovies, watchlist]);

    useEffect(() => {
        // for the shallow data pull in on the home page. Genre names aren't provided so the set
        if (genre_ids) {
            setFormattedGenres(setGenre(genreList, genre_ids));
        }
        // for watchList when the data is more indepth and genre names are provided in the array.
        if (genres) {
            let output = genres.map((item) => item.name).join(", ");
            setFormattedGenres(output.concat("."));
        }
    }, [genre_ids, genres]);

    useEffect(() => {
        if (name) setType("tv");
        if (title) setType("movie");
    });

    return (
        <div
            className={styles.movieItem}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? (
                <>
                    <div>
                        <Image
                            className={styles.backdrop}
                            src={getBackDropURL(backdrop_path)}
                            alt=""
                        />
                        <div className={styles.itemInfo}>
                            <div className={styles.top}>
                                <div className={styles.topSubContainer}>
                                    <h1 className={styles.title}>
                                        {title}
                                        {name}
                                    </h1>
                                    {watch && user && (
                                        <StarIcon
                                            onClick={() =>
                                                handleWatchlistClick()
                                            }
                                            className={styles.watchlistStar}
                                        >
                                            <button
                                                className={styles.watchlistBtn}
                                            ></button>
                                        </StarIcon>
                                    )}
                                    {!watch && user && (
                                        <StarOutlineIcon
                                            onClick={() =>
                                                handleWatchlistClick()
                                            }
                                            className={styles.watchlistStar}
                                        >
                                            <button
                                                className={styles.watchlistBtn}
                                            ></button>
                                        </StarOutlineIcon>
                                    )}
                                </div>
                                <p className={styles.year}>
                                    {release_date || first_air_date}
                                </p>
                            </div>
                            {/* <span className={styles.duration}>{duration}</span>
              <span className={styles.rating}>{parentalRating}</span> */}
                            <div className={styles.desc}>
                                <p>
                                    {sliceDescription(title || name, overview)}
                                </p>
                            </div>
                            <div className={styles.bottomSection}>
                                <div className={styles.genre}>
                                    <p className={styles.genreText}>
                                        {formattedGenres}
                                    </p>
                                </div>
                                {user && (
                                    <div className={styles.rating}>
                                        <ThumbDownIcon
                                            onClick={() => {
                                                handleDislikedClick();
                                            }}
                                            className={
                                                disliked == true
                                                    ? "disliked thumb-down"
                                                    : "thumb thumb-down"
                                            }
                                            size="small"
                                        />
                                        <ThumbUpIcon
                                            onClick={() => {
                                                handleLikedClick();
                                            }}
                                            className={
                                                liked == true
                                                    ? "liked thumb-up"
                                                    : "thumb thumb-up"
                                            }
                                            size="small"
                                        />
                                    </div>
                                )}
                                <div className={styles.movieButtons}>
                                    <button
                                        onClick={handleMoreInfoClick}
                                        className={styles.moreInfoBtn}
                                    >
                                        More Information
                                    </button>
                                </div>
                                {/* <button onClick={changeFavourite} className={styles.favourites-btn" className={favourite ? "favourited" : "button"}>{favouriteText}</button> */}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Image
                        className={styles.poster}
                        src={getPosterURL(poster_path)}
                        alt=""
                    />
                </>
            )}
            <div className={styles.starContainer}>
                {/* <p className={styles.firstTitle}>{title}</p> */}
                <div className={styles.stars}>{StarRating(vote_average)}</div>
            </div>
        </div>
    );
}
