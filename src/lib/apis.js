import axios from "axios"

const API = axios.create({
    // baseURL: "http://beta.racetofreedom.com/api",
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 45000,
    // headers: {
    //     token: ReactSession.get('token'),
    // },
  });

  export const sendMessage = (message) => {
    return API.get(
      `/open-ai`,
      {
        "message":message,
      },
     
    )
    .then((res) => {
      if (res?.data) {
        return {data: res.data, success: res.data.success};
      } else {
        return {data: res, success: false};
      }
    })
    .catch((error) => {
      return error.response;
    });
  };

 