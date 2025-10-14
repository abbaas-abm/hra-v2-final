import  { useEffect, useState, useRef } from 'react';

const DriverProcess = () => {
    const [progressHeight, setProgressHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                // Calculate how much of the container is visible on screen
                const scrollableHeight = rect.height - viewportHeight + (viewportHeight * 0.2); // Adjust 20% to account for a bit of buffer
                const scrollProgress = -rect.top + (viewportHeight * 0.2); // Adjust based on the same buffer
                
                let newHeight = 0;
                if (scrollableHeight > 0) {
                    newHeight = (scrollProgress / scrollableHeight) * 100;
                    if (newHeight > 100) newHeight = 100;
                    if (newHeight < 0) newHeight = 0;
                }

                setProgressHeight(newHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check on load
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const steps = [
        {
            title: "Create an Account",
            description: "Sign Up and Create an account or login to your existing account."
        },
        {
            title: "Enter Pick-Up & Drop-Off Details",
            description: "Tell us where to collect and where to deliver your item."
        },
        {
            title: "Choose Pick-Up Time & Date",
            description: "Schedule the most convenient time for you."
        },
        {
            title: "Let Us Know About Stairs",
            description: "If there are stairs, we'll factor that into the rate. (R50 per staircase.)"
        },
        {
            title: "We Calculate Your Cost Instantly",
            description: "Transparent pricing based on distance, item weight, and stairs."
        },
        {
            title: "Make Payment Securely",
            description: "Pay online fast and secure."
        },
        {
            title: "Sit Back and Relax",
            description: "We’ll collect, transport, and deliver on time no stress, no sweat."
        }
    ];

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black text-yellow-300 text-center tracking-tight leading-tight">
                    How It Works
                </h2>
                <div ref={containerRef} className="relative mt-12">
                    {/* Vertical Line */}
                    <div className="absolute top-0 left-6 sm:left-1/2 -ml-0.5 w-1 h-full bg-gray-200 rounded-full"></div>

                    {/* Animated Line */}
                    <div
                        className="absolute top-0 left-6 sm:left-1/2 -ml-0.5 w-1 bg-yellow-300 rounded-full transition-all duration-300"
                        style={{ height: `${progressHeight}%` }}
                    ></div>

                    {/* Steps Container */}
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex items-center justify-center">
                                {/* Step Circle */}
                                <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-yellow-300 text-white text-xl font-bold flex-shrink-0">
                                    {index + 1}
                                </div>
                                {/* Step Content */}
                                <div className="relative bg-gray-50 rounded-xl shadow-lg p-6 w-10/12 ml-4 sm:w-5/12 sm:ml-6">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverProcess;
