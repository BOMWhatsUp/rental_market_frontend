import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatDetailPage from "./pages/ChatDetailPage";
import ChatListPage from "./pages/ChatListPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import MyRentalHistoryPage from "./pages/MyRentalHistoryPage";
import RentalCreatePage from "./pages/RentalCreatePage";
import RentalDetailPage from "./pages/RentalDetailPage";
import RentalReturnPage from "./pages/RentalReturnPage";
import RentalPayPage from "./pages/RentalPayPage";
import axios from "axios";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import NotFound from "./pages/NotFound";
import RentalDetailTestPage from "./pages/RentalDetailTestPage";
import { useRecoilValue } from "recoil";
import { token } from "./atoms/token";
// axios에 withCredentials를 true로 설정해줘야 refreshToken cookie를 주고받을 수 있다.
axios.defaults.withCredentials = false;

function App() {
  const tokenValue: string = useRecoilValue(token);

  return (
    <Layout>
      <Routes>
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/signup/*" element={<SignUpPage />} />
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/main/*"
          element={tokenValue ? <MainPage /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/product/create/*"
          element={
            tokenValue ? <RentalCreatePage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/chat/list"
          element={
            tokenValue ? <ChatListPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/product/detail/:id"
          element={
            tokenValue ? <RentalDetailPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/product/return/:id"
          element={
            tokenValue ? <RentalReturnPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/product/pay/:id"
          element={
            tokenValue ? <RentalPayPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/my/*"
          element={tokenValue ? <MyPage /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/my/products/*"
          element={
            tokenValue ? (
              <MyRentalHistoryPage />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/chat/room/:roomId"
          element={tokenValue ? <Chat /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/my/products/*"
          element={
            tokenValue ? (
              <MyRentalHistoryPage />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
