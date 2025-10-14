import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaFileAlt } from 'react-icons/fa';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

type PersonalDetailsProps = {
      pushFirstName: (firstName:string) => void;
      pushLastName: (lastName:string) => void;
      pushEmail: (email:string) => void;
      pushPhone: (phone:string) => void;
      pushMessage: (message:string) => void;
}

const PersonalDetailsForm= ({pushFirstName, pushLastName, pushEmail, pushMessage, pushPhone}:PersonalDetailsProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    pushFirstName(formData.firstName);
    pushLastName(formData.lastName);
    pushEmail(formData.email);
    pushPhone(formData.phone);
    pushMessage(formData.notes);
   
  };

  return (
    <div data-aos="fade-right" className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-2xl transform transition-all duration-500 hover:shadow-2xl">
        <h2 className="text-xl sm:text-3xl font-semibold text-center text-yellow-400 mb-6 tracking-tight">
          Step 4 - Personal Details
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Almost There! Fill out your personal details below!
        </p>
        <form onChange={handleSubmit} className="space-y-7">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="pl-10 outline-none block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 placeholder-gray-500"
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="pl-10 block outline-none w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaEnvelope />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="pl-10 block outline-none w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 placeholder-gray-500"
            />
          </div>

          {/* Phone Field */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaPhone />
            </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="pl-10 block outline-none w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 placeholder-gray-500"
            />
          </div>

          {/* Notes Field */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-start pt-3 pl-3 text-gray-400">
              <FaFileAlt />
            </span>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional Order Notes (Optional)"
              className="pl-10 pt-3 outline-none block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 placeholder-gray-500 resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;