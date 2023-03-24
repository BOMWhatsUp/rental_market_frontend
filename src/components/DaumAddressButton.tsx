import React, { useState } from "react";
import ReactDom from "react-dom";
import DaumPostcode from "react-daum-postcode";

const PopupDom = ({ children }: any) => {
  const el: any = document.getElementById("popupDom");
  return ReactDom.createPortal(children, el);
};

const PopupPostCode = (props: any) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    // console.log(fullAddress);
    // console.log(data.zonecode);
    // console.log(data.sigungu);
    props.onComplete(`${data.sido} ${data.sigungu}`);
    //props.onComplete(`${data.sigungu}`);
    props.onClose();
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "600px",
    height: "600px",
    padding: "7px",
  };

  return (
    <div className="bg-white text-end border-2 border-primary">
      <DaumPostcode onComplete={handlePostCode} />
      <button
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="btn btn-ghost btn-xs m-2"
      >
        닫기
      </button>
    </div>
  );
};

const DaumPostcodeInput = (props: any) => {
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const handleSelectPostCode = (address: string) => {
    props.onSelectAddress(address);
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-outline btn-primary whitespace-nowrap ml-2"
        onClick={openPostCode}
      >
        우편번호 검색
      </button>

      <div id="popupDom" className="absolute top-1/2 left-1/2">
        {isPopupOpen && (
          <PopupDom>
            <PopupPostCode
              onClose={closePostCode}
              onComplete={handleSelectPostCode}
            />
          </PopupDom>
        )}
      </div>
    </div>
  );
};

export default DaumPostcodeInput;
