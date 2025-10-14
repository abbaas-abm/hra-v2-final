import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const DriverFAQs = () => {
  const faqs = [
    {
      question: "How long does onboarding take?",
      answer:
        "Onboarding typically takes 2–5 business days once all required documents are submitted and verified.",
    },
    {
      question: "What’s the payment schedule?",
      answer:
        "Drivers get paid weekly or monthly, depending on your preference, directly into your bank account.",
    },
    {
      question: "Can I use my personal car?",
      answer:
        "Yes! As long as your vehicle meets our safety and roadworthy standards, personal cars are welcome.",
    },
    {
      question: "How do I report an issue during delivery?",
      answer:
        "You can report any issues through our in-app support feature or contact our 24/7 driver support team.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-6" data-aos="fade-right">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-gray-600 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DriverFAQs;
