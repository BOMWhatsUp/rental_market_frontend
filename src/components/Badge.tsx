import React from "react";
import { RentalProduct } from "../types/product";

type BadgeProps = {
  value: string;
  isFull: boolean;
};
Badge.defaultProps = {
  value: "AVAILABLE",
  isFull: false,
};
export default function Badge({ value, isFull }: BadgeProps) {
  let badgeStyle =
    "badge badge-success border-base-100 p-3 absolute left-2 top-2";
  let bas =
    "badge badge-success border-base-100 gap-2 p-3 md:p-5 absolute md:text-xl right-4 top-4";
  const convertValue = () => {
    switch (value) {
      case "RENTED":
        badgeStyle = "badge-error";
        return "대여중";
      case "AVAILABLE":
        badgeStyle = "badge-success";
        return "대여가능";
      case "WAITING":
        badgeStyle = "badge-warning";
        return "반납대기";
      case "RETURNED":
        badgeStyle = "badge-info";
        return "반납완료";
      default:
        badgeStyle = "badge-outline";
        return "전체";
    }
  };
  let label = convertValue();
  if (isFull) {
    return (
      <div
        className={`badge border-base-100 p-3 md:p-5 absolute md:text-xl right-4 top-4 ${badgeStyle}`}
      >
        <p>{label}</p>
      </div>
    );
  } else {
    return (
      <div
        className={`badge border-base-100 p-3 absolute left-2 top-2 ${badgeStyle}`}
      >
        <p>{label}</p>
      </div>
    );
  }
}
