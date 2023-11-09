import { useState } from 'react'
import ReactCrop from 'react-image-crop'

const ImageCrop = ({ crops, imgHandle}) => {
    const [crop, setCrop] = useState()
  return (
    <ReactCrop crop={crop} onChange={c => setCrop(c)}>
    <img src={crops} />
  </ReactCrop>
  )
}

export default ImageCrop