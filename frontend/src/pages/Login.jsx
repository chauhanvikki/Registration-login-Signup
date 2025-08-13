import { React, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate=useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  console.log("LoginInfo -> ", loginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email, and Password are required");
    }

    if (password.length < 4) {
      return handleError("Password must be at least 4 characters");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
    const result = await response.json();
    const {success,message, jwtToken, name, error}=result;
    
    if(success){
      handleSuccess(message);
      localStorage.setItem('token',jwtToken);
      localStorage.setItem('loggedInUser',name);
      setTimeout(()=>{
        navigate('/home')
      },1000)
    }
      else if(error){
        const details=error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleError(message);
      }
      console.log(result);
    }
     catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>

        <div>
          <label htmlFor="name">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Your email"
            value={loginInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Doesn't have an account?
          <Link to="/signup">Sign Up</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
