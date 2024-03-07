import Image from "next/image"

type Props = {
    product?: Partial<Product> //change //temporary
    extraClasses: string
 
}


const ProductCardOwnerInfo = (props: Props) => {
  return (
    <div className = {`${props.extraClasses} w-[90%] h-16 bg-white rounded flex items-center justify-start gap-2 px-[17px] py-3`}  >
        <Image src = {props.product?.owner?.picture!} alt = {`product-${props.product?.owner?._id} owner image`} height ={40} width = {40} className = "rounded-[100%] h-10 w-10"/>

        <p>{props.product?.owner?.firstName}</p>
    </div>
  )
}

export default ProductCardOwnerInfo