import { db } from '../firebase';
import { collection, addDoc, getDocs, getDoc, doc, deleteDoc } from 'firebase/firestore';

export const addSupplier = async (supplierData) => {
  try {
    console.log("Dados Chegando" + supplierData)
    const collectionRef = collection(db, 'suppliers');
    const docRef = await addDoc(collectionRef, supplierData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding supplier: ", error);
  }
};

export const getSuppliers = async () => {
    try {
      const collectionRef = collection(db, 'suppliers');
      const querySnapshot = await getDocs(collectionRef);
      
      const suppliers = [];
      querySnapshot.forEach((doc) => {
        suppliers.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      return suppliers;
    } catch (error) {
      console.error('Error fetching suppliers: ', error);
      throw error;
    }
  };


const getSupplierById = async (supplierId) => {
  try {
    const docRef = doc(db, 'suppliers', supplierId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error(`Supplier with ID ${supplierId} not found`);
    }
  } catch (error) {
    console.error('Error fetching supplier:', error);
    throw error;
  }
};

export { getSupplierById };

export const deleteSupplierById = async (supplierId) => {
  try {
      const docRef = doc(db, 'suppliers', supplierId);
      await deleteDoc(docRef);
      console.log(`Request ID ${supplierId} deleted sucessfully`);
  } catch (error) {
      console.error('Error deleting request:', error)
      throw error;
  }
}