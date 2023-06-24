import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Star from "@mui/icons-material/Star";
import styles from "./styles/movieItem.module.css";

// Retrieves the correct path for the poster image
const getPosterURL = (poster_path) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`;
};

// Retrieves the correct path for the backdrop image
const getBackDropURL = (backdrop_path) => {
    return `https://www.themoviedb.org/t/p/w440_and_h660_face/${backdrop_path}`;
};

// Ensures the description is only 150 characters long.
const description = (overview) => {
    const length = 180; // Change length of text
    if (overview.length > length) {
        return overview.slice(0, length) + "...";
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
    if (decimalPart != 0 && decimalPart >= 5) {
        stars[outOfFive] = <StarHalfIcon className={styles.star} />;
    }
    return stars;
};

export default function MovieItem({
    index,
    backdrop_path,
    poster_path,
    title,
    release_date,
    overview,
    genre_ids,
    vote_average,
    genres,
}) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className={styles.movieItem}
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                className={styles.poster}
                src={getPosterURL(poster_path)}
                alt=""
            />
            {isHovered && (
                <>
                    <div className={(styles.backdrop, styles.container)}>
                        <img
                            className={styles.backdrop}
                            src={getBackDropURL(backdrop_path)}
                            alt=""
                        />
                        <div className={styles.itemInfo}>
                            <span className={styles.title}>{title}</span>
                            <div className={styles.itemInfoTop}>
                                {/* <span className={styles.duration}>{duration}</span>
              <span className={styles.rating}>{parentalRating}</span> */}
                                <span className={styles.year}>
                                    {release_date}
                                </span>
                            </div>
                            <div className={styles.desc}>
                                <p>{description(overview)}</p>
                            </div>
                            <div className={styles.genre}>Genre</div>
                            <div className={styles.rating}>
                                <ThumbDownIcon
                                    className={styles.rating}
                                    size="small"
                                />
                                <ThumbUpIcon
                                    className={styles.rating}
                                    size="small"
                                />
                            </div>
                            <div className={styles.movieButtons}>
                                <button className={styles.button}>
                                    Watch Later
                                </button>
                                <button className={styles.button}>
                                    Add to Favourites
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className={styles.bottom}>
                {/* <span className="firstTitle">{title}</span> */}
                <div className={styles.stars}>{starRating(vote_average)}</div>
            </div>
        </div>
    );
}
