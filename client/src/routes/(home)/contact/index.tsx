import { createFileRoute } from '@tanstack/react-router'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export const Route = createFileRoute('/(home)/contact/')({
  head: () => ({
    meta: [
      {title: 'Contact Us | Feel free to contact us if you have any questions!'}
    ]
  }),
  component: ContactPage,
})

function ContactPage() {
   return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to us through the form
            below or via our contact details. We’re here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-yellow-300 text-2xl mt-1" />
              <p className="text-gray-700">
                9 Schreiner Street, Grobler Park, Johannesburg 1724
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-yellow-300 text-2xl mt-1" />
              <a
                href="mailto:hratransportation@gmail.com"
                className="text-gray-700 hover:text-yellow-300 transition"
              >
                hratransportation@gmail.com
              </a>
            </div>

            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-yellow-300 text-2xl mt-1" />
              <a
                href="tel:+27761124842"
                className="text-gray-700 hover:text-yellow-300 transition"
              >
                (076) 112-4842
              </a>
            </div>

            {/* Optional Map Placeholder */}
            <div className="mt-8">
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.123456789!2d27.870000!3d-26.170000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957c123456789%3A0xabcd1234567890!2s9%20Schreiner%20St%2C%20Grobler%20Park%2C%20Johannesburg!5e0!3m2!1sen!2sza!4v1691234567890!5m2!1sen!2sza"
                width="100%"
                height="100%"
               
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-300 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-yellow-400 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
