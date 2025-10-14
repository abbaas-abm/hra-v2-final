import { useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "../../public/images/hra-logo-white.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiTruck, FiBox } from "react-icons/fi";
import { BiFridge } from "react-icons/bi";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const {openSignIn} = useClerk();
  const {openSignUp} = useClerk();
  const {user} = useUser();

  return (
    <nav className="bg-yellow-300 py-3 flex items-center justify-center w-full relative">
      <div className="w-full max-w-[1200px] flex justify-between items-center px-4">
        {/* Nav Logo */}
        <Link to={`/`}>
          <img src={logo} className="w-[180px] md:w-[220px] object-contain" alt="HRA Logo" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-6">
          <li className="text-white text-lg font-semibold">
            <Link to="/">Home</Link>
          </li>

          {/* Services Dropdown */}
            <li className="relative group text-white text-lg font-semibold">
            <Link to="/services">
            <span className="cursor-pointer">Services</span>
            </Link>

            {/* Dropdown */}
            <ul className="absolute z-50 top-5 left-0 mt-2 w-[200px] bg-white text-yellow-600 rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                <li className="px-4 py-2 hover:bg-yellow-100 flex items-center gap-2">
                <FiTruck />
                <Link to="/services/delivery">Delivery</Link>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-100 flex items-center gap-2">
                <FiBox />
                <Link to="/services/storage">Storage</Link>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-100 flex items-center gap-2">
                <BiFridge/>
                <Link to="/services/fridge-rentals">Fridge Rental</Link>
                </li>
            </ul>
            </li>

          <li className="text-white text-lg font-semibold">
            <Link to="/drivers">Drivers</Link>
          </li>
          <li className="text-white text-lg font-semibold">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Auth Buttons (Desktop) */}
        

        {user 
          ? (<div className="flex items-center gap-3">
              <Link to="/dashboard/user" className="text-white text-lg underline">Dashboard</Link>
              <UserButton/>
          </div>)
          : (
            <div className="hidden md:flex items-center space-x-3">
          <Link to="/driver-login" className="text-white text-lg">
            For Drivers
          </Link>
          <div className="flex space-x-3 items-center">
            <Link onClick={() => openSignIn()} className="py-2 px-4 rounded-3xl bg-white text-yellow-300 font-semibold" to="/">
              Login
            </Link>
            <Link onClick={() => openSignUp()} className="py-2 px-4 rounded-3xl bg-white text-yellow-300 font-semibold" to="/">
              Sign Up
            </Link>
          </div>
        </div>
          )
        }

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-yellow-300 shadow-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-yellow-200">
          <img src={logo} className="w-[140px] object-contain" alt="HRA Logo" />
          <button onClick={() => setIsOpen(false)} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col space-y-4 px-6 py-6">
          <li className="text-white text-lg font-semibold">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="text-white text-lg font-semibold">
            <details>
              <summary className="cursor-pointer">Services</summary>
              <ul className="pl-4 mt-2 space-y-2 text-white">
                <li><Link to="/services/delivery" onClick={() => setIsOpen(false)}>Delivery</Link></li>
                <li><Link to="/services/storage" onClick={() => setIsOpen(false)}>Storage</Link></li>
                <li><Link to="/services/fridge-rentals" onClick={() => setIsOpen(false)}>Fridge Rental</Link></li>
              </ul>
            </details>
          </li>
          <li className="text-white text-lg font-semibold">
            <Link to="/drivers" onClick={() => setIsOpen(false)}>Drivers</Link>
          </li>
          <li className="text-white text-lg font-semibold">
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </li>
          <li className="text-white text-lg font-semibold">
            <Link to="/" onClick={() => setIsOpen(false)}>For Drivers</Link>
          </li>
        </ul>

        {/* Sidebar Auth Buttons */}
        <div className="px-6 space-y-3">
          <Link
            className="block text-center py-2 px-3 rounded-3xl bg-white text-yellow-300 font-semibold"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            className="block text-center py-2 px-3 rounded-3xl bg-white text-yellow-300 font-semibold"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
