import styles from "./styles/information.module.css";
import Link from "next/link";

const MovieInformation = ({ data }) => {
    const {
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
    } = data;
    https: return (
        <div className={styles.container}>
            <div className={styles.infoSection}>
                <div>
                    <h1>{title}</h1>
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
            </div>

            <div className={styles.extraInfo}>
                <div className={styles.rightInfo}>
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

                    <p>
                        <strong>Status:</strong> {status}
                    </p>

                    <p>
                        <strong>Vote average:</strong> {vote_average}
                    </p>
                </div>
                <img
                    className={styles.backdrop}
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt={title}
                />
            </div>
        </div>
    );
};

export default MovieInformation;
