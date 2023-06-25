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
            {/* This is the left hand side of login page */}
            <div className={styles.subContainer}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Welcome to <span className="yellow">Suedeo Movies</span>
                    </h1>
                    <h2 className={styles.subtitle}>
                        Sign Up For {""}
                        <span className="yellow">Tailored</span> Movie
                        Recommendations
                    </h2>
                    <h3 className={styles.desc}>
                        Tired of having to browse through hundreds of TV Shows
                        and Movies on multiple streaming platforms? We deliver
                        the best and latest{" "}
                        <span className="yellow">TV and Film</span>{" "}
                        recommendations that are currently available on the
                        platforms of your choice. Choose movies that you love,
                        or hate, in order to give us the best chance of
                        providing a perfect match for you. Grab your popcorn and{" "}
                        <span className="yellow">sign up for free</span> today!
                    </h3>
                    <div className="btns">
                        <Link href="/signup">
                            <button className="btn">Sign up!</button>
                        </Link>
                        <Link href="/login">
                            <button className="btn">Login</button>
                        </Link>
                        <Link href="/home">
                            <button className="btn">Continue as Guest</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
