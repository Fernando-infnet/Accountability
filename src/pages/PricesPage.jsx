import React from 'react';
import NavigationBar from '../components/navbar';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import PriceList from '../components/PriceList';

const PricesPage = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5 px-0">
        <PriceList></PriceList>
      </div>
    </div>
  );
};

export default PricesPage;