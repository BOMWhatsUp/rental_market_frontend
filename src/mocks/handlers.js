import { rest } from "msw";

const todos = [
  { id: 1, text: "먹기" },
  { id: 2, text: "자기" },
];

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
];
