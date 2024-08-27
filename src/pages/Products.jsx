import React from 'react';
import NavigationBar from '../components/navbar';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <ProductForm></ProductForm>
      </div>
      <div className='mt-5'>
          <Link to="/ProductsPage"><h3><strong>Lista de Produtos</strong></h3></Link>
      </div>
    </div>
  );
};

export default Products;