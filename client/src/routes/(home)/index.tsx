import Hero from '@/components/Hero'
// import FeeEstimator from '../components/FeeEstimator';
import { createFileRoute } from '@tanstack/react-router'
import FeeEstimatorSection from '@/components/FeeEstimatorSection';
import ServicesHomePage from '@/components/ServicesHomePage';
import Testamonials from '@/components/Testamonials';
import PromotionBanner from '@/components/PromotionBanner';

export const Route = createFileRoute('/(home)/')({
  head: () => ({
    meta: [
      {title: 'HRA Transportation - Fast, Reliable Delivery, Fridge Rental and Storage Services'}
    ]
  }),
  component: HomePage,
})

function HomePage() {
  return (
    <div className="">
      <Hero/>
      <FeeEstimatorSection/>
      <ServicesHomePage/>
      <PromotionBanner />
      <Testamonials/>
    </div>
  )
}
