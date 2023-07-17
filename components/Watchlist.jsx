import MovieItem from "./MovieItem";
import styles from "./styles/watchlist.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderSettings from "@component/lib/data/sliderSettings";

export default function Watchlist({ media }) {
    return (
        <div>
            {media.length > sliderSettings.slidesToShow ? (
                <div className="listContainer">
                    <Slider
                        {...sliderSettings}
                        infinite={media.length > sliderSettings.slidesToShow}
                    >
                        {media.map((item, index) => (
                            <MovieItem key={item.id} {...item} />
                        ))}
                    </Slider>
                </div>
            ) : (
                <div className="listContainer2">
                    {media.map((item, index) => (
                        <MovieItem key={item.id} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
}
