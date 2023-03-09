import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatDetailPage from "./pages/ChatDetailPage";
import ChatListPage from "./pages/ChatListPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import MyRentalPage from "./pages/MyRentalPage";
import RentalCreatePage from "./pages/RentalCreatePage";
import RentalDetailPage from "./pages/RentalDetailPage";
import RentalReturnPage from "./pages/RentalReturnPage";
import RentalPayPage from "./pages/RentalPayPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/main/*" element={<MainPage />} />
        <Route path="/product/create/*" element={<RentalCreatePage />} />
        <Route path="/product/detail/*" element={<RentalDetailPage />} />
        <Route path="/product/return/*" element={<RentalReturnPage />} />
        <Route path="/product/pay/*" element={<RentalPayPage />} />
        <Route path="/chat/room/*" element={<ChatDetailPage />} />
        <Route path="/chat/list/*" element={<ChatListPage />} />
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/signup/*" element={<SignUpPage />} />
        <Route path="/my/*" element={<MyPage />} />
        <Route path="/my/products/*" element={<MyRentalPage />} />
        <Route path="/" element={<Navigate replace to="/main" />} />
      </Routes>
    </Layout>
  );

  // const routes = [
  //   {
  //     path: "/",
  //     element: <MainPage />,
  //   },
  //   {
  //     path: "/login",
  //     element: <LoginPage />,
  //   },
  // ];

  //return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
