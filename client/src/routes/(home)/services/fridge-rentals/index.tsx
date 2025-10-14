import FridgeRentalProcess from '@/components/FridgeRentalProcess'
import FridgeRequiredDocuments from '@/components/FridgeRequiredDocuments'
import FridgeSelection from '@/components/FridgeSelection'
import IndividualServiceHeroSection from '@/components/IndividualServiceHeroSection'
import PromotionBanner from '@/components/PromotionBanner'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/services/fridge-rentals/')({
  head: () => ({
    meta: [
      {title: 'Fridge Rentals | Affordable, convenient fridge rental solutions for students'},
      {name: 'description', content: 'Affordable, convenient fridge rental solutions for students and short-term stays. Hassle free and student friendly.'}
    ]
  }),
  component: FridgeRentalsPage,
})

function FridgeRentalsPage() {
  return <div>
    <IndividualServiceHeroSection/>
    <FridgeSelection/>
    <FridgeRequiredDocuments/>
    <PromotionBanner/>
    <FridgeRentalProcess/>
  </div>
}
