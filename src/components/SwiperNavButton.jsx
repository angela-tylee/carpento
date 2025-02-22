// import { Swiper, useSwiper } from 'swiper/react';

export const SwiperPrevButton = ({ section }) => {
  // const swiper = useSwiper();
  return (
    <button
      className={`position-absolute swiper-custom-prev btn border-0 bg-transparent p-0 bottom-50 start-0 ${section}`}
      // onClick={() => {
      //   swiper.slidePrev();
      //   console.log('prev');
      // }}
    >
      <i className="bi bi-chevron-compact-left"></i>
    </button>
  );
};

export const SwiperNextButton = ({ section }) => {
  // const swiper = useSwiper();
  return (
    <button
      className={`position-absolute swiper-custom-next btn border-0 bg-transparent p-0 bottom-50 end-0 ${section}`}
      // onClick={() => {
      //   swiper.slideNext();
      //   console.log('next');
      // }}
    >
      <i class="bi bi-chevron-compact-right"></i>
    </button>
  );
};
