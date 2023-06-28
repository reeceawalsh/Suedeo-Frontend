import { useRouter } from "next/router";
import TVInformation from "../../components/TVInformation";
import MovieInformation from "../../components/MovieInformation";
import fetchTmdbMovieInfo from "@component/util/helperFunctions/fetchTmdbMovieInfo";
import Layout from "@component/components/Layout";
import { useState, useEffect } from "react";

const MovieName = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { id, type } = router.query;
    // fetch the movie/tv show data based on the type
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        const populate = async () => {
            let promises = [];
            promises.push(await fetchTmdbMovieInfo(id, type));
            let mediaInfo = await Promise.all(promises);
            setData(mediaInfo[0].data);
            setLoading(false);
        };
        if (id) populate();
    }, [id]);

    console.log(data);

    return (
        <div>
            {!loading && (
                <Layout>
                    {type === "tv" ? (
                        <TVInformation data={data} type={type} />
                    ) : (
                        <MovieInformation data={data} type={type} />
                    )}
                </Layout>
            )}
        </div>
    );
};

export default MovieName;
