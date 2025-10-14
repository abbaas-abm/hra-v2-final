import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../public/images/hra-logo-white.png'; // Make sure to replace this with the correct path to your logo.

const Footer = () => {
  return (
    <footer className="bg-yellow-300 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
          {/* Logo Section */}
          <div className="w-full md:w-1/4 flex object-contain justify-center md:justify-start">
            <img src={logo} alt="HRA Transportation" className="w-[180px] md:w-[220px] object-contain" />
          </div>

          {/* Links Section */}
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
            {/* Services Column */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="scheduleDelivery.html" className="hover:underline transition-all duration-300">Deliveries</a></li>
                <li><a href="apply-for-fridges.html" className="hover:underline transition-all duration-300">Fridge Rentals</a></li>
                <li><a href="apply-for-storage.html" className="hover:underline transition-all duration-300">Storage</a></li>
              </ul>
            </div>

            {/* Useful Links Column */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold mb-4">Useful Links</h4>
              <ul className="space-y-2">
                <li><a href="index.html" className="hover:underline transition-all duration-300">Home</a></li>
                <li><a href="about.html" className="hover:underline transition-all duration-300">About</a></li>
                <li><a href="services.html" className="hover:underline transition-all duration-300">Services</a></li>
                <li><a href="contact.html" className="hover:underline transition-all duration-300">Contact</a></li>
                <li><a href="deliveryTCs.html" className="hover:underline transition-all duration-300">Terms and Conditions</a></li>
              </ul>
            </div>

            {/* Contact Us Column */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="mb-2">9 Schreiner Street, Grobler Park, Johannesburg 1724</li>
                <li>
                  Email: <a href="mailto:hratransportation@gmail.com" className="hover:underline transition-all duration-300">hratransportation@gmail.com</a>
                </li>
                <li>
                  Phone: <a href="tel:+27761124842" className="hover:underline transition-all duration-300">(076) 112-4842</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 pt-8 border-t border-white border-opacity-30 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} HRA Transportation. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-gray-200 transition-colors duration-300"><FaFacebook size={24} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-200 transition-colors duration-300"><FaTwitter size={24} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-200 transition-colors duration-300"><FaInstagram size={24} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-200 transition-colors duration-300"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;