import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LazyImage from '../loader/LazyImage';
import useBanner from '../../hooks/useBanner';

const BannerCarousel = () => {

  const { bannerData = [] } = useBanner();

  // Filter only ACTIVE banners
  const activeBanners = bannerData.filter((item) => item.status === "ACTIVE");

  const isSingle = activeBanners.length === 1;

  const settings = {
    dots: false,
    infinite: !isSingle,     // ❗Stop infinite loop when only one banner
    autoplay: !isSingle,     // ❗Disable autoplay for a single image
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {activeBanners.map((item) => (
          <div key={item.id} className="w-full">
            <LazyImage
              src={item.image}
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