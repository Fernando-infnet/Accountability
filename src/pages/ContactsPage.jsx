import React from 'react';
import NavigationBar from '../components/navbar';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

const ContactsView = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5 px-0">
        <ContactList></ContactList>
      </div>
    </div>
  );
};

export default ContactsView;