import React from "react";
import styles from "./styles/season.module.css";
import StarRating from "./StarRating";
const Season = ({ season, seriesOverview }) => {
    const {
        name,
        poster_path,
        overview,
        vote_average,
        air_date,
        episode_count,
    } = season;
    console.log(seriesOverview);
    return (
        <div className={styles.container}>
            <h2>{name}</h2>
            <div className={styles.subContainer}>
                <div className={styles.poster}>
                    <img
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        alt={name}
                    />
                    <div className={styles.rating}>
                        {StarRating(vote_average)}
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.overview}>
                        <h3>Overview</h3>
                        <p>
                            {overview.length !== 0 ? overview : seriesOverview}
                        </p>
                    </div>
                    <div className={styles.stats}>
                        <h3>Stats</h3>
                        <p>
                            Rating: {vote_average} | Air Date: {air_date} |
                            Episodes: {episode_count}
                        </p>
                        {/* <p>Air Date: {air_date}</p>
                        <p>Episode Count: {episode_count}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Season;
