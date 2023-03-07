import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";

function App() {


  return (
    <Layout>
      <LoginPage></LoginPage>
    </Layout>
  );
}

export default App;
