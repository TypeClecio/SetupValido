import type { ProductInfo } from '../types'
import { renderDetailsCard } from './details-card'
import { renderGallery } from './gallery'
import { renderOfferCard } from './offer-card'

export const renderStorePage = (product: ProductInfo, whatsappUrl: string) => `
  <main class="store-page">
    ${renderGallery(product.images)}
    ${renderOfferCard(product, whatsappUrl)}
    ${renderDetailsCard(product)}
  </main>
`

