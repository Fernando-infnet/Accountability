import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, serverTimestamp} from 'firebase/firestore';

export const addRequests = async (ProductData) => {
  try {
    console.log("Dados Chegando" + ProductData)

    const { description, productId, userUid, userMail } = ProductData; 

    const collectionRef = collection(db, 'requests');

    const docRef = await addDoc(collectionRef, {
        description : description,
        productId: productId,
        userUid: userUid,
        userMail: userMail,
        data: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding request: ", error);
  }
};

export const getRequests = async () => {
    try {
      const collectionRef = collection(db, 'requests');
      
      const querySnapshot = await getDocs(collectionRef);
      
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      return requests;
    } catch (error) {
      console.error('Error fetching requests: ', error);
      throw error;
    }
  };


export const getRequestsById = async (userUid) => {
  try {
    const requestsRef = collection(db, 'requests');
    const q = query(requestsRef, where('userUid', '==', userUid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const requests = querySnapshot.docs.map((doc) => ({
            id: doc.id,  
            ...doc.data() 
          }));

        return requests
    } else {
        throw new Error(`No requests found for userUid ${userUid}`);
    }
  } catch (error) {
    console.error('Error fetching supplier:', error);
    throw error;
  }
};

export const deleteRequestById = async (requestId) => {
    try {
        const requestRef = doc(db, 'requests', requestId);
        await deleteDoc(requestRef);
        console.log(`Request ID ${requestId} deleted sucessfully`);
    } catch (error) {
        console.error('Error deleting request:', error)
        throw error;
    }
}

 