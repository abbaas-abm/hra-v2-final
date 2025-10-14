import IndividualServiceHeroSection from '@/components/IndividualServiceHeroSection'
import PromotionBanner from '@/components/PromotionBanner'
import StorageProcess from '@/components/StorageProcess'
import TypesOfStorage from '@/components/TypesOfStorage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/services/storage/')({
  head: () => ({
    meta: [
      {title: 'Storage | Secure and budget friendly storage space for your valuables.'},
      {name: 'description', content: 'Secure and budget friendly storage space for your valuables during moves or extended travel.'}
    ]
  }),
  component: StoragePage,
})

function StoragePage() {
  return <div>
    <IndividualServiceHeroSection/>
    <TypesOfStorage/>
    <PromotionBanner/>
    <StorageProcess/>
  </div>
}
