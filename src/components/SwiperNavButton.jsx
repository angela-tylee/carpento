export const SwiperPrevButton = ({ section }) => {
  return (
    <button
      className={`position-absolute swiper-custom-prev btn border-0 bg-transparent p-0 bottom-50 start-0 ${section}`}
    >
      <i className="bi bi-chevron-compact-left"></i>
    </button>
  );
};

export const SwiperNextButton = ({ section }) => {
  return (
    <button
      className={`position-absolute swiper-custom-next btn border-0 bg-transparent p-0 bottom-50 end-0 ${section}`}
    >
      <i className="bi bi-chevron-compact-right"></i>
    </button>
  );
};
