import Banner from "../Banner/Banner";
import ProjectsShowcase from "../ProjectsShowcase/ProjectsShowcase";
import Services from "../Services/Services";
import Testimonials from "../Testimonials/Testimonials";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <Testimonials />
      <ProjectsShowcase />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
