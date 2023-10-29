import { Skeleton } from '@mui/material'
import './productCard.css'

const ProductCardSkeleton = () => {
  return (
    <a className="product-card mt-4" href="#dolce-gabbana-cropped">
      <Skeleton variant="rect" className="product-card__image" width={"210px"} height={"300px"}/>
      <Skeleton variant="text" className="product-card__brand ml-2" />
      <Skeleton variant="text" className="product-card__description ml-2" />
      <Skeleton variant="text" className="product-card__price ml-2" />
    </a>
  )
}

export default ProductCardSkeleton