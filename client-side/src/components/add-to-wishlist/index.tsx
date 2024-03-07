import { icons } from "@/constants"
import Image from "next/image"

type Props = {
  extraClasses?:string;
}

const AddToWishlist = (props: Props) => {
  return (
    <button type = 'button' className = {`${props.extraClasses}`} >
      <Image src = {icons.bookmark} alt = "add to wishlist icon" height = {32} width= {32} />
    </button>
  )
}

export default AddToWishlist 