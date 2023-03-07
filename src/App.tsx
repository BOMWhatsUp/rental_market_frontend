import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {


  return (
    <Layout>
      {/* <LoginPage></LoginPage> */}
      <SignUpPage />
    </Layout>
  );
}

export default App;
