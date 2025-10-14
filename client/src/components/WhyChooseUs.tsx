import {FaBolt, FaHandshake, FaGraduationCap, FaMap} from 'react-icons/fa';

const features = [
    {
        title: "Transparent pricing, no hidden fees",
        icon: <FaHandshake />,
        description: "What you see is what you get. Our straightforward pricing ensures you're never surprised by hidden costs.",
    },
    {
        title: "Speedy pick-up and delivery options",
        icon: <FaBolt />,
        description: "We value your time. Our efficient service model guarantees quick and reliable pick-up and delivery.",
    },
    {
        title: "Student-founded, student-focused",
        icon: <FaGraduationCap />,
        description: "As students ourselves, we understand your unique needs. Our service is designed with the student lifestyle in mind.",
    },
    {
        title: "Johannesburg & surrounding areas",
        icon: <FaMap />,
        description: "We proudly serve the Johannesburg area, providing a convenient and accessible solution for students.",
    },
];

const WhyChooseUs = () => {
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 tracking-tight leading-10">
                        Why Choose Us?
                    </h2>
                    <p className="mt-4 text-xl text-gray-500">
                        We're more than just a service we're your partners in making student life easier.
                    </p>
                </div>
                <div className="mt-16 grid gap-y-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center bg-yellow-50 rounded-md p-3">
                            <div className="flex-shrink-0 text-yellow-400 text-4xl">
                                {feature.icon}
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl leading-6 font-medium text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-base text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
