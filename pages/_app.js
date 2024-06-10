import "@component/styles/globals.css";
import "../styles/reset.css";
import Head from "next/head";
import { UserProvider } from "../util/context/UserContext";
import { CookiesProvider } from "react-cookie";
import { MediaTypeProvider } from "@component/util/context/MediaTypeContext";
import { MovieProvider } from "@component/util/context/MovieContext";

export default function App({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <UserProvider>
                <MovieProvider>
                    <MediaTypeProvider>
                        <Head>
                            <title>Suedeo</title>
                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1"
                            ></meta>
                        </Head>
                        <Component {...pageProps} />
                    </MediaTypeProvider>
                </MovieProvider>
            </UserProvider>
        </CookiesProvider>
    );
}
