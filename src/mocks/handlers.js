import { rest } from "msw";

const usersData = [
  {
    email: "aa123@gmail.com",
    nickName: "레모나",
    region: "서울시 강남구",
    password: "12341234",
    passwordCheck: "12341234",
  },
];
const rentalProducts = [];

for (let i = 1; i <= 20; i++) {
  const product = {
    id: `id${i}`,
    title: `title${i}`,
    content: `content${i}`,
    unitPrice: 1300,
    maxRentalPeriod: "90",
    categoryId: "FURNITURE",
    wishRegion: "서울 종로구",
    sellerId: `nick${i}@gmail.com`,
    nickname: `닉네임${i}`,
    thumbnailSrc:
      "https://user-images.githubusercontent.com/37766175/62363267-f219ba80-b559-11e9-9943-855d42b2fc11.png",
  };
  rentalProducts.push(product);
}

export const handlers = [
  // // 할일 목록
  // rest.get("/todos", (req, res, ctx) => {
  //   // ctx.delay(3000)
  //   return res(ctx.status(200), ctx.json(todos));
  // }),

  // 박정후: 이메일, 닉네임 체크
  rest.post("/users/signup/check", async (req, res, ctx) => {
    const { type, value } = await req.json();
    const existUserInfo = usersData.find((user) =>
      type === "email" ? user.email === value : user.nickName === value
    );

    if (!existUserInfo) {
      return res(
        ctx.status(201),
        ctx.json({
          result: false,
          message: `사용 가능한 ${
            type === "email" ? "이메일" : "닉네임"
          }입니다.`,
        })
      );
    } else {
      return res(
        ctx.status(201),
        ctx.json({
          result: true,
          errorCode: `${
            type === "email"
              ? "ALREADY_SIGNUP_EMAIL"
              : "ALREADY_SIGNUP_NICKNAME"
          }`,
          message: `이미 사용중인 ${
            type === "email" ? "이메일" : "닉네임"
          }입니다.`,
        })
      );
    }
  }),

  // 박정후: 회원가입 추가
  rest.post("/users/signup", async (req, res, ctx) => {
    const data = await req.json();
    console.log(data);
    usersData.push(data);
    return res(
      ctx.status(201),
      ctx.json({
        message: "회원가입에 성공하였습니다.",
      })
    );
  }),

  //jylee: rental create
  rest.post("/api/product", async (req, res, ctx) => {
    const data = await req.json();
    rentalProducts.push(data);
    return res(ctx.status(201), ctx.json(rentalProducts));
  }),

  //jylee: rental get
  rest.get("/api/product", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(rentalProducts));
  }),
  //jylee: rental get
  rest.get("/api/products", (req, res, ctx) => {
    const _limit = req.url.searchParams.get("_limit");
    const _page = req.url.searchParams.get("_page");
    const _categoryName = req.url.searchParams.get("_category");
    const _wishRegion = req.url.searchParams.get("_region");
    const _status = req.url.searchParams.get("_status");
    const limit = parseInt(_limit || "3"); // Use a default value of 3 if _limit is not provided
    const page = parseInt(_page || "1"); // Use a default value of 1 if _page is not provided
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = rentalProducts.slice(
      startIndex,
      startIndex + limit
    );

    return res(
      ctx.json({
        data: rentalProducts.slice(startIndex, endIndex),
        hasNextPage: endIndex < rentalProducts.length,
        // data: rentalProducts.slice(startIndex, endIndex),
        // hasNextPage: endIndex < rentalProducts.length,
      })
      //ctx.json(paginatedProducts), // Return only the paginated products
      //ctx.delay(1000) // simulate delay in response
    );
  }),

  //jylee: rental get-react-query
  rest.get("/api/productss", (req, res, ctx) => {
    const _size = req.url.searchParams.get("size");
    const _page = req.url.searchParams.get("page");
    //console.log("test", _size, _page);
    const size = parseInt(_size || "10");
    const page = parseInt(_page || "1");
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedProducts = rentalProducts.slice(startIndex, endIndex);

    return res(ctx.json(paginatedProducts));
  }),

  //jylee: rental image files
  rest.post("/api/product2", async (req, res, ctx) => {
    return res(ctx.status(201));
  }),
];
