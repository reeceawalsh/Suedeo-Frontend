import MovieItem from "./MovieItem";
import styles from "./styles/watchlist.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderSettings from "@component/lib/data/sliderSettings";

export default function Watchlist({ media }) {
    return (
        <div className="listContainer">
            <Slider {...sliderSettings}>
                {media.map((item, index) => (
                    <MovieItem key={item.id} {...item} />
                ))}
            </Slider>
        </div>
    );
}
