import React from 'react';
import NavigationBar from '../components/navbar';
import PriceForm from '../components/PriceForm';
import ProductList from '../components/ProductList';

import { Link } from 'react-router-dom';

const Price = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <PriceForm></PriceForm>
      </div>
      <div className='mt-5'>
          <Link to="/PricesPage"><h3><strong>Lista de Requisições</strong></h3></Link>
      </div>
    </div>
  );
};

export default Price;