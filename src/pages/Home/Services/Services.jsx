import {
  Paintbrush,
  Hammer,
  Home,
  Ruler,
  Sofa,
  ClipboardList,
  Lightbulb,
  Building2,
} from "lucide-react";

const iconClass = "text-secondary size-8 mb-4";

const services = [
  {
    id: 1,
    icon: <Paintbrush className={iconClass} />,
    title: "Interior Design",
    description: "Bespoke interior plans tailored to your lifestyle and space.",
  },
  {
    id: 2,
    icon: <Hammer className={iconClass} />,
    title: "Renovation & Remodeling",
    description:
      "Modernize outdated spaces with functional and stylish upgrades.",
  },
  {
    id: 3,
    icon: <Home className={iconClass} />,
    title: "Site Inspection",
    description:
      "Detailed assessments to plan your dream renovation efficiently.",
  },
  {
    id: 4,
    icon: <Sofa className={iconClass} />,
    title: "Furniture Customization",
    description: "Custom-built furniture to complement your design aesthetics.",
  },
  {
    id: 5,
    icon: <ClipboardList className={iconClass} />,
    title: "Project Management",
    description: "From planning to execution, we manage every detail for you.",
  },
  {
    id: 6,
    icon: <Ruler className={iconClass} />,
    title: "Color & Material Guidance",
    description:
      "Professional advice to choose the perfect tones and textures.",
  },
  {
    icon: <Lightbulb className={iconClass} />,
    title: "Lighting Solutions",
    description: "Smart and stylish lighting setups that enhance ambiance.",
  },
  {
    icon: <Building2 className={iconClass} />,
    title: "Commercial Interior",
    description:
      "Functional, branded designs to elevate business environments.",
  },
];

const Services = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Our</span>{" "}
            <span className="text-secondary">Services</span>
          </h2>
          <p className="text-text-accent text-sm md:text-base">
            Explore a full range of professional interior design and renovation
            services. Whether it’s residential or commercial, our solutions are
            built to enhance comfort, style, and functionality — tailored to
            your exact needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-start">
                {service.icon}
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-accent leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
