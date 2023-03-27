import React from "react";
import { RentalProduct } from "../types/product";

type BadgeProps = {
  value: string;
};
Badge.defaultProps = {
  value: "AVAILABLE",
};
export default function Badge({ value }: BadgeProps) {
  let badgeStyle =
    "badge badge-success border-base-100 p-3 absolute left-2 top-2";
  const convertValue = () => {
    switch (value) {
      case "RENTED":
        badgeStyle =
          "badge badge-error flex flex-col border-base-100  p-3 absolute left-2 top-2";
        return "대여중";
      case "AVAILABLE":
        badgeStyle =
          "badge badge-success flex flex-col border-base-100  p-3 absolute left-2 top-2";
        return "대여가능";
      case "WAITING":
        badgeStyle =
          "badge badge-warning flex flex-col border-base-100  p-3 absolute left-2 top-2";
        return "반납대기";
    }
  };
  let label = convertValue();
  return (
    <div className={badgeStyle}>
      <p>{label}</p>
    </div>
  );
}
