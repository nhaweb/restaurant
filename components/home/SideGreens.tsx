// import Image from "next/image";
// import { assets } from "@/lib/assets";

// type Side = "left" | "right";

// type Props = {
//   side: Side;
//   /** Vertical placement within the parent `relative` section */
//   className?: string;
// };

// /**
//  * Leafy side garnish from the Elite Foodtuck home frame.
//  * Far-left / far-right, partially off-canvas.
//  * Black matte PNGs are keyed out on white via `mix-blend-screen`.
//  */
// export function SideGreens({ side, className = "" }: Props) {
//   const isLeft = side === "left";

//   return (
//     <div className="relative">
//       <Image
//         src={assets.aboutLeaf}
//         alt=""
//         width={280}
//         height={360}
//         aria-hidden
//         className={[
//           "pointer-events-none absolute z-0 hidden select-none mix-blend-screen lg:block",
//           isLeft
//             ? "w-[210px] rotate-[28deg] left-0 xl:w-[270px] 2xl:w-[310px]"
//             : "right-0 w-[210px] -rotate-[28deg] scale-x-[-1] xl:w-[270px] 2xl:w-[310px]",
//           className,
//         ]
//           .filter(Boolean)
//           .join(" ")}
//       />
//     </div>

//   );
// }
