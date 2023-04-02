import axios from "axios";

export const isExistInfoCheck = async (checkInfo: {
  key: string;
  value: string;
}) => {
  if (checkInfo.value === String(checkInfo.value)) {
    return await axios
      .get(
        `http://52.78.150.154:8080/check/${checkInfo.key}/${checkInfo.value}`
      )
      .then((res) => res.data);

    // return await axios({
    //   method: "post",
    //   url: "http://52.78.150.154:8080/check/email",
    //   // url: "http://43.200.141.247:8080/signup",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   data: checkInfo,
    // }).then((res) => res.data);
  } else {
    return;
  }
};

export const postSignUp = async (values: any) => {
  if (values === Object(values)) {
    return await axios({
      method: "post",
      url: "http://52.78.150.154:8080/signup",
      // url: "http://43.200.141.247:8080/signup",
      headers: {
        "content-type": "application/json",
      },
      data: values,
    }).then((res) => res.data);
  } else {
    return;
  }
};
