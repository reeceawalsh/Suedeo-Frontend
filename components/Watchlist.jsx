import MovieItem from "./MovieItem";
import styles from "./styles/watchlist.module.css";

export default function Watchlist({ media }) {
    console.log(media);
    return (
        <div className={styles.list}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {media.map((item, index) => (
                        <MovieItem key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
