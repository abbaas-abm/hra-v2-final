import { FaIdCard, FaHome, FaCarSide, FaFileAlt, FaBuilding } from "react-icons/fa";

const DriverRequirements = () => {
  const requirements = [
    {
      title: "Certified Copy of ID / Passport",
      desc: "Proof of identity for verification.",
      icon: <FaIdCard className="text-yellow-300 text-2xl" />,
    },
    {
      title: "Valid Driver’s License",
      desc: "Ensure you’re legally permitted to drive.",
      icon: <FaIdCard className="text-yellow-300 text-2xl" />,
    },
    {
      title: "Professional Driving Permit (PrDP)",
      desc: "Required for transporting goods and passengers.",
      icon: <FaFileAlt className="text-yellow-300 text-2xl" />,
    },
    {
      title: "Proof of Residence",
      desc: "Recent utility bill or official document.",
      icon: <FaHome className="text-yellow-300 text-2xl" />,
    },
    {
      title: "Vehicle Registration Certificate (Logbook)",
      desc: "Confirms ownership of the vehicle.",
      icon: <FaCarSide className="text-yellow-300 text-2xl" />,
    },
    {
      title: "Vehicle License Disk (Up-to-date)",
      desc: "Proof your vehicle is licensed.",
      icon: <FaCarSide className="text-yellow-300 text-2xl" />,
    },
    {
      title: "Vehicle Roadworthy Certificate",
      desc: "Ensures the vehicle meets safety standards.",
      icon: <FaFileAlt className="text-yellow-300 text-2xl" />,
    },
    {
      title: "Company Registration Documents (CIPC)",
      desc: "Required if the vehicle is company-owned.",
      icon: <FaBuilding className="text-yellow-300 text-2xl" />,
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6 text-center">
          Driver Onboarding Requirements
        </h2>
        <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto">
          To join our platform, please upload the following documents. This helps us ensure
          compliance, safety, and trust for all our customers.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {requirements.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start gap-4 p-5 border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition"
              data-aos="fade-left"
            >
              {item.icon}
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                {/* <input
                  type="file"
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                  file:rounded-md file:border-0 
                  file:text-sm file:font-semibold
                  file:bg-yellow-300 file:text-white
                  hover:file:bg-yellow-400 cursor-pointer"
                /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DriverRequirements;
