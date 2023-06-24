import Navbar from "./Navbar";
import { Suspense } from "react";
import Footer from "./Footer";
import styles from "./styles/layout.module.css";
import Spinner from "./Spinner";

// this component will encompass all other pages and display a spinner if the google maps api hasn't loaded yet. this is important as it will throw an error if it's rendered before loading.
const Layout = ({ children }) => {
    return (
        <>
            <div className={styles.pageContainer}>
                <Navbar />
                <Suspense fallback={<Spinner />}>
                    <main className={styles.main}>{children}</main>
                </Suspense>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
