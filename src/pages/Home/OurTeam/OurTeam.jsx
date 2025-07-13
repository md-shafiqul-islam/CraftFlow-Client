import { Briefcase } from "lucide-react";

const iconClass = "text-secondary size-6 mr-2";

const teamMembers = [
  {
    id: 1,
    name: "Arif Hasan",
    role: "Lead Interior Designer",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    id: 2,
    name: "Farzana Akter",
    role: "Senior Architect",
    image: "https://i.pravatar.cc/300?img=41",
  },
  {
    id: 3,
    name: "Mahmud Rahman",
    role: "Renovation Specialist",
    image: "https://i.pravatar.cc/300?img=52",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "Project Manager",
    image: "https://i.pravatar.cc/300?img=31",
  },
];

const OurTeam = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Meet</span>{" "}
            <span className="text-secondary">Our Team</span>
          </h2>
          <p className="text-text-accent text-sm md:text-base">
            Our dedicated professionals combine creativity and craftsmanship to
            bring your vision to life.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-secondary"
              />
              <h3 className="text-lg font-semibold text-accent mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-text-accent leading-relaxed flex items-center justify-center">
                <Briefcase className={iconClass} />
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
