import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, serverTimestamp} from 'firebase/firestore';


export const addBlockedUsers = async (blockedData) => {
    try {
      console.log("Dados Chegando" + blockedData)
      const collectionRef = collection(db, 'blockedUsers');
      const docRef = await addDoc(collectionRef, blockedData);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding blocking user: ", error);
    }
  };

export const getBlockedUsers = async () => {
    try {
      const collectionRef = collection(db, 'blockedUsers');
      const querySnapshot = await getDocs(collectionRef);
      
      const blockedUsers = [];
      querySnapshot.forEach((doc) => {
        blockedUsers.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      return blockedUsers;
    } catch (error) {
      console.error('Error fetching blocked Users: ', error);
      throw error;
    }
  };


export const deleteBlockedState = async (blockedId) => {
    try {
        const docRef = doc(db, 'blockedUsers', blockedId);
        await deleteDoc(docRef);
        console.log(`Request ID ${blockedId} deleted sucessfully`);
      } catch (error) {
        console.error('Error fetching supplier:', error);
        throw error;
      }
};

  