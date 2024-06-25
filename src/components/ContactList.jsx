import React, { useState, useEffect } from 'react';
import { getContacts } from '../services/contactService'; // Assuming this function fetches contacts
import { getSupplierById } from '../services/supplierService'; // Assuming this function fetches suppliers

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsData = await getContacts(); // Assuming getContacts fetches contacts from Firestore
        setContacts(contactsData);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const [supplierNames, setSupplierNames] = useState({});

  useEffect(() => {
    const fetchSupplierNames = async () => {
      const names = {};
      for (const contact of contacts) {
        try {
          const supplier = await getSupplierById(contact.supplierId);
          names[contact.supplierId] = supplier.name;
        } catch (error) {
          console.error(`Error fetching supplier with ID ${contact.supplierId}:`, error);
          names[contact.supplierId] = 'Supplier not found';
        }
      }
      setSupplierNames(names);
    };

    fetchSupplierNames();
  }, [contacts]);

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>Name:</strong> {contact.name}
            <br />
            <strong>Email:</strong> {contact.email}
            <br />
            <strong>Phone Number:</strong> {contact.phone_number}
            <br />
            <strong>Supplier:</strong> 
            {supplierNames[contact.supplierId] || 'Loading...'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
