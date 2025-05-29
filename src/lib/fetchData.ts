// lib/fetchData.ts
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export const fetchCollection = async (collectionName: string) => {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export async function writeDocument(
  collectionName: string,
  data: any,
  id?: string
) {
  if (id) {
    const ref = doc(db, collectionName, id); // Set with custom ID
    await setDoc(ref, data, { merge: true });
    return { id };
  } else {
    const ref = await addDoc(collection(db, collectionName), data); // Auto ID
    return { id: ref.id };
  }
}

export async function deleteDocument(collection: string, id: string) {
  if (!id) throw new Error("Missing document ID");
  const ref = doc(db, collection, id);
  await deleteDoc(ref);
}
