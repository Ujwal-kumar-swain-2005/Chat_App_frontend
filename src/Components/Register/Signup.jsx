import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { currentUser, register } from "../../Redux/Auth/Action";


import './signup.css'

const Signin = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    full_name: "",
  });
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    console.log("Full Name:", inputData.full_name);
    e.preventDefault();
    dispatch(register(inputData));
    console.log("form submitted");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }))
  };
  useEffect(() => {
    if (token) dispatch(currentUser(token))
  }, [token]);
  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate("/")
    }
  }, [auth.reqUser]);

  return (
    <body>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSubmit} className="sign-in-form">
              <h2 className="title">Sign Up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  placeholder='Username'
                  name="full_name"
                  onChange={(e) => handleChange(e)}
                  value={inputData.full_name}
                  type="text"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  placeholder='Email'
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={inputData.email}
                  type="text"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  placeholder='Password'
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={inputData.password}
                  type="text"
                />
              </div>
              <input type='submit' value="SignUp" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <img
                  style={{ width: '250px' }}
                  src="https://static.vecteezy.com/system/resources/previews/013/722/213/original/sample-qr-code-icon-png.png"
                  alt=""
                />
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h1>Whatsapp</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                minus natus est.
              </p>
              <button className="btn2" onClick={() => navigate("/signin")}>Login</button>
            </div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </body>
  );
};

export default Signin;
