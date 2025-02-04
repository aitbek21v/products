import React from "react";
import "../Navbar/index.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
 const navigate = useNavigate()
 const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <nav className="navbar">
      <div style={{cursor:'pointer'}} onClick={() => navigate('/')} className="navbar-brand">Управление товарами</div>
      <div className="navbar-links">
        <button onClick={() => navigate('/pageA')}>Страница A</button>
        <button onClick={() => navigate('/pageB')}>Страница B</button>
        <button onClick={() => navigate('/pageC')}>Страница C</button>
      </div>
      <div className="btns">
        <button onClick={() => navigate('/add')} style={{display:isAdmin ? 'block' : 'none'}} className="add-button">Добавить товар</button>
        <button onClick={() => navigate('/admin')} className="add-button">Войти</button>
      </div>
    </nav>
  );
};

export default Navbar;
