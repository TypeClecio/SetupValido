import type { ProductInfo } from '../types'

export const sellerPhone = '558899778856'

export const productInfo: ProductInfo = {
  title: 'PC Gamer Ryzen 7 5700X - Setup Completo',
  subtitle: 'Computador de mesa de alta performance com monitor 200Hz e perifericos inclusos.',
  highlights: [
    'Ryzen 7 5700X + GTX 1080TI',
    '24 GB RAM DDR4 e 1 TB de armazenamento',
    'Watercooler 360mm + 6 fans com controladora',
    'Monitor 200Hz e teclado Mancer Ghost',
  ],
  priceOptions: [
    { label: 'Com Ryzen 7 5700X', price: 'R$ 9.500,00' },
    { label: 'Com Ryzen 5 5500', price: 'R$ 8.700,00' },
  ],
  specifications: [
    { label: 'Processador', value: 'AMD Ryzen 7 5700X' },
    { label: 'Memoria', value: '24 GB DDR4' },
    { label: 'Armazenamento', value: '1 TB' },
    { label: 'Placa de video', value: 'NVIDIA GeForce GTX 1080TI' },
    { label: 'Placa-mae', value: 'ASUS TUF GAMING' },
    { label: 'Fonte', value: '850W 80 Plus' },
    { label: 'Refrigeracao', value: 'Watercooler 360mm + 6 fans com controladora' },
    { label: 'Gabinete', value: 'Branco aquario' },
    { label: 'Perifericos', value: 'Monitor 200Hz e teclado Mancer Ghost' },
  ],
  images: [
    {
      src: '/imagens/setup-completo.jpeg',
      alt: 'Setup completo',
    },
  ],
}
