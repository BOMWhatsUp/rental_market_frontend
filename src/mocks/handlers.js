import { rest } from "msw";

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
  {
    email: "bb123@gmail.com",
    nickName: "개구리페페",
    region: "서울시 종로구",
    profileImage:
      "https://blog.kakaocdn.net/dn/wR5bN/btqSxCsIZD8/0g1pTeaqRwXKvBcxPtqQE0/img.jpg",
    password: "12341234",
    passwordCheck: "12341234",
  },
];
const rentalProducts = [];
const rentalProductHistories = [];
const rentalPayProduct = {
  id: 6,
  sellerId: "test20@naver.com",
  nickname: "test20",
  title: "test20",
  imageUrls: ["e7b27759-2eed-49ed-9", "7f2ec183-dd8f-4db3-9"],
  maxRentalPeriod: "ONEMONTH",
  categoryName: "BOOK",
  unitPrice: 600,
};
const chatRoomList = [
  {
    id: "1",
    productId: "1",
    lastChatMsg: "안녕하세요~",
  },
  {
    id: "2",
    productId: "2",
    lastChatMsg: "상품 문의드립니다!",
  },
  {
    id: "3",
    productId: "3",
    lastChatMsg: "안녕하세요^^",
  },
];

const sampleProduct = {
  id: `id1`,
  title: `샘플상품입니다`,
  content: `샘플상품입니다 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세`,
  unitPrice: 1300,
  maxRentalPeriod: "ONEMONTH",
  categoryName: "FURNITURE",
  wishRegion: "서울 종로구 삼청로 12길 34",
  sellerId: `pepe@gmail.com`,
  nickname: `개구리페페`,
  status: "RENTED",
  returnDate: new Date("2023-4-6"),
  imageUrls: [
    "https://dnvefa72aowie.cloudfront.net/origin/article/202301/EC146E3A1E533D4A8BBAB4560932F7167E7D5D28FE0F91B56BAC5F0742125F09.jpg?q=95&s=1440x1440&t=inside",
  ],
  modifiedAt: new Date("2023-3-29"),
  sellerProfile:
    "https://blog.kakaocdn.net/dn/wR5bN/btqSxCsIZD8/0g1pTeaqRwXKvBcxPtqQE0/img.jpg",
  sellerRegion: "서울시 도봉구",
};

for (let i = 1; i <= 20; i++) {
  const product = {
    id: `id${i}`,
    title: `title${i}`,
    content: `content${i}`,
    unitPrice: 1300,
    maxRentalPeriod: "ONEMONTH",
    categoryName: "FURNITURE",
    wishRegion: "서울 종로구",
    sellerId: `nick${i}@gmail.com`,
    nickname: `닉네임${i}`,
    status: "RENTED",
    returnDate: new Date("2023-4-6"),
    mainImageUrl:
      "https://user-images.githubusercontent.com/37766175/62363267-f219ba80-b559-11e9-9943-855d42b2fc11.png",
  };
  const product2 = {
    id: `id${i + 100}`,
    title: `엘사 공주드레스${i + 100}`,
    content: `엘사공주드레스 고급스러워요 우리딸 몰래 빌려드립니다... ${
      i + 100
    }`,
    unitPrice: 5000,
    maxRentalPeriod: "TWOMONTH",
    categoryName: "CLOTHING",
    wishRegion: "성남시 분당구",
    sellerId: `whatsup@naver.com`,
    nickname: `봄이와썹`,
    status: "AVAILABLE",
    returnDate: null,
    mainImageUrl:
      "https://dnvefa72aowie.cloudfront.net/origin/article/202301/EC146E3A1E533D4A8BBAB4560932F7167E7D5D28FE0F91B56BAC5F0742125F09.jpg?q=95&s=1440x1440&t=inside",
  };
  rentalProducts.push(product);
  rentalProducts.push(product2);
}

