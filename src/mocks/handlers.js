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

  //jylee: rental create
  rest.get("/api/product", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(rentalProducts));
  }),

  //jylee: rental image files
  rest.post("/api/product2", async (req, res, ctx) => {
    return res(ctx.status(201));
  }),
];
