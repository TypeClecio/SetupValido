import type { ProductLocation, SellerHighlight, SellerInfo } from '../types'

const clockIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
`

const pinIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 3a7 7 0 0 1 7 7c0 4.6-5 9.5-7 11.5-2-2-7-6.9-7-11.5a7 7 0 0 1 7-7Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
`

const highlightIcons: Record<SellerHighlight['icon'], string> = {
  shield: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3 5 6v6c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 2 2.2 3.5-3.7" />
    </svg>
  `,
  truck: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="2" y="7" width="12" height="8" rx="2" />
      <path d="M14 10h4l3 3v2h-7" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
    </svg>
  `,
  tag: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 8V4h4l10 10-4 4L3 8Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  `,
}

const renderHighlights = (items: SellerHighlight[]) =>
  items
    .map(
      (item) => `
        <span class="store-highlight">
          <span class="store-highlight-icon">${highlightIcons[item.icon]}</span>
          <span>${item.label}</span>
        </span>
      `,
    )
    .join('')

export const renderStoreHeader = (seller: SellerInfo, location: ProductLocation) => `
  <header class="store-header">
    <div class="store-header-main">
      <div class="store-header-brand">
        <img class="store-header-logo" src="${seller.logoSrc}" alt="${seller.name}" />
        <div class="store-header-information">
          <p class="store-header-eyebrow">Loja</p>
          <h2 class="store-header-title">${seller.name}</h2>
          <p class="store-header-slogan">${seller.slogan}</p>
        </div>
      </div>
    <div class="store-header-highlights">
      <span class="store-highlight">
        <span class="store-highlight-icon">${pinIcon}</span>
        <span>${location.city} - ${location.state}</span>
      </span>
      <span class="store-highlight">
        <span class="store-highlight-icon">${clockIcon}</span>
        <span>${seller.responseTime}</span>
      </span>
      ${renderHighlights(seller.highlights)}
    </div>
  </div>
</header>
`
