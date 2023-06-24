import List from "../../Components/List/List";

const movieLists = [
    "Netflix",
    "Disney Plus",
    "Sky",
    "Amazon Prime Video",
    "Now TV",
];

const MovieChoice = () => {
    return (
        <div className="container">
            {movieLists.map((item) => {
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
