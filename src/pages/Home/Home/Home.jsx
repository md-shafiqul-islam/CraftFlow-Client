import Banner from "../Banner/Banner";
import ProjectsShowcase from "../ProjectsShowcase/ProjectsShowcase";
import Services from "../Services/Services";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <Testimonials />
      <ProjectsShowcase />
    </div>
  );
};

export default Home;
