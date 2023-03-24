import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">404 Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">잘못된 페이지 요청입니다.</p>
      <Link
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        to={"/"}
      >
        메인으로
      </Link>
    </div>
  );
};

export default NotFoundPage;
