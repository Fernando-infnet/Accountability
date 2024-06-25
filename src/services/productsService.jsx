import { db } from '../firebase';
import { collection, addDoc, getDocs, getDoc, doc } from 'firebase/firestore';

export const addProducts = async (productData) => {
  try {
    console.log("Dados Chegando" + productData)
    const collectionRef = collection(db, 'products');
    const docRef = await addDoc(collectionRef, productData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding supplier: ", error);
  }
};

export const getProducts = async () => {
    try {
      const collectionRef = collection(db, 'products');
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


const getProductsById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error(`Supplier with ID ${productId} not found`);
    }
  } catch (error) {
    console.error('Error fetching supplier:', error);
    throw error;
  }
};

export { getProductsById };
