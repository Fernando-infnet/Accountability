import React from 'react';
import NavigationBar from '../components/navbar';
import PriceForm from '../components/PriceForm';

const Price = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <PriceForm></PriceForm>
      </div>
    </div>
  );
};

export default Price;