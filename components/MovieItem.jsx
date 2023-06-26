import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import axios from "axios";
import styles from "./styles/movieItem.module.css";
import setGenre from "@component/util/helperFunctions/setGenre";
import sliceDescription from "@component/util/helperFunctions/sliceDescription";
import addToLiked from "@component/util/helperFunctions/addToLiked";
import { useUser } from "@component/util/context/UserContext";
import { useCookies } from "react-cookie";
import fetchMovieId from "@component/util/helperFunctions/fetchMovieId";
import genres from "@component/lib/data/genres";

const getLocalMovieData = async () => {
    if (movie) {
        const movieData = await fetchMovieId(movie.tmdb_id, movie.title);
        console.log(movieData);
        return movieData;
    }
};

// Retrieves the correct path for the poster image
const getPosterURL = (poster_path) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`;
};

// Retrieves the correct path for the backdrop image
const getBackDropURL = (backdrop_path) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face/${backdrop_path}`;
};

// Checks to see how well rated the movie is out of 10 then translates it into stars.
const starRating = (vote_average) => {
    const stars = [
        <StarOutlineIcon key={1} className={styles.star} />,
        <StarOutlineIcon key={2} className={styles.star} />,
        <StarOutlineIcon key={3} className={styles.star} />,
        <StarOutlineIcon key={4} className={styles.star} />,
        <StarOutlineIcon key={5} className={styles.star} />,
    ];

    const outOfFive = vote_average / 2;
    const decimalPart = outOfFive.toString().split(".")[1];
    let i;
    for (let i = 0; i + 0.9 < outOfFive; i++) {
        stars[i] = <StarIcon key={i} className={styles.star} />;
    }
    if (decimalPart !== 0 && decimalPart >= 5) {
        stars[outOfFive] = <StarHalfIcon key={i} className={styles.star} />;
    }

    return stars;
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
    vote_average,
    first_air_date,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [rating, setRating] = useState("Default");
    const [favourite, setFavourite] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
    const { user } = useUser();

    // Handle likes and dislikes
    const handleLike = async () => {
        await addToLiked(id, user.id, cookies.jwt);
    };

    const dislike = () => {
        setRating("disliked");
    };

    // Favourites
    const changeFavourite = () => {
        setFavourite(!favourite);
    };

    return (
        <div
            className={styles.movieItem}
            // style={{
            //     left:
            //         isHovered && typeof index === "number"
            //             ? index * 225 - 50 + index * 2.5
            //             : "auto",
            // }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? (
                <>
                    <div>
                        <img
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
                                    {favourite && (
                                        <StarIcon
                                            onClick={changeFavourite}
                                            className={styles.favouriteStar}
                                        >
                                            <button
                                                className={styles.favouriteBtn}
                                            ></button>
                                        </StarIcon>
                                    )}
                                    {!favourite && (
                                        <StarOutlineIcon
                                            onClick={changeFavourite}
                                            className={styles.favouriteStar}
                                        >
                                            <button
                                                className={styles.favouriteBtn}
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
                                        {setGenre(genres, genre_ids)}
                                    </p>
                                </div>
                                <div className={styles.rating}>
                                    <ThumbDownIcon
                                        onClick={dislike}
                                        className={
                                            rating === "disliked"
                                                ? "disliked thumb-down"
                                                : "thumb thumb-down"
                                        }
                                        size="small"
                                    />
                                    <ThumbUpIcon
                                        onClick={handleLike}
                                        className={
                                            rating === "liked"
                                                ? "liked thumb-up"
                                                : "thumb thumb-up"
                                        }
                                        size="small"
                                    />
                                </div>
                                <div className={styles.movieButtons}>
                                    <button className={styles.moreInfoBtn}>
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
                    <img
                        className={styles.poster}
                        src={getPosterURL(poster_path)}
                        alt=""
                    />
                </>
            )}
            <div className={styles.starContainer}>
                {/* <p className={styles.firstTitle}>{title}</p> */}
                <div className={styles.stars}>{starRating(vote_average)}</div>
            </div>
        </div>
    );
}
