import storageImg from '../../public/images/storage-hero-img.png';
import fridgeImg from '../../public/images/fridge-hero-img.png';
import deliveryImg from '../../public/images/delivery-hero-img.png';
import { Link } from '@tanstack/react-router';
import { FaAngleRight } from 'react-icons/fa';


const ServicesHomePage = () => {
  return (
    <div className="flex items-stretch justify-center gap-6 md:flex-row flex-col p-8 w-full">
      {/* LEFT */}
      <Link data-aos="fade-right" className='transition cursor-pointer hover:scale-105 p-5 bg-yellow-300 rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-md' to='/services/delivery'>
        <div>
          <img src={deliveryImg} className='size-70 object-cover' alt="Delivies" />

          <div className="mt-3">
            <h2 className="font-bold text-2xl text-white">Deliveries</h2>
            <p className="mt-2 text-lg text-white font-semibold leading-relaxed">
              Fast, reliable, and on-time deliveries in and around Johannesburg, to your door.
            </p>
              <button className='py-2 px-4 mt-2 rounded-2xl bg-white text-black transition hover:scale-105 flex items-center cursor-pointer'>Learn More <FaAngleRight className='ml-2'/></button>
          </div>
        </div>
      </Link>

      {/* Right */}
      <div className="flex flex-col gap-6" data-aos="fade-left">

      {/* storage */}
      <Link className='transition cursor-pointer hover:scale-105' to='/services/storage'>
          <div className="p-5 bg-yellow-300 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-center border border-gray-200 shadow-md">
            <img src={storageImg} className='size-70 object-cover' alt="Delivies" />

            <div className="mt-3">
              <h2 className="font-bold text-2xl text-white">Storage</h2>
              <p className="mt-2  text-lg text-white font-semibold leading-relaxed">
                Store your belongings safely with our secure and affordable student storage solutions.
              </p>
                <button className='py-2 px-4 mt-2 rounded-2xl bg-white text-black transition hover:scale-105 flex items-center'>Learn More <FaAngleRight className='ml-2'/></button>
            </div>
          </div>
      </Link>

      {/* fridge rentals */}
      <Link className='transition cursor-pointer hover:scale-105' to='/services/fridge-rentals'>
          <div className="p-5 bg-yellow-300 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-center border border-gray-200 shadow-md">
            <img src={fridgeImg} className='size-70 object-cover' alt="Delivies" />

            <div className="mt-3">
              <h2 className="font-bold text-2xl text-white">Fridge Rentals</h2>
              <p className="mt-2  text-lg text-white font-semibold leading-relaxed">
                Rent top-quality fridges for your student accommodation or campus needs.
              </p>
                <button className='py-2 px-4 mt-2 rounded-2xl bg-white text-black transition hover:scale-105 flex items-center cursor-pointer'>Learn More <FaAngleRight className='ml-2'/></button>
            </div>
          </div>
      </Link>

      </div>
    </div>
  )
}

export default ServicesHomePage