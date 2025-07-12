import Banner from "../Banner/Banner";
import OurTeam from "../OurTeam/OurTeam";
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
      <OurTeam />
    </div>
  );
};

export default Home;
