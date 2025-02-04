import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct } from "../features/slices/productsSlice";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import "../styles/PageA.css"; 
import { useNavigate } from "react-router-dom";

const PageA = () => {
  const { products, error, loading } = useSelector((s) => s.product);
   const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();
  const naviagte = useNavigate()

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const pageValue = 'A';

  const filteredProduct = products.filter((product) => product.page === pageValue);

  return (
    <>
      <Navbar />
      <div className="container">
        {loading && <h1>Загрузка...</h1>}
        {error && <h1>{error}</h1>}

        <table className="products-table">
          <thead>
            <tr>
              <th>Артикул</th>
              <th>Штрих-код</th>
              <th>Размер</th>
              <th>Компания</th>
              <th>Страница</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredProduct?.map((product) => (
              <tr key={product.id}>
                <td>{product.article}</td>
                <td>{product.barcode}</td>
                <td>{product.size}</td>
                <td>{product.company}</td>
                <td>{product.page}</td>
                <td>
                  
                  <button style={{display:isAdmin ? 'block' : 'none'}} onClick={() => dispatch(deleteProduct(product.id))} className="action-button delete-button">
                    <FaTrash /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PageA;
