import React from 'react';
import NavigationBar from '../components/navbar';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import ProductList from '../components/ProductList';

const ProductsPage = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5 px-0">
        <ProductList></ProductList>
      </div>
    </div>
  );
};

export default ProductsPage;