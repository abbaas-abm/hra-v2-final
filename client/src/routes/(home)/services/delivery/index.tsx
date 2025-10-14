import DeliveryProcess from '@/components/DeliveryProcess'
import FeeEstimatorSection from '@/components/FeeEstimatorSection'
import IndividualServiceHeroSection from '@/components/IndividualServiceHeroSection'
import OurPricing from '@/components/PricingBreakdown'
import PromotionBanner from '@/components/PromotionBanner'
import WhatWeDeliver from '@/components/WhatWeDeliverSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/services/delivery/')({
  head: () => ({
    meta: [
      {title: 'Delivery | Quick and reliable deliveries for all your needs'},
      {name: 'description', content: "Quick and reliable deliveries for all your needs whether you're relocating or just moving a few items."}
    ]
  }),
  component: DeliveryPage,
})

function DeliveryPage() {
  return <div>
    <IndividualServiceHeroSection/>
    <FeeEstimatorSection/>
    <WhyChooseUs/>
    <PromotionBanner/>
    <WhatWeDeliver/>
    <OurPricing/>
    <DeliveryProcess/>
  </div>
}
