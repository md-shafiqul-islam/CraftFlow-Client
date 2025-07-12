import {
  Users,
  ShieldCheck,
  BadgeCheck,
  Clock,
  Building,
  Wrench,
  HeartHandshake,
  Gem,
} from "lucide-react";

const iconClass = "text-secondary size-8 mb-4";

const reasons = [
  {
    id: 1,
    icon: <Users className={iconClass} />,
    title: "Expert Team",
    description:
      "Seasoned designers and builders delivering expert solutions for every space.",
  },
  {
    id: 2,
    icon: <ShieldCheck className={iconClass} />,
    title: "Reliable Service",
    description:
      "Count on us for dependable timelines, quality work, and zero hassle.",
  },
  {
    id: 3,
    icon: <BadgeCheck className={iconClass} />,
    title: "Client Satisfaction",
    description:
      "We ensure every client walks away delighted with the final outcome.",
  },
  {
    id: 4,
    icon: <Clock className={iconClass} />,
    title: "On-Time Delivery",
    description:
      "Timely execution of projects without compromising on quality or design.",
  },
  {
    id: 5,
    icon: <Building className={iconClass} />,
    title: "Tailored Solutions",
    description:
      "Each project is uniquely crafted to reflect your vision and lifestyle.",
  },
  {
    id: 6,
    icon: <Wrench className={iconClass} />,
    title: "End-to-End Support",
    description:
      "From concept to completion, we guide you through every project stage.",
  },
  {
    id: 7,
    icon: <HeartHandshake className={iconClass} />,
    title: "Transparent Process",
    description:
      "Clear estimates, honest updates, and full visibility at every step.",
  },
  {
    id: 8,
    icon: <Gem className={iconClass} />,
    title: "Premium Quality",
    description:
      "We use top-grade materials and skilled hands to deliver stunning results.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Why</span>{" "}
            <span className="text-secondary">Choose Us</span>
          </h2>
          <p className="text-text-accent text-sm md:text-base">
            We transform spaces with purpose and precision — backed by industry
            expertise, passion, and dedication to client satisfaction.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-base-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="flex flex-col items-start">
                {reason.icon}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-accent leading-relaxed">
                    {reason.description}
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

export default WhyChooseUs;
