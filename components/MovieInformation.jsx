import styles from "./styles/information.module.css";

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
    } = data;

    return (
        <div className={styles.container}>
            <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt={title}
            />
            <div className={styles.infoSection}>
                <div>
                    <h1>{title}</h1>
                    <p>{overview}</p>
                    <a
                        href={homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Homepage
                    </a>
                </div>
                <div>
                    <p>
                        <strong>Release Date:</strong> {release_date}
                    </p>
                    <p>
                        <strong>Genres:</strong>{" "}
                        {genres.map((genre) => genre.name).join(", ")}
                    </p>
                </div>
            </div>
            <div className={styles.extraInfo}>
                <div>
                    <p>
                        <strong>Runtime:</strong> {runtime} mins
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Status:</strong> {status}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Vote average:</strong> {vote_average}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieInformation;
