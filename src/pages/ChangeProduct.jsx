import React, { useEffect, useState } from "react";
import "../styles/AddProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getOneProduct } from "../features/slices/productsSlice";

const ChangeProduct = () => {
  const { oneProduct, error, loading } = useSelector((s) => s.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    article: "",
    barcode: "",
    size: "",
    company: "",
    page: "",
  });

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (oneProduct) {
      setProduct({
        article: oneProduct.article,
        barcode: oneProduct.barcode,
        size: oneProduct.size,
        company: oneProduct.company,
        page: oneProduct.page,
      });
    }
  }, [oneProduct]);

  const handleSaveProducts = (id, product) => {
    if (!product.article || !product.barcode || !product.size || !product.company || !product.page) {
      alert("Все поля должны быть заполнены.");
      return;
    }
    dispatch(editProduct(Number(id), product));
  };

  if (loading) {
    return <h1>Загрузка...</h1>;
  }

  if (error) {
    return <h1>Ошибка: {error}</h1>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="close">
        Назад
      </button>

      <div className="add-product-container">
        <h2>Изменить товар</h2>
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
          <button
            onClick={() => handleSaveProducts(id, product)}
            className="submit-button"
          >
            Изменить товар
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProduct;
