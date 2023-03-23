// import axios from "axios";
// import {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
//   MutableRefObject,
// } from "react";
// import { useInView } from "react-intersection-observer";
// import { RentalProduct } from "../types/product";
// import RentalProductItem from "./RentalProductItem";
// import useInfiniteScroll from "../hooks/useInfiniteScroll";

// type ScrollProps<T> = {
//   getCurrent(page: MutableRefObject<number>, inView: boolean): void;
//   children: (items: T[]) => JSX.Element;
// };

// export default function InfiniteScroll<T>({ children }: ScrollProps<T>) {
//   const page = useRef<number>(1);
//   const [ref, inView] = useInView({ rootMargin: "0px" });
//   const { posts, hasNext, fetchMore } = useInfiniteScroll<T>({
//     limit: 5,
//     page,
//     inView,
//   });

//   useEffect(() => {
//     if (inView && hasNext) {
//       fetchMore();
//     }
//   }, [fetchMore, hasNext, inView]);

//   return (
//     <>
//       {children(posts)}
//       {hasNext && (
//         <div
//           ref={ref}
//           className="left-0 absolute bottom-0 w-32 h-5"
//           style={{ bottom: "-20px" }}
//         />
//       )}
//     </>
//   );
// }
