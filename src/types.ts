export type ProductImage = {
  src: string
  alt: string
}

export type PriceOption = {
  label: string
  price: string
}

export type Specification = {
  label: string
  value: string
}

export type ProductInfo = {
  title: string
  subtitle: string
  highlights: string[]
  priceOptions: PriceOption[]
  specifications: Specification[]
  images: ProductImage[]
}

