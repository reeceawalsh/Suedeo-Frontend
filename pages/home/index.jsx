import Layout from "../../components/Layout";
import List from "../../components/List";
import movieList from "@component/lib/data/movieList";
import styles from "./styles/home.module.css";

// route -> /home
export default function Home({ mediaType, togglemediatype }) {
    return (
        <Layout>
            <div className="container">
                {movieList.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className={styles.titleContainer}>
                                <h1 className={styles.title}>{item}</h1>
                            </div>
                            <List
                                key={item}
                                provider={item}
                                mediaType={mediaType}
                                togglemediatype={togglemediatype}
                            />
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
}
