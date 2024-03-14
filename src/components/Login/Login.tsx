import { useState } from "react";
import TextInput from "../Form/TextInput";
import Button from "../ui/Button";
import "./Login.css";
import { handleLogin } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../services/helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = () => {
    if(email==""){
      return alert("Email is required")
    }
    else if(password==""){
      return alert("Password is required")
    }
    // if all good
    handleLogin(email, password).then((res:any) => {
      console.log(res);
      if(res?.status==200){

        const token:string = res?.data.token;
        const user:string = res?.data.user.first_name;
        const expirationDays = 7; // Cookie expiration in days
        setCookie('token', token, expirationDays);
        setCookie('user', user,7);
        navigate("./tasks");
      }
    }).catch(err => console.log(err) );
  }


  return (
    <div className="form-wrapper">
      <h2>Login </h2>
      <form>
        <TextInput
          placeholder="Enter your Email"
          type="text"
          label="Email"
          callback={(value: string) => setEmail(value)}
        />
        <TextInput
          placeholder="Enter Password"
          type="password"
          label="Password"
          callback={(value: string) => setPassword(value)}
        />
        <Button
          type="button"
          text="Login"
          cssclass="btn-fw"
          callback={() => handleSubmit()}
        />
      </form>
    </div>
  );
};

export default Login;
