const setGenre = (genres, genre_ids) => {
    let genre = "";
    console.log(genres);
    // Get genre
    for (let i = 0; i < genre_ids.length; i++) {
        for (let j = 0; j < genres.length; j++) {
            if (genres[j][0] === genre_ids[i]) {
                if (i < genre_ids.length - 1) {
                    genre += genres[j][1] + ", ";
                } else {
                    genre += genres[j][1] + ".";
                }
            }
        }
    }
    return genre;
};

export default setGenre;
