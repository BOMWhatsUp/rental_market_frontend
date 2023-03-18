import { rest } from "msw";

const todos = [
  { id: 1, text: "먹기" },
  { id: 2, text: "자기" },
];
const rentalProducts = [];

export const handlers = [
  // 할일 목록
  rest.get("/todos", (req, res, ctx) => {
    // ctx.delay(3000)
    return res(ctx.status(200), ctx.json(todos));
  }),

  // 할일 추가
  rest.post("/todo", async (req, res, ctx) => {
    const data = await req.json();
    todos.push(data);
    return res(ctx.status(201));
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
