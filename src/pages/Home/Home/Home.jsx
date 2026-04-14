import Banner from "../Banner/Banner";
import RolePreview from "../RolePreview/RolePreview";
import Features from "../Features/Features";
import HowItWorks from "../HowItWorks/HowItWorks";
import SystemStats from "../SystemStats/SystemStats";
import SecurityHighlights from "../SecurityHighlights/SecurityHighlights";
import CallToAction from "../CallToAction/CallToAction";

const Home = () => {
  return (
    <div>
      <Banner />
      <Features />
      <HowItWorks />
      <RolePreview />
      <SystemStats />
      <SecurityHighlights />
      <CallToAction />
    </div>
  );
};

export default Home;

{
  /* <div>
      <HeroSection />
      <Features />
      <HowItWorks />
      <RolePreview />
      <SystemStats />
      <Testimonials />
      <SecurityHighlights />
    </div> */
}
