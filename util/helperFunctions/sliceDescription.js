const sliceDescription = (title, overview) => {
    let length = 230; // Change length of text
    try {
        if (title.length > 30) {
            length = 100;
        } else if (title.length > 25) {
            length = 140;
        } else if (title.length > 16 && title.length < 25) {
            length = 170;
        }
    } catch (e) {
        console.log(e);
    }

    // Adds ... to the end. Checks to make sure if the cut off is at a space, or the end of a sentence.
    if (overview.length > length) {
        if (overview.slice(length - 1, length) === ".") {
            return overview.slice(0, length - 1) + "...";
        } else if (overview.slice(length - 1, length) === " ") {
            return overview.slice(0, length - 1) + "...";
        } else {
            return overview.slice(0, length) + "...";
        }
    } else {
        return overview;
    }
};

export default sliceDescription;
