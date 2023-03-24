import { rest } from "msw";

// /** JWT  */
// const crypto = require("crypto");

// function base64(json) {
//   const stringified = JSON.stringify(json);
//   // JSON을 문자열화
//   const base64Encoded = Buffer.from(stringified).toString("base64");
//   // 문자열화 된 JSON 을 Base64 로 인코딩
//   const paddingRemoved = base64Encoded.replaceAll("=", "");
//   // Base 64 의 Padding(= or ==) 을 제거

//   return paddingRemoved;
// }

// const header = {
//   alg: "HS256",
//   typ: "JWT",
// };

// const encodedHeader = base64(header);

// const payload = {
//   email: "devhudi@gmail.com",
//   name: "Hudi",
//   isAdmin: true,
// };

// const encodedPayload = base64(payload);

// const signature = crypto
//   .createHmac("sha256", "secret_key")
//   .update(`${encodedHeader}.${encodedPayload}`)
//   .digest("base64")
//   .replaceAll("=", "");

// const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
// console.log(jwt);
// /** JWT  */

const usersData = [
  {
    email: "aa123@gmail.com",
    nickName: "레모나",
    region: "서울시 강남구",
    profileImage:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    password: "12341234",
    passwordCheck: "12341234",
  },
];
const rentalProducts = [];

const token = {
  accessToken:
    "x89hm89hxnhg.wuiehdgksh3948a987sdhfj9249ejdr9iefir9.8q789aikfhkhiu",
  refreshToken:
    "cvhbxjkcfn.huihesricrniou98nsdhkjfhdskhgi4yj3f.hdsguh49re4se9ydk",
};

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

  // 박정후: 로그인
  rest.post("/users/login", async (req, res, ctx) => {
    const data = await req.json();
    console.log(data);

    return res(
      ctx.status(201),
      // ctx.status(401),

      // ctx.status(400, "miss match"),
      ctx.json({
        success: true,
        code: 0,
        result: {
          data: {
            accessToken: `Bearer ${token.accessToken}`,
            refreshToken: "httponly",
            userInfo: {
              userEmail: usersData[0].email,
              userNickName: usersData[0].nickName,
              userRegion: usersData[0].region,
              userProfileImage: usersData[0].profileImage,
            },
            message: "로그인에 성공하였습니다.",
          },
        },
      })
    );
  }),

  // 박정후: 로그인 - 토큰 갱신
  rest.post("/users/refreshtoken", async (req, res, ctx) => {
    // const data = await req.json();
    // console.log(data);

    return res(
      // ctx.status(201),
      ctx.status(401, "accessToken timeout !"),
      // ctx.status(403, "logout !"),
      ctx.json({
        accessToken: token.refreshToken,
        message: "Access Token이 재발급 되었습니다.",
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
