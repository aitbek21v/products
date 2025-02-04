import React, { useState } from "react";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/slices/authSlice";

const Admin = () => {
    const navigate = useNavigate()
    const [loginInput, setLoginInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message,setMessage] = useState('')
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        if (loginInput === "admin" && password === "pass123") {
          dispatch(login());
          setMessage('Поздравляем вы стали админом')
          setError("");
        } else {
          setError("Неверный логин или пароль!");
        }
      };
    
      const handleLogout = () => {
        dispatch(logout());
      };

  return (
    <div style={{paddingTop:'30px'}}>

    <div className="container">
    <button onClick={() => navigate(-1)} className="close">Назад</button>
    <div className="admin-container">
      <h2>Авторизация</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Логин"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      {message && <p className="error">{message}</p>}

        <button onClick={handleLogin} className="login-button">
          Войти
        </button>
    </div>
    </div>
    </div>


  );
};

export default Admin;