//history
for (let i = 1; i <= 20; i++) {
  const product = {
    id: `id${i}`,
    title: `title${i}`,
    content: `content${i}`,
    totalPrice: 30000,
    maxRentalPeriod: "ONEMONTH",
    categoryName: "FURNITURE",
    wishRegion: "서울 종로구",
    sellerId: `nick${i}@gmail.com`,
    sellerNickName: `닉네임${i}`,
    status: "AVAILABLE",
    rentalDate: new Date("2023-2-6"),
    returnDate: new Date("2023-3-6"),
    returnYn: true,
    mainImageUrl:
      "https://user-images.githubusercontent.com/37766175/62363267-f219ba80-b559-11e9-9943-855d42b2fc11.png",
  };
  const product2 = {
    id: `id${i + 100}`,
    title: `엘사 공주드레스${i + 100}`,
    content: `엘사공주드레스 고급스러워요 우리딸 몰래 빌려드립니다... ${
      i + 100
    }`,
    totalPrice: 24900,
    maxRentalPeriod: "TWOMONTH",
    categoryName: "CLOTHING",
    wishRegion: "성남시 분당구",
    sellerId: `whatsup@naver.com`,
    sellerNickName: `봄이와썹`,
    status: "RENTED",
    rentalDate: new Date("2023-3-6"),
    returnDate: new Date("2023-5-6"),
    returnYn: false,
    mainImageUrl:
      "https://dnvefa72aowie.cloudfront.net/origin/article/202301/EC146E3A1E533D4A8BBAB4560932F7167E7D5D28FE0F91B56BAC5F0742125F09.jpg?q=95&s=1440x1440&t=inside",
  };
  rentalProductHistories.push(product);
  rentalProductHistories.push(product2);
}

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
    const isValidUser = usersData.filter((user) => user.email === data.email);
    console.log(isValidUser);

    if (isValidUser.length > 0) {
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
                userEmail: isValidUser[0].email,
                userNickName: isValidUser[0].nickName,
                userRegion: isValidUser[0].region,
                userProfileImage: isValidUser[0].profileImage,
              },
              message: "로그인에 성공하였습니다.",
            },
          },
        })
      );
    } else {
      return res(
        // ctx.status(401),

        ctx.status(400, "miss match"),

        ctx.json({
          success: false,
          code: 0,
          result: {
            message: "존재하지 않은 회원입니다.",
          },
        })
      );
    }
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

  // 박정후: 채팅 - 리스트
  rest.get("/chat/list", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        list: chatRoomList,
      })
    );
  }),

  //jylee: rental create

  rest.post("/api/product", async (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  // rest.post("/api/product2", async (req, res, ctx) => {
  //   const data = await req.json();
  //   rentalProducts.push(data);
  //   return res(ctx.status(201), ctx.json(rentalProducts));
  // }),

  //jylee: rental detail get
  rest.get("/api/products/detail/id1", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleProduct));
  }),

  rest.get("/api/products/pay/id1", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleProduct));
  }),

  //jylee: rental list w get-react-query
  rest.get("/api/products", (req, res, ctx) => {
    const _size = req.url.searchParams.get("size");
    const _page = req.url.searchParams.get("page");
    const _categoryName = req.url.searchParams.get("categoryName");
    const _wishRegion = req.url.searchParams.get("wishRegion");
    const _keyword = req.url.searchParams.get("keyword");
    const _status = req.url.searchParams.get("status");
    //console.log("test", _size, _page, _categoryName, _wishRegion, _keyword);
    const size = parseInt(_size || "10");
    const page = parseInt(_page || "1");
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const filteredProducts = rentalProducts.filter(
      (pd) => pd.categoryName === _categoryName
    );
    const paginatedProducts = rentalProducts.slice(startIndex, endIndex);
    console.log(
      "test",
      _size,
      _page,
      _categoryName,
      _wishRegion,
      _keyword,
      _status
    );
    return res(ctx.json(paginatedProducts));
  }),
  //jylee: rental history list -seller w get-react-query
  rest.get(`/api/seller/history`, (req, res, ctx) => {
    const _size = req.url.searchParams.get("size");
    const _page = req.url.searchParams.get("page");
    const _userId = req.url.searchParams.get("userId");
    const size = parseInt(_size || "10");
    const page = parseInt(_page || "1");
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedProducts = rentalProductHistories.slice(
      startIndex,
      endIndex
    );
    console.log("history test", _size, _page, _userId);
    return res(ctx.json(paginatedProducts));
  }),

  //jylee: rental history list- buyer w get-react-query
  rest.get(`/api/buyer/history`, (req, res, ctx) => {
    const _size = req.url.searchParams.get("size");
    const _page = req.url.searchParams.get("page");
    const _userId = req.url.searchParams.get("userId");
    const size = parseInt(_size || "10");
    const page = parseInt(_page || "1");
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedProducts = rentalProductHistories.slice(
      startIndex,
      endIndex
    );
    console.log("history test", _size, _page, _userId);
    return res(ctx.json(paginatedProducts));
  }),

  //jylee: rental detail get
  rest.delete("/api/products/delete/id1", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
