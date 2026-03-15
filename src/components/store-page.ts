import type { ProductInfo } from '../types'
import { renderDetailsCard } from './details-card'
import { renderGallery } from './gallery'
import { renderOfferCard } from './offer-card'
import { renderStoreHeader } from './store-header'

export const renderStorePage = (product: ProductInfo) => {
  const initialConfiguration = product.configurations[0]

  return `
  ${renderStoreHeader(product.seller, product.location)}
  <main class="store-page">
    ${renderGallery(product.media)}
    ${renderOfferCard(product, initialConfiguration)}
    ${renderDetailsCard(initialConfiguration)}
  </main>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-brand">
        <div class="footer-logo">
          <img class="footer-logo-image" src="/logo.svg" alt="setupvalido" />
          <div>
            <strong class="footer-logo-name">setupvalido</strong>
            <span class="footer-logo-slogan">Excelência em cada frame.</span>
          </div>
        </div>
        <p class="footer-copy">© 2026 setupvalido. Todos os direitos reservados.</p>
      </div>
      <div class="footer-links">
        <a href="https://www.instagram.com/typeclecio/" target="_blank" rel="noreferrer">
          <span class="footer-link-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17" cy="7" r="1.2" />
            </svg>
          </span>
          Instagram
        </a>
        <a href="https://github.com/TypeClecio" target="_blank" rel="noreferrer">
          <span class="footer-link-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </span>
          GitHub
        </a>
      </div>
    </div>
  </footer>
`
}
