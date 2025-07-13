import { Typewriter } from "react-simple-typewriter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner01 from "../../../assets/Banner/banner01.jpg";
import banner02 from "../../../assets/Banner/banner02.jpg";
import banner03 from "../../../assets/Banner/banner03.jpg";
import banner04 from "../../../assets/Banner/banner04.jpg";
import banner05 from "../../../assets/Banner/banner05.jpg";

const slides = [
  {
    id: 1,
    title: "Serene Bedroom Designs",
    description: "Relax in style with cozy, custom interiors.",
    image: banner01,
  },
  {
    id: 2,
    title: "Elegant Dining Spaces",
    description: "Make every meal feel special and refined.",
    image: banner02,
  },
  {
    id: 3,
    title: "Modern Kitchen Concepts",
    description: "Smart layouts with sleek, functional style.",
    image: banner03,
  },
  {
    id: 4,
    title: "Inviting Living Rooms",
    description: "Warm, welcoming spaces for every moment.",
    image: banner04,
  },
  {
    id: 5,
    title: "Focused Study Corners",
    description: "Designed for clarity, focus, and creativity.",
    image: banner05,
  },
];

const Banner = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full h-[60vh] lg:h-[80vh] overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-[60vh] lg:h-[80vh]">
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                loading="lazy"
                className="relative w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-r from-black/80 via-black/60 to-black/40">
                <h2 className="text-3xl lg:text-5xl font-bold mb-3 text-secondary drop-shadow-lg">
                  <Typewriter
                    words={[slide.title]}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={50}
                    deleteSpeed={30}
                    delaySpeed={2000}
                  />
                </h2>

                <p className="text-lg lg:text-xl text-secondary font-medium">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
