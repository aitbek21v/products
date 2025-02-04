import React, { useState } from "react";
import "../styles/AddProduct.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { api } from "../assets/data";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    article: "",
    barcode: "",
    size: "",
    company: "",
    page: "",
  });

  const addProduct = async (product) => {
    try {
      await axios.post(api, product);
      alert('Товар успешно добавлен!');
      
      // Очистка всех полей после добавления товара
      setProduct({
        article: "",
        barcode: "",
        size: "",
        company: "",
        page: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="close">
        Назад
      </button>
      <div className="add-product-container">
        <h2>Добавить товар</h2>
        <div>
          <div className="input-group">
            <label>Артикул</label>
            <input
              onChange={(e) =>
                setProduct({ ...product, article: e.target.value })
              }
              type="text"
              name="article"
              value={product.article}
              required
            />
          </div>
          <div className="input-group">
            <label>Штрих-код</label>
            <input
              onChange={(e) =>
                setProduct({ ...product, barcode: e.target.value })
              }
              type="text"
              name="barcode"
              value={product.barcode}
              maxLength="13"
              pattern="\d{13}"
              required
            />
          </div>
          <div className="input-group">
            <label>Размер</label>
            <select
              name="size"
              value={product.size}
              onChange={(e) => setProduct({ ...product, size: e.target.value })}
            >
              {[...Array(15)].map((_, i) => (
                <option key={i} value={38 + i * 2}>
                  {38 + i * 2}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>ИП (компания)</label>
            <input
              onChange={(e) =>
                setProduct({ ...product, company: e.target.value })
              }
              type="text"
              name="company"
              value={product.company}
              required
            />
          </div>
          <div className="input-group">
            <label>Выбор страницы</label>
            <select
              name="page"
              value={product.page}
              onChange={(e) => setProduct({ ...product, page: e.target.value })}
            >
              <option>------</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <button onClick={() => addProduct(product)} className="submit-button">
            Добавить товар
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
