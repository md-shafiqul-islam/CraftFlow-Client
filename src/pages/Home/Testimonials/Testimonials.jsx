import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Homeowner, Dhaka",
    feedback:
      "The renovation was flawless — stylish, on time, and beyond my expectations.",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 2,
    name: "Tanvir Hossain",
    role: "Business Owner, Gulshan",
    feedback:
      "They transformed my office into a space that reflects my brand perfectly.",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 3,
    name: "Anika Rahman",
    role: "Interior Blogger",
    feedback:
      "Every detail speaks of quality. I constantly recommend them to my readers.",
    image: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 4,
    name: "Kamal Uddin",
    role: "Real Estate Developer",
    feedback:
      "Professional, punctual, and creative — couldn’t have asked for more.",
    image: "https://i.pravatar.cc/100?img=14",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">What Our</span>{" "}
            <span className="text-secondary">Clients Say</span>
          </h2>
          <p className="text-text-accent text-sm md:text-base">
            Our clients' satisfaction is our pride. Here's what they have to say
            about working with us.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
          spaceBetween={0}
          className="w-full h-[45vh] lg:h-[50vh] overflow-hidden"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-base-200 p-6 md:p-10 rounded-xl shadow-md max-w-3xl mx-auto text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 mx-auto rounded-full object-cover mb-4"
                />
                <h4 className="text-accent font-semibold">{t.name}</h4>
                <p className="text-xs text-text-accent mb-3">{t.role}</p>
                <p className="text-sm text-text-accent italic">
                  “{t.feedback}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
