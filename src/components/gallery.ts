import type { ProductImage } from '../types'

export const GALLERY_MAIN_ID = 'mainImage'
export const GALLERY_GRID_ID = 'thumbGrid'
export const GALLERY_MODAL_ID = 'imageFullscreenModal'
export const GALLERY_MODAL_IMAGE_ID = 'imageFullscreenModalImg'

export const renderGallery = (images: ProductImage[]) => `
  <section class="gallery-card">
    <h2>Imagens do produto</h2>
    <img id="${GALLERY_MAIN_ID}" class="main-image" src="${images[0].src}" alt="${images[0].alt}" />
    <div class="thumb-grid" id="${GALLERY_GRID_ID}"></div>
  </section>
  <div id="${GALLERY_MODAL_ID}" class="image-modal" aria-hidden="true">
    <img id="${GALLERY_MODAL_IMAGE_ID}" class="image-modal-content" src="" alt="" />
  </div>
`

export const setupGallery = (images: ProductImage[]) => {
  const mainImageEl = document.querySelector<HTMLImageElement>(`#${GALLERY_MAIN_ID}`)
  const thumbGridEl = document.querySelector<HTMLDivElement>(`#${GALLERY_GRID_ID}`)
  const modalEl = document.querySelector<HTMLDivElement>(`#${GALLERY_MODAL_ID}`)
  const modalImageEl = document.querySelector<HTMLImageElement>(`#${GALLERY_MODAL_IMAGE_ID}`)
  if (!mainImageEl || !thumbGridEl || !modalEl || !modalImageEl) return

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

  mainImageEl.addEventListener('click', () => {
    modalImageEl.src = mainImageEl.src
    modalImageEl.alt = mainImageEl.alt
    modalEl.classList.add('is-open')
    modalEl.setAttribute('aria-hidden', 'false')
  })

  modalEl.addEventListener('click', (event) => {
    if (event.target !== modalEl) return
    modalEl.classList.remove('is-open')
    modalEl.setAttribute('aria-hidden', 'true')
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    modalEl.classList.remove('is-open')
    modalEl.setAttribute('aria-hidden', 'true')
  })

  renderThumbs()
}
