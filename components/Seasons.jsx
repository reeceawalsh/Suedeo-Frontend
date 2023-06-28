import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Season from "./Season";

const Seasons = ({ seasons, seriesOverview }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    seasons = seasons.filter((season) => season.name != "Specials");
    return (
        <Slider {...settings}>
            {seasons.map((season) => (
                <div key={season.id}>
                    <Season season={season} seriesOverview={seriesOverview} />
                </div>
            ))}
        </Slider>
    );
};

export default Seasons;
