import { Link } from "@tanstack/react-router"
import { FaAngleRight } from "react-icons/fa"

type PromotionBannerProps = {
  text?: string
}

const PromotionBanner = ({ text = "Ready to Move, Store or Rent with HRA Transportation?" }: PromotionBannerProps) => {
  return (
    <div data-aos="fade-up" className="p-5 bg-yellow-300 text-center flex flex-col items-center justify-center min-h-[40vh]">
      <div className="font-black text-3xl text-white">{text}</div>
      <p className="my-3 text-semibold text-white text-lg">
        Affordable, reliable and hassle-free transport solutions tailored to your needs.
      </p>
      <Link to="/services">
        <button className="text-black cursor-pointer bg-white py-2 px-4 rounded-3xl mt-3 transition hover:scale-105 flex items-center gap-3">Learn More <FaAngleRight className="text-xl"/></button>
      </Link>
    </div>
  )
}

export default PromotionBanner
