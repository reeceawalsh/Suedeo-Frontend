import "@component/styles/globals.css";
import "../styles/reset.css";
import Head from "next/head";
import { UserProvider } from "../util/context/UserContext";
import { CookiesProvider } from "react-cookie";
import { MediaTypeProvider } from "@component/util/context/MediaTypeContext";

export default function App({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <UserProvider>
                <MediaTypeProvider>
                    <Head>
                        <title>Suedeo Movies</title>
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1"
                        ></meta>
                    </Head>
                    <Component {...pageProps} />
                </MediaTypeProvider>
            </UserProvider>
        </CookiesProvider>
    );
}
