// src/services/contactService.js
import { db } from '../firebase';
import { collection, getDocs, addDoc, query, where, doc , deleteDoc} from 'firebase/firestore';


export const addContactToSupplier = async (contactData) => {
  try {
    const { name, email, number ,supplierId } = contactData;

    // Reference to the 'contacts' collection
    const contactsCollection = collection(db, 'contacts');

    // Add a new document to the 'contacts' collection
    const docRef = await addDoc(contactsCollection, {
      name: name,
      email: email,
      phone_number: number,
      supplierId: supplierId
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error; 
  }
};

export const getContactsForSupplier = async (supplierId) => {
    try {
      const querySnapshot = await db.collection('suppliers').doc(supplierId).collection('contacts').get();
      const contacts = [];
      querySnapshot.forEach(doc => {
        contacts.push({ id: doc.id, ...doc.data() });
      });
      return contacts;
    } catch (error) {
      console.error("Error getting contacts: ", error);
    }
  };

  const getContacts = async () => {
    try {
      const contactsCollection = collection(db, 'contacts');
      const querySnapshot = await getDocs(contactsCollection);
      const contacts = [];
  
      querySnapshot.forEach((doc) => {
        contacts.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      return contacts;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  };
  
  export { getContacts };

  const getAllContactsWithSupplier = async () => {
    try {
      const contactsCollection = collection(db, 'contacts');
      const querySnapshot = await getDocs(contactsCollection);
      const contacts = [];
  
      querySnapshot.forEach((doc) => {
        contacts.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      return contacts;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  };
  
  export { getAllContactsWithSupplier };

  export const deleteContactById = async (contactId) => {
    try {
        const docRef = doc(db, 'contacts', contactId);
        await deleteDoc(docRef);
        console.log(`Contacts ID ${contactId} deleted sucessfully`);
    } catch (error) {
        console.error('Error deleting contact:', error)
        throw error;
    }
  }