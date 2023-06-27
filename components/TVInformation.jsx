import styles from "./styles/information.module.css";

const TVInformation = ({ data }) => {
    const {
        poster_path,
        name,
        overview,
        first_air_date,
        genres,
        homepage,
        number_of_episodes,
        number_of_seasons,
        status,
        seasons,
        last_air_date,
        vote_average,
    } = data;

    return (
        <div className={styles.container}>
            <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt={name}
            />
            <div className={styles.infoSection}>
                <div>
                    <h1>{name}</h1>
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
                        <strong>First aired:</strong> {first_air_date}
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
                        <strong>Number of episodes:</strong>{" "}
                        {number_of_episodes}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Number of seasons:</strong> {number_of_seasons}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Status:</strong> {status}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Last air date:</strong> {last_air_date}
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

export default TVInformation;
