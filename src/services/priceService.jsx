import { db } from '../firebase';
import { getFirestore, collection, query, addDoc , where, getDocs } from 'firebase/firestore';


export const addProducts = async (ProductData) => {
    try {
      const { price, supplierId, productId } = ProductData;
  
      // Reference to the 'contacts' collection
      const productsCollection = collection(db, 'prices');
  
      // Add a new document to the 'contacts' collection
      const docRef = await addDoc(productsCollection, {
        price: price,
        supplierId: supplierId,
        productId: productId
      });
  
      return docRef.id;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error; 
    }
  };

  export const getPricesByProduct = async (productId) => {
    try {
      const pricesRef = collection(db, 'prices');
      const q = query(pricesRef, where('productId', '==', productId));
      const querySnapshot = await getDocs(q);
      const prices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return prices;
    } catch (error) {
      console.error('Error fetching prices: ', error);
      throw error;
    }
  };