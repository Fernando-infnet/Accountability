import { db } from '../firebase';
import { getFirestore, collection, query, addDoc , where, getDocs, serverTimestamp, orderBy } from 'firebase/firestore';


export const addProducts = async (ProductData) => {
    try {
      const { price, supplierId, requestId } = ProductData;
  
      const productsCollection = collection(db, 'prices');
  
      const docRef = await addDoc(productsCollection, {
        price: price,
        supplierId: supplierId,
        requestId: requestId,
        data: serverTimestamp(),
      });
  
      return docRef.id;
    } catch (error) {
      console.error('Error adding price:', error);
      throw error; 
    }
  };

  export const getPricesByRequest = async (requestId) => {
    try {
      const pricesRef = collection(db, 'prices');
      const q = query(pricesRef, where('requestId', '==', requestId));
      const querySnapshot = await getDocs(q);
      const prices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return prices;
    } catch (error) {
      console.error('Error fetching prices: ', error);
      throw error;
    }
  };

  