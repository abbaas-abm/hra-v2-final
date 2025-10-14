import { createFileRoute } from '@tanstack/react-router'
import ServicesHero from '@/components/ServicesHero'
import ServiceDisplay from '@/components/ServiceDisplay'
import PromotionBanner from '@/components/PromotionBanner'
import ServiceCards from '@/components/ServiceCards'
export const Route = createFileRoute('/(home)/services/')({
  head: () => ({
    meta: [
      {title: 'Smart Storage, Delivery & Fridge Rental Services | HRA Transportation'},
      {name: 'description', content: 'Discover HRA Transportation’s reliable services – from fast deliveries and secure storage to convenient fridge rentals. Affordable, hassle-free solutions designed to make your life easier.'}
    ]
  }),
  component: ServicesPage,
})

function ServicesPage() {
  return <div>
    <ServicesHero/>
    <ServiceDisplay/>
    <PromotionBanner/>
    <ServiceCards/>
  </div>
}
