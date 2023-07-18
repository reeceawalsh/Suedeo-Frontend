import { useState, useEffect } from "react";

export default function useResponsiveSliderSettings(amount) {
    const [sliderSettings, setSliderSettings] = useState({
        dots: true, // Show dots below the slider
        infinite: true, // Should the carousel loop
        speed: 500, // Animation speed
        slidesToShow: 8, // How many slides to show at once
        slidesToScroll: 8, // How many slides to scroll at once
        adaptiveHeight: true, // Auto change height of slider
        lazyLoad: true, // Lazy loads the components as the slider moves
        variableWidth: true, // Ensures the components move to the left instead of staying centered.
        rows: 1, // Amount of rows
        draggable: true, // Allows the user to scroll to a specific slide
        arrows: true, // Allows user to scroll with arrows
        centerMode: false,
    });

    // Change the size based on the current users window.
    useEffect(() => {
        function handleResize() {
            let slidesToShow;
            const width = window.innerWidth;

            if (width <= 320) {
                slidesToShow = 1;
            } else if (width <= 520) {
                slidesToShow = 1;
            } else if (width <= 700) {
                slidesToShow = 2;
            } else if (width <= 1100) {
                slidesToShow = 3;
            } else if (width <= 1400) {
                slidesToShow = 4;
            } else if (width <= 1820) {
                slidesToShow = 5;
            } else if (width <= 1900) {
                slidesToShow = 6;
            } else {
                slidesToShow = 7;
            }
            // If theres not enough slides for the row then change the slidesToShow to match the amount there is.
            slidesToShow = Math.min(slidesToShow, amount);
            // Change centerMode to true if theres not enough slides.
            let centerMode = false;
            if (slidesToShow > amount) centerMode = true;
            console.log("slides to show", slidesToShow);
            // Update slider settings
            setSliderSettings((prevSettings) => ({
                ...prevSettings,
                slidesToShow,
                centerMode,
            }));
        }

        // Handles resize
        window.addEventListener("resize", handleResize);
        handleResize();

        // Clean up function
        return () => window.removeEventListener("resize", handleResize);
    }, [amount]);

    return sliderSettings;
}
