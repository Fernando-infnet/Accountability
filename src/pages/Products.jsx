import React from 'react';
import NavigationBar from '../components/navbar';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const Products = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <ProductForm></ProductForm>
        <ProductList></ProductList>
      </div>
    </div>
  );
};

export default Products;