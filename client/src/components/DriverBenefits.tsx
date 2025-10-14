import { FaClock, FaMoneyBillWave, FaShieldAlt, FaHandsHelping } from "react-icons/fa";

const DriverBenefits = () => {
  const benefits = [
    {
      icon: <FaClock className="text-yellow-300 text-4xl mb-3" />,
      title: "Flexible Hours",
      desc: "Choose when you want to work. Full-time or part-time, it’s up to you.",
    },
    {
      icon: <FaMoneyBillWave className="text-yellow-300 text-4xl mb-3" />,
      title: "Competitive Earnings",
      desc: "Earn per 75% off delivery with transparent, reliable payouts.",
    },
    {
      icon: <FaShieldAlt className="text-yellow-300 text-4xl mb-3" />,
      title: "Safe & Insured",
      desc: "Deliver with peace of mind knowing every trip is protected.",
    },
    {
      icon: <FaHandsHelping className="text-yellow-300 text-4xl mb-3" />,
      title: "Support & Training",
      desc: "Access guidance, support, and training to succeed on our platform.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center" >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-aos="fade-up">
          Why Join Us?
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up">
          We’re more than just a delivery platform; we’re your partner in success.
          Join today and unlock opportunities tailored for drivers like you.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 flex flex-col items-center justify-center rounded-2xl shadow hover:shadow-lg transition"
              data-aos="fade-up"
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DriverBenefits;
