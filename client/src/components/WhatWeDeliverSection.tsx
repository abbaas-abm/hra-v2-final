import { FaCouch, FaTv, FaSnowflake } from "react-icons/fa";
import { MdOutlineLocalLaundryService, MdOutlineTableRestaurant } from "react-icons/md";
import multiItems from '../../public/images/multi-items.png';

const WhatWeDeliver = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20" data-aos="fade-up">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6">
            What We Deliver
          </h2>
          <p className="text-gray-700 mb-6 max-w-lg">
            From heavy-duty appliances to small electronics and furniture, we deliver:
          </p>
          
          <ul className="space-y-4 text-gray-800">
            <li className="flex items-center gap-3">
              <FaSnowflake className="text-yellow-300 text-xl" />
              Refrigerators & Freezers
            </li>
            <li className="flex items-center gap-3">
              <MdOutlineLocalLaundryService className="text-yellow-300 text-xl" />
              Washing Machines & Ovens
            </li>
            <li className="flex items-center gap-3">
              <FaCouch className="text-yellow-300 text-xl" />
              Couches, Beds & Wardrobes
            </li>
            <li className="flex items-center gap-3">
              <MdOutlineTableRestaurant className="text-yellow-300 text-xl" />
              Tables, Chairs, Desks
            </li>
            <li className="flex items-center gap-3">
              <FaTv className="text-yellow-300 text-xl" />
              TVs, Microwaves, and more
            </li>
          </ul>
        </div>

        {/* Right Side for Image */}
        <div className="flex justify-center">
          {/* Placeholder for your transparent image */}
          <div className="w-full max-w-sm h-64 bg-yellow-50 border border-dashed border-yellow-300 flex items-center justify-center rounded-lg">
            <span className="text-gray-400">
                <img src={multiItems} alt="" />
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeDeliver;
