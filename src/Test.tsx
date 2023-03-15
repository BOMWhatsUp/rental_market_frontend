import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface Todo {
  id: number;
  text: string;
}

export const getTodos = async () => {
  return await axios.get("/todos").then((response) => response.data);
};

export const addTodo = async (todo: { id: number; text: string }) => {
  await axios({
    method: "post",
    url: "/todo",
    headers: {
      "content-type": "application/json",
    },
    data: todo,
  });
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`todo/${id}`);
};

export const updateTodo = async (id: number, text: string) => {
  await axios.put(`todo/${id}`, {
    text,
  });
};

function App() {
  const { isLoading, isError, data, error }: any = useQuery("todos", getTodos);

  const [todo, setTodo] = useState<Todo>({ id: 0, text: "" });

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(todo);
    setTodo({ ...todo, text: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => {
      return { ...prev, text: e.target.value };
    });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <div>
      <h2>할일 목록</h2>

      <ul>
        {data.map((todo: Todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="새로운 할일"
          // disabled={loading}
          value={todo.text}
          onChange={handleChange}
        />
        <button disabled={!todo}>추가</button>
      </form>
    </div>
  );
}

export default App;
