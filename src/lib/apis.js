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
  const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') };
  return API.get(
    `/open-ai`,
    {
      headers,
    },
    {
      "message": message,
      
    },

  )
};



export const getUserDataApi = (user) => {
  console.log("Google Api")
  return axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
      Accept: 'application/json'
    }
  })
};

export const postSignin = (user) => {
  console.log("postSignin");
  console.log(user);
  return API.post(
    `/signup`,
    {
      "email":user.email,
      "name":user.name,
      "image":user.picture,
      "google_id":user.id,
    },
   
  )
};