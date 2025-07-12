import living from "../../../assets/Projects/living.jpg";
import bedroom from "../../../assets/Projects/bedroom.jpg";
import kitchen from "../../../assets/Projects/kitchen.jpg";
import dining from "../../../assets/Projects/dining.jpg";
import study from "../../../assets/Projects/study.jpg";
import workspace from "../../../assets/Projects/workspace.jpg";
import bathroom from "../../../assets/Projects/bathroom.jpg";
import outdoor from "../../../assets/Projects/outdoor.jpg";

const projects = [
  {
    id: 1,
    title: "Modern Living Room",
    description:
      "A cozy living room with sleek decor, warm tones, and smart lighting for comfort.",
    image: living,
  },
  {
    id: 2,
    title: "Cozy Bedroom Makeover",
    description:
      "A peaceful bedroom design featuring soft textures, warm colors, and functional layout.",
    image: bedroom,
  },
  {
    id: 3,
    title: "Contemporary Kitchen",
    description:
      "Minimalist kitchen layout with modern cabinets, ambient lights, and optimal storage.",
    image: kitchen,
  },
  {
    id: 4,
    title: "Elegant Dining",
    description:
      "A refined dining space with clean lines, neutral palette, and ambient lighting.",
    image: dining,
  },
  {
    id: 5,
    title: "Functional Study Room",
    description:
      "Well-organized study setup designed for quiet focus, storage, and natural light.",
    image: study,
  },
  {
    id: 6,
    title: "Concept Workspace",
    description:
      "A modern workspace with ergonomic furniture, bright tones, and creative energy.",
    image: workspace,
  },
  {
    id: 7,
    title: "Luxury Bathroom",
    description:
      "Bathroom remodel with modern fixtures, warm lights, and soft natural accents.",
    image: bathroom,
  },
  {
    id: 8,
    title: "Outdoor Patio Design",
    description:
      "Open-air patio with natural textures, lounge seating, and relaxing lighting setup.",
    image: outdoor,
  },
];

const ProjectsShowcase = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title and Description */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Our Featured</span>{" "}
            <span className="text-secondary">Projects</span>
          </h2>
          <p className="text-text-accent text-base">
            Discover our portfolio of stunning renovations and interior designs
            that bring spaces to life.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map(({ id, title, description, image }) => (
            <div
              key={id}
              className="bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {title}
                </h3>
                <p className="text-text-accent text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
