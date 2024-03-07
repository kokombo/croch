import Image from "next/image"

type Props = {
    product?: Partial<Product> //change //temporary
    extraClasses: string
 
}


const ProductCardOwnerInfo = (props: Props) => {
  return (
    <div className = {`${props.extraClasses} w-[90%] h-16 bg-white rounded flex items-center justify-start gap-2`}  >
        <Image src = {props.product?.owner?.picture!} alt = {`product-${props.product?.owner?._id} owner image`} height ={40} width = {40} className = "rounded-full"/>

        <p>{props.product?.owner?.firstName}</p>
    </div>
  )
}

export default ProductCardOwnerInfo