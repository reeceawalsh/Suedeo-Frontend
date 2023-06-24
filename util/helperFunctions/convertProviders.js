const convertProviders = (provider) => {
    switch (provider) {
        case "Netflix":
            return 8;
        case "Horizon":
            return;
        case "Disney Plus":
            return 337;
        case "Hulu":
            return;
        case "HBO":
            return;
        case "Now TV":
            return 591;
        case "Amazon Prime Video":
            return 10;
        case "Peacock":
            return;
        case "Apple iTunes":
            return;
        case "Paramount Plus":
            return;
        case "Google Play Movies":
            return 3;
        case "Sky":
            return 29;
        default:
            return -1;
    }
};

export default convertProviders;
