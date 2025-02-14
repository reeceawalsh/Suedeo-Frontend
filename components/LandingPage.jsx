import React, { useEffect } from "react";
import styles from "./styles/landingPage.module.css";
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
            <div className={styles.subContainer}>
                <h1 className={styles.title}>
                    Welcome to <span className="yellow">Suedeo</span>
                </h1>
                <h2 className={styles.subtitle}>
                    See latest offerings from popular providers you subscribe
                    to.
                </h2>
                <p className={styles.desc}>
                    Tired of browsing through hundreds of TV Shows and Movies?
                    We deliver the best and latest recommendations for you. Grab
                    your popcorn and{" "}
                    <span className={`yellow `}>start watching</span> today!
                </p>
                <button className="btn" onClick={() => router.push("/home")}>
                    Continue
                </button>
                {/* <div>
                    <Link href="/signup">
                        <button className="btn">Sign up!</button>
                    </Link>
                    <Link href="/login">
                        <button className="btn">Login</button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
}
