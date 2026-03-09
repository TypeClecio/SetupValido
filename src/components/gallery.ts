import type { ProductImage } from '../types'

export const GALLERY_MAIN_ID = 'mainImage'
export const GALLERY_GRID_ID = 'thumbGrid'

export const renderGallery = (images: ProductImage[]) => `
  <section class="gallery-card">
    <h2>Imagens do produto</h2>
    <img id="${GALLERY_MAIN_ID}" class="main-image" src="${images[0].src}" alt="${images[0].alt}" />
    <div class="thumb-grid" id="${GALLERY_GRID_ID}"></div>
  </section>
`

export const setupGallery = (images: ProductImage[]) => {
  const mainImageEl = document.querySelector<HTMLImageElement>(`#${GALLERY_MAIN_ID}`)
  const thumbGridEl = document.querySelector<HTMLDivElement>(`#${GALLERY_GRID_ID}`)
  if (!mainImageEl || !thumbGridEl) return

  let selectedIndex = 0

  const renderThumbs = () => {
    thumbGridEl.innerHTML = images
      .map(
        (image, index) =>
          `<img src="${image.src}" alt="${image.alt}" data-index="${index}" class="${index === selectedIndex ? 'is-active' : ''}" />`,
      )
      .join('')

    const active = images[selectedIndex]
    mainImageEl.src = active.src
    mainImageEl.alt = active.alt
  }

  thumbGridEl.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const thumb = target.closest('img')
    if (!thumb) return

    const indexAttr = thumb.getAttribute('data-index')
    if (!indexAttr) return

    const index = Number(indexAttr)
    if (Number.isNaN(index) || index < 0 || index >= images.length) return

    selectedIndex = index
    renderThumbs()
  })

  renderThumbs()
}

