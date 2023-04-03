import React, { useState, useEffect } from "react";
import RentalProductItem from "../components/RentalProductItem";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo } from "../atoms/userInfo";
import {
  deleteProductHistory,
  getHistoryProducts,
  updateProductHistory,
} from "../api/rentalProduct/rentalProductAPI";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import ProductHistoryList from "../components/ProductHistoryList";
import { token } from "../atoms/token";

export default function MyRentalHistoryPage() {
  //token
  const accessToken = useRecoilValue(token); //FIXME: hook 에러 나서
  //Login User 정보
  const userId = useRecoilValue(userInfo).userEmail;

  //const userId = user.userEmail;//FIXME: 더미데이터 없앤것
  const [currentTab, setCurrentTab] = useState("seller");
  const queryClient = useQueryClient();
  const deleteHistoryMutation = useMutation(
    "deleteProductHistory",
    async (historyId: string) => {
      const res = await deleteProductHistory(historyId);
      return res;
    },
    {
      onSuccess: (res) => {
        console.log("response test", res);
        queryClient.invalidateQueries("sellerHistory");
        alert(res.data);
      },
    }
  );
  const updateHistoryMutation = useMutation(
    "updateProductHistory",
    async (historyId: string) => {
      const res = await updateProductHistory(historyId);
      return res;
    },
    {
      onSuccess: (res) => {
        console.log("response test", res);
        queryClient.invalidateQueries("sellerHistory");
        alert(res.data);
      },
    }
  );
  const onDeleteHistory = (historyId: string) => {
    if (confirm("해당 렌탈내역을 정말로 삭제하시겠습니까?")) {
      console.log("삭제함");

      deleteHistoryMutation.mutate(historyId);
    }
  };

  const onUpdateHistory = (historyId: string) => {
    if (
      confirm(
        "해당 렌탈내역을 반납완료처리하여 '대여 가능'상태로 바꾸시겠습니까?"
      )
    ) {
      //submit delete id
      //product id 말고 history id 보내면 됨
      console.log("반납완료 처리");
      updateHistoryMutation.mutate(historyId);
    }
  };

  const size = 6;
  const [isSellerHistory, setIsSellerHistory] = useState(true);

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isError,
    isLoading,
  } = useInfiniteQuery(
    ["sellerHistory", currentTab],
    ({ pageParam = 1 }) =>
      getHistoryProducts(accessToken, isSellerHistory, userId, pageParam, size),
    {
      enabled: !!userId,
      //TODO: accessToken 기능 머지 되면, null check 해야함
      //enabled: !!userId && !!accessToken,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
      onSuccess(data) {},

      refetchIntervalInBackground: true,
    }
  );

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        //console.log("fetching is true");
        if (hasNextPage) await fetchNextPage();
        //setPageData({ ...data });
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const handleChangeTab = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLAnchorElement)) {
      return;
    }
    setIsSellerHistory(e.target.dataset.title === "seller");
    setCurrentTab(`${e.target.dataset.title}`);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="px-5 md:px-16 lg:px-32">
          <h1 className="text-2xl">나의 렌탈 내역</h1>
        </div>
        <div className="px-5 md:px-16 lg:px-32 mt-5">
          <div className="tabs tabs-boxed">
            <a
              className={currentTab === "buyer" ? "tab tab-active" : "tab"}
              data-title="buyer"
              onClick={handleChangeTab}
            >
              빌린 상품 내역
            </a>
            <a
              className={currentTab === "seller" ? "tab tab-active" : "tab"}
              data-title="seller"
              onClick={handleChangeTab}
            >
              빌려준 상품 내역
            </a>
          </div>
        </div>

        {currentTab === "seller" ? (
          <div className="px-5 md:px-16 lg:px-32">
            <ProductHistoryList
              data={data}
              isSuccess={isSuccess}
              isSeller={true}
              onDeleteHistory={onDeleteHistory}
              onUpdateHistory={onUpdateHistory}
            />
          </div>
        ) : (
          <div className="px-5 md:px-16 lg:px-32">
            <ProductHistoryList
              data={data}
              isSuccess={isSuccess}
              isSeller={false}
              onDeleteHistory={onDeleteHistory}
              onUpdateHistory={onUpdateHistory}
            />
          </div>
        )}
      </div>
    </>
  );
}
