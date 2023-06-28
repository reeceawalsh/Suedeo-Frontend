import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import styles from "./styles/movieItem.module.css";

const StarRating = (vote_average) => {
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

export default StarRating;
