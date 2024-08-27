import React from 'react';
import NavigationBar from '../components/navbar';
import ContactForm from '../components/ContactForm';

import { Link } from 'react-router-dom';

const Contacts = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5 px-0">
        <ContactForm></ContactForm>
        <div className='mt-5'>
          <Link to="/ContactsView"><h3><strong>Lista de Contatos</strong></h3></Link>
        </div>
      </div>
    </div>
  );
};

export default Contacts;