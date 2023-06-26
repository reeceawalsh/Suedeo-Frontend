const setGenre = (genres, genre_ids) => {
    let genre = "";
    // Get genre
    for (let i = 0; i < genre_ids.length; i++) {
        for (let j = 0; j < genres.length; j++) {
            if (genres[j].id === genre_ids[i]) {
                if (i < genre_ids.length - 1) {
                    genre += genres[j].genre + ", ";
                } else {
                    genre += genres[j].genre + ".";
                }
            }
        }
    }
    return genre;
};

export default setGenre;
