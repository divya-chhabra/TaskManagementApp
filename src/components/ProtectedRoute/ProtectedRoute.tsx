import React, { Component } from "react";
import { getCookie } from "../../services/helpers";
import { Outlet, Navigate} from "react-router-dom";


function ProtectedRoute(){

  const token = getCookie("token");
  return token ? <Outlet/> : <Navigate to="/" replace/>;
}

export default ProtectedRoute;
