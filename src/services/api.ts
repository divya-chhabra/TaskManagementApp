import axiosinstance from "./axios";
import { deleteCookie } from "./helpers";

export const handleLogin = async(email:string,password:string) => {

  try{
    const response = await axiosinstance.post("/api/prachub/login", {
      username: email,              //"atuny0@sohu.com",
      password:password           //"9uQFF1Lh",
    });
    return response;
  }
  catch(error){
      console.log(error);
  } 
};

export const handleLogout = async() => {

  // try{
  //   const response = await axiosinstance.post("/api/prachub/logout");
  //   return response;
  // }
  // catch(error){
  //     console.log(error);
  // } 
  deleteCookie("token");
  deleteCookie("user");
};