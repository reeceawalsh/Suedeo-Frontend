import React, { useEffect } from "react";
import styles from "./styles/landingPage.module.css";
import Link from "next/link";
import { useUser } from "@component/util/context/UserContext";
import { useRouter } from "next/router";

export default function LandingPage() {
    const { user } = useUser();
    const router = useRouter();
    // redirect logged-out users to the homepage
    useEffect(() => {
        if (user) {
            router.push("/home");
        }
    }, [user, router]);
    return (
        <div className={styles.container}>
            <button
                className={styles.skip}
                onClick={() => router.push("/home")}
            >
                Continue as Guest
            </button>
            <div className={styles.subContainer}>
                <h1 className={styles.title}>
                    Welcome to <span className="yellow">Suedeo</span>
                </h1>
                <h2 className={styles.subtitle}>
                    Sign Up For <span className="yellow">Tailored</span> Movie
                    Recommendations
                </h2>
                <p className={styles.desc}>
                    Tired of browsing through hundreds of TV Shows and Movies?
                    We deliver the best and latest recommendations for you. Grab
                    your popcorn and{" "}
                    <Link href="/signup" className={`yellow ${styles.link}`}>
                        sign up for free
                    </Link>{" "}
                    today!
                </p>
                <div>
                    <Link href="/signup">
                        <button className="btn">Sign up!</button>
                    </Link>
                    <Link href="/login">
                        <button className="btn">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
