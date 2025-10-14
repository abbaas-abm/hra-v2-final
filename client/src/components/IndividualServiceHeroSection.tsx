import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import storageImg from '../../public/images/storage-hero-img.png';
import fridgeImg from '../../public/images/fridge-hero-img.png';
import deliveryImg from '../../public/images/delivery-hero-img.png';
import { FaAngleDoubleRight } from "react-icons/fa";

type ServiceHero = {
    id: number;
    title: string;
    subtitle: string;
    url: string;
    urlText: string;
    img: string;
};

const IndividualServiceHeroSection = () => {
    const [page, setPage] = useState<ServiceHero>();
    const location = useLocation();

    const heroInformation:ServiceHero[] = [
        {
            id: 1,
            title: 'Deliveries',
            subtitle: `Quick and reliable deliveries for all your needs whether you're relocating or just moving a few items.`,
            url: '/services/delivery/order',
            urlText: 'Schedule a Delivery',
            img: deliveryImg
        },
        {
            id: 2,
            title: 'Fridge Rentals',
            subtitle: `Affordable, convenient fridge rental solutions for students and short-term stays. Hassle free and student friendly.`,
            url: '/services/fridge-rentals/order',
            urlText: 'Rent a Fridge',
            img: fridgeImg
        },
        {
            id: 3,
            title: 'Storage',
            subtitle: `Secure and budget friendly storage space for your valuables during moves or extended travel.`,
            url: '/services/storage/order',
            urlText: 'Store Your Items Today',
            img: storageImg
        },
    ]

    useEffect(()=>{
        if (location.pathname === '/services/delivery'){
        setPage(heroInformation[0])
    } 
    else if (location.pathname === '/services/fridge-rentals'){
        setPage(heroInformation[1])
    }
    else{
        setPage(heroInformation[2])
    }
    }, [])

  return (
    <div className="bg-yellow-300 p-5 min-h-[50vh] flex flex-col md:flex-row justify-around items-center gap-4">
        <div data-aos="fade-right" className="text-white w-full  md:max-w-[50%]">
            <h1 className="font-black text-3xl">{page?.title}</h1>
            <p className="my-5 text-xl">{page?.subtitle}</p>
            <Link to={page?.url}>
            <button className="text-black rounded-3xl bg-white py-2 px-4 text-lg cursor-pointer transition hover:scale-105 flex items-center gap-3">
                {page?.urlText} <FaAngleDoubleRight/>
            </button>
        </Link>
        </div>
        <img 
        data-aos="fade-left"
        src={page?.img} 
        alt={page?.title}
        className="size-70"
        />
    </div>
  )
}
export default IndividualServiceHeroSection