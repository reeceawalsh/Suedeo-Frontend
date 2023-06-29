import styles from "./styles/information.module.css";
import Link from "next/link";
import { useMovies } from "@component/util/context/MovieContext";
import { useState, useEffect, useContext } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useUser } from "@component/util/context/UserContext";
import StarRating from "./StarRating";
import Image from "next/image";
import sliceAndFormat from "@component/util/helperFunctions/sliceAndFormat";

const MovieInformation = ({ data, type }) => {
    const {
        id,
        poster_path,
        title,
        overview,
        genres,
        homepage,
        release_date,
        runtime,
        status,
        vote_average,
        backdrop_path,
        imdb_id,
        tagline,
    } = data;

    const {
        likedMovies,
        dislikedMovies,
        handleRating,
        handleWatchlist,
        watchlist,
    } = useMovies();
    const [watch, setWatch] = useState();
    const [liked, setLiked] = useState();
    const [disliked, setDisliked] = useState();
    const { user } = useUser();

    // handles clicking on thumbs up
    const handleLikedClick = async () => {
        await handleRating(id, true, false);
    };

    // handles clicking on thumbs down
    const handleDislikedClick = async () => {
        await handleRating(id, false, true);
    };

    const handleWatchlistClick = async () => {
        await handleWatchlist(id, type);
    };

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

    return (
        <div className={styles.subContainer}>
            <div className={styles.infoSection}>
                <div>
                    <h1>{title}</h1>
                    <p>{sliceAndFormat(500, overview)}</p>
                    {user && (
                        <div className={styles.userInteractions}>
                            <div className={styles.thumbdown}>
                                <ThumbDownIcon
                                    onClick={() => {
                                        handleDislikedClick();
                                    }}
                                    className={
                                        disliked == true ? "disliked" : "thumb"
                                    }
                                    size="small"
                                />
                            </div>
                            <div className={styles.rating}>
                                {StarRating(vote_average)}
                            </div>

                            <div className={styles.thumbup}>
                                <ThumbUpIcon
                                    onClick={() => {
                                        handleLikedClick();
                                    }}
                                    className={
                                        liked == true ? "liked" : "thumb"
                                    }
                                    size="small"
                                />
                            </div>
                        </div>
                    )}
                    {homepage.length !== 0 && (
                        <button className={styles.btn}>
                            <Link
                                href={homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {homepage.includes("netflix")
                                    ? "Watch on Netflix"
                                    : "Homepage"}
                            </Link>
                        </button>
                    )}
                    {imdb_id.length !== 0 && (
                        <button className={styles.btn}>
                            <Link
                                href={`https://www.imdb.com/title/${imdb_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                IMDB
                            </Link>
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.middleSection}>
                <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    alt={title}
                />

                <div className={styles.watchlist}>
                    <a
                        className={styles.watchlisttext}
                        onClick={() => handleWatchlistClick()}
                    >
                        Add to watchlist
                    </a>
                    {watch && user && (
                        <StarIcon
                            onClick={() => handleWatchlistClick()}
                            className={styles.watchlistStarFull}
                        >
                            <button className={styles.watchlistBtn}></button>
                        </StarIcon>
                    )}
                    {!watch && (
                        <StarOutlineIcon
                            onClick={() => handleWatchlistClick()}
                            className={styles.watchlistStar}
                        >
                            <button className={styles.watchlistBtn}></button>
                        </StarOutlineIcon>
                    )}
                </div>
            </div>

            <div className={styles.extraInfo}>
                <div className={styles.rightInfo}>
                    <div className={styles.rightInfo1}>
                        <p>
                            <strong>Release Date:</strong> {release_date}
                        </p>
                        <p>
                            <strong>Genres:</strong>{" "}
                            {genres.map((genre) => genre.name).join(", ")}
                        </p>
                        <p>
                            <strong>Runtime:</strong> {runtime} mins
                        </p>
                    </div>
                    <div className={styles.rightInfo2}>
                        <p>
                            <strong>Status:</strong> {status}
                        </p>

                        <p>
                            <strong>Vote average:</strong> {vote_average}
                        </p>
                    </div>
                </div>

                <div>
                    <img
                        className={styles.backdrop}
                        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                        alt={title}
                    />
                    {tagline && (
                        <p className={styles.tagline}>&apos;{tagline}&apos;</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieInformation;
