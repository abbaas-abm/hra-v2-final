import DriverBenefits from '@/components/DriverBenefits'
import DriverFAQs from '@/components/DriverFAQs'
import DriverProcess from '@/components/DriverProcess'
import DriverRequirements from '@/components/DriverRequirements'
import DriverHero from '@/components/DriversHeroSection'
import PromotionBanner from '@/components/PromotionBanner'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/drivers/')({
  head: ()=> ({
    meta: [
      {title: "Drivers | Join our platform, earn on your schedule, and be part of a trusted delivery network."},
      {name: 'description', content: 'We’re more than just a delivery platform; we’re your partner in success. Join today and unlock opportunities tailored for drivers like you.'}
    ]
  }),
  component: DriverPage,
})

function DriverPage() {
  return <div>
    <DriverHero/>
    <DriverRequirements/>
    <DriverProcess/>
    <DriverBenefits/>
    <PromotionBanner/>
    <DriverFAQs/>
  </div>
}
