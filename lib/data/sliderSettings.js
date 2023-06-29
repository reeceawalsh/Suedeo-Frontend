export default {
    dots: true, // Show dots below the slider
    infinite: true, // Should the carousel loop
    speed: 500, // Animation speed
    slidesToShow: 8, // How many slides to show at once
    slidesToScroll: 8, // How many slides to scroll at once
    adaptiveHeight: true, // Auto change height of slider
    lazyLoad: true, // Lazy loads the components as the slider moves
    rows: 1, // Amount of rows
    draggable: true, // Allows the user to scroll to a specific slide
    arrows: true, // Allows user to scroll with arrows
    responsive: [
        // Responsive breakpoints. Need to reduce amount of slides as the screen gets smaller.
        {
            breakpoint: 2200,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 7,
                arrows: true,
                infinite: true,
            },
        },
        {
            breakpoint: 1800,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows: true,
                infinite: true,
            },
        },
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                arrows: true,
                infinite: true,
            },
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: true,
                infinite: true,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false,
                arrows: true,
            },
        },
        {
            breakpoint: 850,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false,
                arrows: true,
            },
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false,
                arrows: true,
            },
        },

        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 1,
                dots: false,
                infinite: true,
                arrows: true,
                centerMode: false,
            },
        },
    ],
};
