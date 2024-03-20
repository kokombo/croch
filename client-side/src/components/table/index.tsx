// import React from 'react'

// const Table = () => {
//   return (
//     <table className="table-auto w-full">
//       <thead>
//         <tr>
//           <th className="w-2/6">Product</th>
//           <th className="w-1/6">Price</th>
//           <th className="w-1/6">Quantity</th>
//           <th className="w-1/6">Size</th>
//           <th className="w-1/6">Sub-Total</th>
//         </tr>
//       </thead>

//       <tbody className="gap-4">
//         {isLoading ? (
//           <span>Loading...</span>
//         ) : (
//           cart?.cartItems?.map((cartItem) => {
//             return (
//               <tr key={cartItem.info._id}>
//                 <td className="w-2/6">
//                   <div className="flex items-center gap-2">
//                     <button>R</button>

//                     <div className="relative h-[72px] w-[72px] ">
//                       <Image
//                         src={cartItem.thumbNail}
//                         alt=""
//                         fill
//                         quality={100}
//                         loading="lazy"
//                         className="object-contain"
//                         sizes="any"
//                       />
//                     </div>

//                     <h6 className="text-sm flex-wrap w-[50%]">
//                       {cartItem.title}
//                     </h6>
//                   </div>
//                 </td>

//                 <td className="w-1/6 self-center">{cartItem.info.price}</td>
//                 <td className="w-1/6">
//                   <Counter
//                     count={cartItem.count}
//                     decreaseCount={decreaseCount}
//                     increaseCount={increaseCount}
//                   />
//                 </td>
//                 <td className="w-1/6">XL</td>
//                 <td className="w-1/6">{cartItem.cummulativePrice} </td>
//               </tr>
//             );
//           })
//         )}
//       </tbody>
//     </table>
//   );
// }

// export default Table
