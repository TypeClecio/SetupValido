import type { ProductMedia } from '../types'

export const GALLERY_STAGE_ID = 'mainMediaStage'
export const GALLERY_MAIN_ID = 'mainMedia'
export const GALLERY_GRID_ID = 'thumbGrid'

const VIDEO_THUMB_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

const renderMainMedia = (media: ProductMedia, fetchPriority: 'high' | 'auto' = 'auto') => `
  ${
    media.type === 'image'
      ? `<img id="${GALLERY_MAIN_ID}" class="main-media" src="${media.src}" alt="${media.alt}" data-media-type="image" loading="${fetchPriority === 'high' ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${fetchPriority}" />`
      : `<video id="${GALLERY_MAIN_ID}" class="main-media main-video" src="${media.src}" poster="${media.poster ?? ''}" controls playsinline preload="metadata" aria-label="${media.alt}" data-media-type="video"></video>`
  }
`

const renderThumbPreview = (media: ProductMedia, index: number) => {
  if (media.type === 'image') {
    const thumbSrc = media.thumbSrc ?? media.src
    return `<img src="${thumbSrc}" alt="${media.alt}" loading="lazy" decoding="async" />`
  }

  const thumbSrc = media.thumbSrc ?? media.poster ?? VIDEO_THUMB_PLACEHOLDER

  return `
    <img
      src="${thumbSrc}"
      alt="${media.alt}"
      loading="lazy"
      decoding="async"
      data-video-thumb-index="${index}"
    />
    <span class="thumb-badge">VIDEO</span>
  `
}

export const renderGallery = (media: ProductMedia[]) => {
  const initialMedia = media[0]

  if (!initialMedia) {
    return `
      <section class="gallery-card">
        <h2>Imagens do produto</h2>
        <p>Nenhuma midia disponivel.</p>
      </section>
    `
  }

  return `
    <section class="gallery-card">
      <h2>Imagens do produto</h2>
      <div id="${GALLERY_STAGE_ID}" class="main-media-stage">
        ${renderMainMedia(initialMedia, 'high')}
      </div>
      <div class="thumb-grid" id="${GALLERY_GRID_ID}"></div>
    </section>
  `
}

export const setupGallery = (media: ProductMedia[]) => {
  const mainStageEl = document.querySelector<HTMLDivElement>(`#${GALLERY_STAGE_ID}`)
  const thumbGridEl = document.querySelector<HTMLDivElement>(`#${GALLERY_GRID_ID}`)
  if (!mainStageEl || !thumbGridEl || media.length === 0) return

  let selectedIndex = 0

  const openFullscreen = async () => {
    if (!mainStageEl.requestFullscreen) return

    try {
      await mainStageEl.requestFullscreen()
    } catch {
      // Ignore browsers that block fullscreen.
    }
  }

  const bindMainMediaEvents = () => {
    const mainMediaEl = mainStageEl.querySelector<HTMLElement>(`#${GALLERY_MAIN_ID}`)
    const selectedMedia = media[selectedIndex]

    if (!mainMediaEl || !selectedMedia) return

    if (selectedMedia.type === 'image') {
      mainMediaEl.addEventListener('click', () => {
        void openFullscreen()
      })
    }
  }

  const renderSelectedMedia = () => {
    const activeMedia = media[selectedIndex]

    if (!activeMedia) return

    mainStageEl.innerHTML = renderMainMedia(activeMedia, 'auto')
    bindMainMediaEvents()
  }

  const renderThumbs = () => {
    thumbGridEl.innerHTML = media
      .map(
        (item, index) => `
          <button
            type="button"
            class="thumb-item ${index === selectedIndex ? 'is-active' : ''}"
            data-index="${index}"
            aria-label="Mostrar ${item.alt}"
          >
            ${renderThumbPreview(item, index)}
          </button>
        `,
      )
      .join('')
  }

  thumbGridEl.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const thumb = target.closest<HTMLButtonElement>('[data-index]')
    if (!thumb) return

    const indexAttr = thumb.dataset.index
    if (!indexAttr) return

    const index = Number(indexAttr)
    if (Number.isNaN(index) || index < 0 || index >= media.length) return

    selectedIndex = index
    renderSelectedMedia()
    renderThumbs()
  })

  renderSelectedMedia()
  renderThumbs()
}
