import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import axios from "axios";
import styles from "./styles/movieItem.module.css";

let genres = [];
axios
    .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=dbe4608d19182e24de51d5d4e342e8df&language=en-GB"
    )
    .then((response) => {
        let temp = response.data.genres;
        for (let i = 0; i < temp.length; i++) {
            let genre = [temp[i].id, temp[i].name];
            genres.push(genre);
        }
    })
    .catch((err) => {
        console.log(err);
    });

// Set the genre of the movie.
const setGenre = (genre_ids) => {
    let genre = "";
    // Get genre
    for (let i = 0; i < genre_ids.length; i++) {
        for (let j = 0; j < genres.length; j++) {
            if (genres[j][0] === genre_ids[i]) {
                if (i < genre_ids.length - 1) {
                    genre += genres[j][1] + ", ";
                } else {
                    genre += genres[j][1] + ".";
                }
            }
        }
    }
    return genre;
};

// Retrieves the correct path for the poster image
const getPosterURL = (poster_path) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`;
};

// Retrieves the correct path for the backdrop image
const getBackDropURL = (backdrop_path) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face/${backdrop_path}`;
};

// Ensures the description is only 150 characters long.
const description = (title, overview) => {
    let length = 230; // Change length of text
    try {
        if (title.length > 30) {
            length = 100;
        } else if (title.length > 25) {
            length = 140;
        } else if (title.length > 16 && title.length < 25) {
            length = 170;
        }
    } catch (e) {
        console.log(e);
    }

    // Adds ... to the end. Checks to make sure if the cut off is at a space, or the end of a sentence.
    if (overview.length > length) {
        if (overview.slice(length - 1, length) === ".") {
            return overview.slice(0, length - 1) + "...";
        } else if (overview.slice(length - 1, length) === " ") {
            return overview.slice(0, length - 1) + "...";
        } else {
            return overview.slice(0, length) + "...";
        }
    } else {
        return overview;
    }
};

// Checks to see how well rated the movie is out of 10 then translates it into stars.
const starRating = (vote_average) => {
    const stars = [
        <StarOutlineIcon className={styles.star} />,
        <StarOutlineIcon className={styles.star} />,
        <StarOutlineIcon className={styles.star} />,
        <StarOutlineIcon className={styles.star} />,
        <StarOutlineIcon className={styles.star} />,
    ];

    const outOfFive = vote_average / 2;
    const decimalPart = outOfFive.toString().split(".")[1];
    for (let i = 0; i + 0.9 < outOfFive; i++) {
        stars[i] = <StarIcon className={styles.star} />;
    }
    if (decimalPart !== 0 && decimalPart >= 5) {
        stars[outOfFive] = <StarHalfIcon className={styles.star} />;
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
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [rating, setRating] = useState("Default");
    const [favourite, setFavourite] = useState(false);

    // Handle likes and dislikes
    const like = () => {
        setRating("liked");
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
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
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
                                <p className={styles.year}>{release_date}</p>
                            </div>
                            {/* <span className={styles.duration}>{duration}</span>
              <span className={styles.rating}>{parentalRating}</span> */}
                            <div className={styles.desc}>
                                <p>{description(title || name, overview)}</p>
                            </div>
                            <div className={styles.bottomSection}>
                                <div className={styles.genre}>
                                    <p className={styles.genreText}>
                                        {setGenre(genre_ids)}
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
                                        onClick={like}
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
