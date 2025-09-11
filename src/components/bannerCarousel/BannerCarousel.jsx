import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LazyImage from '../loader/LazyImage';

const BannerCarousel = () => {
  const bannerCarouselData = useSelector(
    (state) => state.bannerCarouselData.bannerCarouselData
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {bannerCarouselData.map((item) => (
          <div key={item.id} className="w-full">
            <LazyImage
              src={item.Imgsrc}
              alt=""
              className="
                w-full 
                h-[180px] xs:h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px]
                object-cover 
                rounded-none
              "
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;