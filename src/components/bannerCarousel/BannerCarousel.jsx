import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerCarousel = () => {
  const bannerCarouselData = useSelector((state) => state.bannerCarouselData.bannerCarouselData);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
  };

  return (
    <div className="w-full mt-5 h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
      <Slider {...settings}>
        {bannerCarouselData.map((item) => (
          <div key={item.id} className="w-full h-full">
            <img
              src={item.Imgsrc}
              alt=""
              className="w-full h-full object-cover rounded-none"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
