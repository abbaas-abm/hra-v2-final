import React, {  useEffect } from 'react';

// Testimonial data
const testimonials = [
  {
    quote: "HRA’s delivery service is incredibly fast and reliable. They handled my items with care and kept me updated every step of the way.",
    name: "Amina K.",
    city: "Johannesburg",
    rating: 5,
  },
  {
    quote: "I needed a fridge rental for an outdoor event they delivered on time and the unit was spotless and efficient. Highly recommended!",
    name: "Marcus T.",
    city: "Midrand",
    rating: 5,
  },
  {
    quote: "The storage options are affordable and secure. I had peace of mind knowing my belongings were safe with HRA.",
    name: "Lebo M.",
    city: "Sandton",
    rating: 4,
  },
  {
    quote: "Exceptional customer service! The team was professional, friendly, and went above and beyond to ensure a smooth moving process.",
    name: "Tshepo M.",
    city: "Pretoria",
    rating: 5,
  },
  {
    quote: "I've used HRA for both personal and business deliveries. Their consistency and attention to detail are unmatched.",
    name: "Nomusa Z.",
    city: "Durban",
    rating: 5,
  },
  {
    quote: "The transport staff were punctual and incredibly helpful. Everything arrived in perfect condition. A truly stress-free experience.",
    name: "Sipho N.",
    city: "Cape Town",
    rating: 4,
  },
  {
    quote: "Their tracking system is fantastic. I knew exactly where my package was at all times. A top-tier service.",
    name: "Jessica P.",
    city: "Port Elizabeth",
    rating: 5,
  },
];

const Testamonials = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.setProperty('--scroll-speed', `${testimonials.length * 5}s`);
    }
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden font-sans">
      <style>
        {`
          .scroll-container-inner {
            animation: scroll-left var(--scroll-speed, 50s) linear infinite;
            display: flex;
            will-change: transform;
            width: fit-content;
          }
          
          .scroll-container-inner:hover {
            animation-play-state: paused;
          }

          @keyframes scroll-left {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Title and Subtitle Section */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-400 leading-tight">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-gray-700 text-base sm:text-lg">
            Your satisfaction drives us. See what our happy clients have to say about HRA Transportation.
          </p>
        </div>

        {/* Testimonial Scroller Section */}
        <div className="relative w-full overflow-hidden group">
          <div className="scroll-container-inner" ref={scrollRef}>
            {/* Duplicating the content to create a seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="w-[90vw] sm:w-80 md:w-96 flex-shrink-0 p-6 md:p-8 mx-3 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group-hover:scale-105 border border-gray-200"
              >
                <div className="flex items-start">
                  {/* Inline SVG for FaQuoteLeft */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="text-yellow-600 text-2xl md:text-3xl mr-4 opacity-75 w-6 h-6"
                    fill="currentColor"
                  >
                    <path d="M96 224C43 224 0 181 0 128S43 32 96 32V64c-35.3 0-64 28.7-64 64s28.7 64 64 64h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H96zm320 0c-53 0-96-43-96-96s43-96 96-96V64c-35.3 0-64 28.7-64 64s28.7 64 64 64h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H416z"/>
                  </svg>
                  <p className="text-gray-700 text-sm md:text-base italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-300 pt-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className={`text-sm md:text-base w-4 h-4 ${
                          i < testimonial.rating ? 'text-yellow-500' : 'text-gray-400'
                        }`}
                        fill="currentColor"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12.1 3.4 24.3 13.5 31.2s23.5 6 34.5-1.7L288.1 423.4l143.2 97.9c11 7.5 25.4 9.4 34.5 1.7s15.5-19.1 13.5-31.2L438.5 329 542.7 225.9c8.5-8.6 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-semibold text-lg md:text-xl mt-2 text-gray-800">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.city}
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

export default Testamonials;
