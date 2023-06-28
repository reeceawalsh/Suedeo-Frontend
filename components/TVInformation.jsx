import styles from "./styles/information.module.css";
import Link from "next/link";
import { useMovies } from "@component/util/context/MovieContext";
import { useState, useEffect, useContext } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useUser } from "@component/util/context/UserContext";
import StarRating from "./StarRating";
import Seasons from "./Seasons";
import Image from "next/image";

const TVInformation = ({ data, type }) => {
    const {
        id,
        poster_path,
        backdrop_path,
        name,
        overview,
        genres,
        homepage,
        first_air_date,
        status,
        number_of_episodes,
        number_of_seasons,
        tagline,
        seasons,
        last_air_date,
        vote_average,
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

    const handleLikedClick = async () => {
        await handleRating(id, true, false);
    };

    const handleDislikedClick = async () => {
        await handleRating(id, false, true);
    };

    const handleWatchlistClick = async () => {
        await handleWatchlist(id, type);
    };

    useEffect(() => {
        if (likedMovies?.some((show) => show.tmdb_id == id)) {
            setLiked(true);
            setDisliked(false);
        } else {
            setLiked(false);
        }
        if (dislikedMovies?.some((show) => show.tmdb_id == id)) {
            setDisliked(true);
            setLiked(false);
        } else {
            setDisliked(false);
        }
        if (watchlist?.some((show) => show.tmdb_id == id)) {
            setWatch(true);
        } else {
            setWatch(false);
        }
    }, [likedMovies, dislikedMovies, watchlist]);

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.infoSection}>
                    <div>
                        <h1>{name}</h1>
                        <p>{overview}</p>
                        {homepage.length !== 0 && (
                            <button className={styles.btn}>
                                <Link
                                    href={homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {homepage.includes("netflix")
                                        ? "Watch on Netflix"
                                        : "Visit Homepage"}
                                </Link>
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.middleSection}>
                    <img
                        className={styles.poster}
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        alt={name}
                    />
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
                                        <button
                                            className={styles.watchlistBtn}
                                        ></button>
                                    </StarIcon>
                                )}
                                {!watch && (
                                    <StarOutlineIcon
                                        onClick={() => handleWatchlistClick()}
                                        className={styles.watchlistStar}
                                    >
                                        <button
                                            className={styles.watchlistBtn}
                                        ></button>
                                    </StarOutlineIcon>
                                )}
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
                </div>

                <div className={styles.extraInfo}>
                    <div className={styles.rightInfo}>
                        <div className={styles.rating}>
                            {StarRating(vote_average)}
                        </div>

                        <p>
                            <strong>First aired:</strong> {first_air_date}
                        </p>
                        <p>
                            <strong>Genres:</strong>{" "}
                            {genres.map((genre) => genre.name).join(", ")}
                        </p>
                        <p>
                            <strong>Number of episodes:</strong>{" "}
                            {number_of_episodes}
                        </p>
                        <p>
                            <strong>Number of seasons:</strong>{" "}
                            {number_of_seasons}
                        </p>
                        <p>
                            <strong>Status:</strong> {status}
                        </p>
                        <p>
                            <strong>Last air date:</strong> {last_air_date}
                        </p>
                        <p>
                            <strong>Vote average:</strong> {vote_average}
                        </p>
                    </div>
                    <div>
                        <img
                            className={styles.backdrop}
                            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                            alt={name}
                        />
                        {tagline && (
                            <p className={styles.tagline}>
                                &apos;{tagline}&apos;
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.seasons}>
                <Seasons seasons={seasons} seriesOverview={overview} />
            </div>
        </div>
    );
};

export default TVInformation;
