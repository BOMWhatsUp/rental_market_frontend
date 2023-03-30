import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
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
import Test from "./Test";
// import ScrollTest from "./pages/ScrollTest";
import axios from "axios";
import Chat from "./pages/ChatTest";
import ChatList from "./pages/ChatListTest";
import NotFound from "./pages/NotFound";

// axios에 withCredentials를 true로 설정해줘야 refreshToken cookie를 주고받을 수 있다.
axios.defaults.withCredentials = true;

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/main/*" element={<MainPage />} />
        <Route path="/product/create/*" element={<RentalCreatePage />} />
        <Route path="/product/detail/:id" element={<RentalDetailPage />} />
        <Route path="/product/return/*" element={<RentalReturnPage />} />
        <Route path="/product/pay/*" element={<RentalPayPage />} />
        <Route path="/chat/room/*" element={<ChatDetailPage />} />
        <Route path="/chat/list/*" element={<ChatListPage />} />
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/signup/*" element={<SignUpPage />} />
        <Route path="/my/*" element={<MyPage />} />
        <Route path="/my/products/*" element={<MyRentalPage />} />
        {/* <Route path="/test/*" element={<ScrollTest />} /> */}
        <Route path="/mock/test/*" element={<Test />} />
        <Route path="/test/chat/:roomId" element={<Chat />} />
        <Route path="/test/chat/list" element={<ChatList />} />
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
