import MovieItem from "./MovieItem";
import watchListSliderSettings from "@component/lib/data/watchListSliderSettings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Watchlist = ({ media }) => {
    // Need specific slider settings as the slider will only render a row if theres more slider components than per row.
    const sliderSettings = watchListSliderSettings(media.length);

    return (
        <div className="listContainer">
            <Slider {...sliderSettings}>
                {media.map((item, index) => (
                    <MovieItem key={item.id} {...item} />
                ))}
            </Slider>
        </div>
    );
};

export default Watchlist;
