export const maxRentalPeriod = (value: string) => {
  switch (value) {
    case "ONEMONTH":
      return "30";
    case "TWOMONTH":
      return "60";
    case "THREEMONTH":
      return "90";
    default:
      return "0";
  }
};
export const categoryName = (value: string) => {
  switch (value) {
    case "CLOTHING":
      return "의류";
    case "HOME":
      return "생활가전";
    case "FURNITURE":
      return "가구/인테리어";
    case "DIGITAL":
      return "디지털기기";
    case "BOOK":
      return "도서";
    case "GAMEANDRECORD":
      return "게임/음반";
    default:
      return "전체";
  }
};
export const productStatus = (value: string) => {
  switch (value) {
    case "RENTED":
      return "대여중";
    case "WAITING":
      return "반납대기";
    case "AVAILABLE":
      return "대여가능";
    default:
      return "전체";
  }
};
