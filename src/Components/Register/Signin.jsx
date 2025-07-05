import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, login } from '../../Redux/Auth/Action';
import './signin.css'

const Signin = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const token = localStorage.getItem('token');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(inputData));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInputData(values => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate('/');
    }
  }, [auth.reqUser, navigate]);

  return (

    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={inputData.email}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={inputData.password}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
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
            <button className="btn2" onClick={() => navigate("/signup")}>Sign up</button>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>

  );
};

export default Signin;
