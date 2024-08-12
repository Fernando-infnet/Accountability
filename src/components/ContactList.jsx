import React, { useState, useEffect } from 'react';
import { getContacts } from '../services/contactService'; 
import { getSupplierById } from '../services/supplierService'; 

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsData = await getContacts();
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
          names[contact.supplierId] = 'Não encontrado';
        }
      }
      setSupplierNames(names);
    };

    fetchSupplierNames();
  }, [contacts]);

  return (
    <div>
      <h2 class="mt-2">Contact List</h2>
      {contacts.map((contact) => (
          <li key={contact.id}>
            <div class="card mt-3 mb-3">
                <div class="card-body">
                    <h5 class="card-title">Name: {contact.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Email:</strong> {contact.email}</li>
                    <li class="list-group-item"><strong>Número:</strong> {contact.phone_number}</li>
                    <li class="list-group-item"><strong>Fornecedor:</strong> 
                    {supplierNames[contact.supplierId] || 'Carregando...'}</li>
                </ul>
            </div>
          </li>
        ))}
    </div>
  );
};

export default ContactList;
