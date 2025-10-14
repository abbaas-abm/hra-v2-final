import { FaIdCard, FaHome, FaUniversity, FaMoneyBillWave } from "react-icons/fa";

const FridgeRequiredDocuments = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20" data-aos="fade-right">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6">
          Required Documents
        </h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
          To complete your fridge rental application, please prepare the following
          documents. These help us process your request quickly and securely.
        </p>

        {/* Documents List */}
        <div className="grid sm:grid-cols-2 gap-6 text-left">
          <div className="flex items-start gap-4 p-5 border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition">
            <FaIdCard className="text-yellow-300 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Certified copy of your ID</h3>
              <p className="text-gray-600 text-sm">Proof of identity to verify your rental application.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition">
            <FaHome className="text-yellow-300 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Proof of residence</h3>
              <p className="text-gray-600 text-sm">Recent utility bill or official document showing your address.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition">
            <FaUniversity className="text-yellow-300 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Recent bank statement</h3>
              <p className="text-gray-600 text-sm">Ensures financial verification for your fridge rental.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition">
            <FaMoneyBillWave className="text-yellow-300 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Non-refundable deposit</h3>
              <p className="text-gray-600 text-sm">Deposit amount varies depending on the fridge type.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FridgeRequiredDocuments;
