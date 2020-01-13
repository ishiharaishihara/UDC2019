import { getCurrentLocation } from "./Location.js";
const db = firebase.firestore();
const collectionName = "comments";

const postData = (data, callback) => {
  return db
    .collection(collectionName)
    .add(data)
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(error => {
      console.error("Error adding document: ", error);
    });
};

const getData = async () => {
  const location = await getCurrentLocation();
  return await db
    .collection(collectionName)
    .get()
    .then(querySnapshot => {
      return querySnapshot.map(doc => {
        return doc.data();
      });
    });
};
export { postData, getData };
