import Layout from "../../components/Layout";
import List from "../../components/List";
// import styles from "./styles/home.module.css";

// route -> /home
export default function Home() {
    return (
        <Layout>
            <div className="container">
                <h1 className="streamingProvider">Netflix</h1>
                <List />
                <h1 className="streamingProvider">Amazon Prime</h1>
                <List />
                <h1 className="streamingProvider">Disney+</h1>
                <List />
                <h1 className="streamingProvider">Hulu</h1>
                <List />
            </div>
        </Layout>
    );
}
