import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <LoginPage></LoginPage>
    </Layout>
  );
}

export default App;
