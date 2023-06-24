import React from "react";
import styles from "./styles/login.module.css";

export default function Login() {
    return (
        <div className={styles.loginPageContainer}>
            {/* This is the left hand side of login page */}
            <div className={styles.left}>
                <div className={styles.leftContent}>
                    <h1 className={styles.title}>
                        Get The Best Movie Recommendations
                    </h1>
                    <h3 className={styles.leftDesc}>
                        We deliver the best and latest TV and Film
                        recommendations that are currently available on the
                        platforms of your choice. Choose movies that you love,
                        or hate, in order to give us the best chance of
                        providing perfect matches for you. Grab your popcorn and
                        sign up for free today!
                    </h3>
                    <button
                        className={`btn btn-xl cta-btn ${styles.signupBtn}`}
                    >
                        Sign up!
                    </button>
                </div>
            </div>
            <div className="container">
                <img
                    id="profile-img"
                    src={require("../public/RectangleLogo.png")}
                    alt="Users profile"
                />
            </div>
        </div>
    );
}
