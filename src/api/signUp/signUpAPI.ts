import axios from "axios";

export const isExistInfoCheck = async (checkInfo: {
  type: string;
  value: string;
}) => {
  if (checkInfo.value === String(checkInfo.value)) {
    return await axios({
      method: "post",
      url: "/users/signup/check",
      headers: {
        "content-type": "application/json",
      },
      data: checkInfo,
    }).then((res) => res.data);
  } else {
    return;
  }
};

export const postSignUp = async (values: any) => {
  if (values === Object(values)) {
    return await axios({
      method: "post",
      url: "/users/signup",
      headers: {
        "content-type": "application/json",
      },
      data: values,
    }).then((res) => res.data);
  } else {
    return;
  }
};
