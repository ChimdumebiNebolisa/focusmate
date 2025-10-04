// Firebase helper functions for Firestore operations

import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from "firebase/firestore";
import { db } from "../firebase";

// Types for our data structures
export interface Workspace {
  id?: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
}

export interface HistoryItem {
  id?: string;
  action: string;
  input: string;
  output: string;
  timestamp: Timestamp;
  userId: string;
}

// Workspace operations
export const workspaceHelpers = {
  async create(workspace: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, 'workspaces'), {
      ...workspace,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  },

  async getByUser(userId: string) {
    const q = query(
      collection(db, 'workspaces'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Workspace[];
  },

  async update(id: string, updates: Partial<Workspace>) {
    const docRef = doc(db, 'workspaces', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  },

  async delete(id: string) {
    const docRef = doc(db, 'workspaces', id);
    await deleteDoc(docRef);
  }
};

// History operations
export const historyHelpers = {
  async create(historyItem: Omit<HistoryItem, 'id' | 'timestamp'>) {
    const docRef = await addDoc(collection(db, 'history'), {
      ...historyItem,
      timestamp: Timestamp.now(),
    });
    return docRef.id;
  },

  async getByUser(userId: string, limit = 50) {
    const q = query(
      collection(db, 'history'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.slice(0, limit).map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as HistoryItem[];
  },

  async delete(id: string) {
    const docRef = doc(db, 'history', id);
    await deleteDoc(docRef);
  }
};
