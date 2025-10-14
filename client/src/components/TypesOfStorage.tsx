import { FaBox, FaBed, FaTv, FaCouch } from "react-icons/fa";

const TypesOfStorage = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4">
          Types of Storage
        </h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
          Flexible storage solutions for all your needs. Whether it’s big or small, we keep it safe.
        </p>

        {/* Storage Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Box Storage */}
          <div data-aos="fade-right" className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition">
            <FaBox className="text-yellow-300 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Box Storage</h3>
            <p className="text-gray-600 text-sm">
              Choose from small, medium, or large boxes to store your personal items securely.
            </p>
          </div>

          {/* Bed Storage */}
          <div data-aos="fade-up" className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition">
            <FaBed className="text-yellow-300 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Bed Storage</h3>
            <p className="text-gray-600 text-sm">
              Store single, double, or queen-size beds. We package and secure them with care.
            </p>
          </div>

          {/* Appliance Storage */}
          <div data-aos="fade-up" className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition">
            <FaTv className="text-yellow-300 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Appliance Storage</h3>
            <p className="text-gray-600 text-sm">
              From kettles to TVs and fridges, your appliances are safely stored with us.
            </p>
          </div>

          {/* Other Items */}
          <div data-aos="fade-left" className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition">
            <FaCouch className="text-yellow-300 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Other Items</h3>
            <p className="text-gray-600 text-sm">
              Chairs, suitcases, blankets store individual items with convenience and ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypesOfStorage;
