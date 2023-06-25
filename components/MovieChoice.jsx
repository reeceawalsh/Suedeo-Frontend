import List from "../../Components/List/List";
import movieList from "@component/lib/data/movieList";

const MovieChoice = () => {
    return (
        <div className="container">
            {movieList.map((item) => {
                return (
                    <>
                        {item}
                        <List provider={item} />
                    </>
                );
            })}
        </div>
    );
};

export default MovieChoice;
