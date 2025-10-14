import { FaCheck } from "react-icons/fa";
import fridgeImg from '../../public/images/fridge-img.png';
import storageImg from '../../public/images/storage-img.png';
import deliveryImg from '../../public/images/delivery-img.png';
import { Link } from "@tanstack/react-router";


const ServiceCards = () => {
  const items = [
    {
      title: "Deliveries",
      desc: "We offer fast, reliable deliveries tailored to your schedule ensuring your goods arrive safely, securely, and on time, every time.",
      points: [
        "Same-day and next-day delivery options available.",
        "24/7 continuous support.",
        "Fully insured and handled by trained professionals.",
      ],
      img: deliveryImg,
      link: "/services/delivery",
    },
    {
      title: "Fridge Rentals",
      desc: "Our fridge rental service provides modern, energy-efficient units for events, businesses, and emergencies with flexible terms and quick setup.",
      points: [
        "Clean, sanitized units with temperature control.",
        "Short or long-term rental flexibility.",
        "Quick delivery and hassle-free installation.",
      ],
      img: fridgeImg,
      link: "/services/fridge-rentals",
    },
    {
      title: "Storage",
      desc: "Secure, accessible storage solutions to keep your belongings safe whether personal or business, short or long term, we’ve got space for you.",
      points: [
        "24/7 monitored, climate-controlled facilities.",
        "Affordable plans for all storage needs.",
        "Easy access with flexible entry hours.",
      ],
      img: storageImg,
      link: "/services/storage",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {items.map((item, index) => (
          <div
          data-aos="fade-down"
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Info */}
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {item.title}
              </h2>
              <p className="text-gray-700 text-lg">{item.desc}</p>
              <ul className="space-y-2">
                {item.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <FaCheck className="text-yellow-300 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={item.link}
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 border-2 border-yellow-300 text-yellow-300 font-semibold rounded-full hover:bg-yellow-300 hover:text-white transition"
              >
                Learn More <span className="text-lg">→</span>
              </Link>
            </div>

            {/* Image */}
            <div className="flex-1">
              <img
                src={item.img}
                alt={item.title}
                className="w-full rounded-2xl  object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
