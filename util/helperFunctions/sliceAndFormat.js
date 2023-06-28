// Slices the str if the str.length is greater than maxLength
const sliceAndFormat = (maxLength, str) => {
    var newStr;
    // If string length is less than or equal to maximum length, just return the original string
    if (str.length <= maxLength) {
        newStr = str;
    } else {
        // Slice the string to the maximum length
        newStr = str.slice(0, maxLength);

        // Find the last space (' ') in the sliced string and slice at that point
        // This ensures we're not in the middle of a word
        newStr = newStr.slice(
            0,
            Math.min(newStr.length, newStr.lastIndexOf(" "))
        );
    }

    // Trim any trailing whitespace
    newStr = newStr.trim();

    // Check last character, if it's not '.', add '...' to the end of the string
    if (newStr.slice(-1) !== ".") {
        newStr = newStr + "...";
    }

    return newStr;
};

export default sliceAndFormat;
