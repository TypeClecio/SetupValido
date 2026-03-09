import type { ProductInfo } from '../types'

export const renderDetailsCard = (product: ProductInfo) => `
  <section class="details-card">
    <h2>Especificacoes tecnicas</h2>
    <dl>
      ${product.specifications
        .map(
          (spec) => `
            <div>
              <dt>${spec.label}</dt>
              <dd>${spec.value}</dd>
            </div>
          `,
        )
        .join('')}
    </dl>
  </section>
`

