import MovieItem from "./MovieItem";
import sliderSettings from "@component/lib/data/sliderSettings";
import useWindowSize from "@component/util/hooks/useWindowSize";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SmallWatchlist = ({ media }) => {
    const windowSize = useWindowSize();
    // determine the number of slides
    const slidesCount = Math.min(media.length, sliderSettings.slidesToShow);

    // get current responsive settings based on windowSize.width
    const responsiveSetting = sliderSettings.responsive.find(
        (setting) => windowSize.width <= setting.breakpoint
    );

    // use either the responsive setting or the base setting, with a fallback to 1
    const slidesToShow = responsiveSetting
        ? responsiveSetting.settings.slidesToShow
        : sliderSettings.slidesToShow || 1;

    // new settings
    const newSliderSettings = {
        ...sliderSettings,
        slidesToShow: Math.min(slidesCount, slidesToShow),
        slidesToScroll: Math.min(slidesCount, slidesToShow),
    };

    return (
        <Slider {...newSliderSettings}>
            {media.map((item, index) => (
                <MovieItem key={item.id} {...item} />
            ))}
        </Slider>
    );
};

export default SmallWatchlist;
