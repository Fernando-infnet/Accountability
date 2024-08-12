import React from 'react';
import NavigationBar from '../components/navbar';
import PriceForm from '../components/PriceForm';
import ProductList from '../components/ProductList';

const Price = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <PriceForm></PriceForm>
        <ProductList></ProductList>
      </div>
    </div>
  );
};

export default Price;