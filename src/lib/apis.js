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
      console.log("res api");
      console.log(res);
      if (res?.data) {
        return {data: res.data, success: res.data.success};
      } else {
        return {data: res, success: false};
      }
    })
    .catch((error) => {
      console(error.response) ;
    });
  };

  

  // export const getUserDataApi = (user) => {
  //   console.log("user")
  //   return axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //     headers: {
  //         Authorization: `Bearer ${user.access_token}`,
  //         Accept: 'application/json'
  //     }
  // })
  //   .then((res) => {
  //     if (res?.data) {
  //       return {data: res.data, success: res.data.success};
  //     } else {
  //       return {data: res, success: false};
  //     }
  //   })
  //   .catch((error) => {
  //     return error.response;
  //   });
  // };