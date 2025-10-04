import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  orderBy, 
  query,
  Timestamp 
} from "firebase/firestore";

export interface SessionData {
  input: string;
  output: string;
  action: string;
  createdAt: Timestamp;
}

export interface SessionDocument extends SessionData {
  id: string;
}

/**
 * Save a session to Firestore
 */
export async function saveSession(
  uid: string, 
  data: { input: string; output: string; action: string }
): Promise<string> {
  try {
    const sessionData: SessionData = {
      ...data,
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(
      collection(db, `sessions/${uid}/entries`), 
      sessionData
    );
    
    console.log('Session saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving session:', error);
    throw new Error('Failed to save session');
  }
}

/**
 * Get user's session history
 */
export async function getUserHistory(uid: string): Promise<SessionDocument[]> {
  try {
    const q = query(
      collection(db, `sessions/${uid}/entries`),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const sessions: SessionDocument[] = [];
    
    querySnapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data() as SessionData
      });
    });
    
    return sessions;
  } catch (error) {
    console.error('Error fetching user history:', error);
    throw new Error('Failed to fetch session history');
  }
}

/**
 * Delete a specific session
 */
export async function deleteSession(uid: string, sessionId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, `sessions/${uid}/entries`, sessionId));
    console.log('Session deleted:', sessionId);
  } catch (error) {
    console.error('Error deleting session:', error);
    throw new Error('Failed to delete session');
  }
}

/**
 * Delete all sessions for a user
 */
export async function clearAllSessions(uid: string): Promise<void> {
  try {
    const sessions = await getUserHistory(uid);
    const deletePromises = sessions.map(session => 
      deleteSession(uid, session.id)
    );
    
    await Promise.all(deletePromises);
    console.log('All sessions cleared for user:', uid);
  } catch (error) {
    console.error('Error clearing all sessions:', error);
    throw new Error('Failed to clear session history');
  }
}

/**
 * Get recent sessions (last N sessions)
 */
export async function getRecentSessions(uid: string, limit: number = 10): Promise<SessionDocument[]> {
  try {
    const allSessions = await getUserHistory(uid);
    return allSessions.slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent sessions:', error);
    throw new Error('Failed to fetch recent sessions');
  }
}

/**
 * Search sessions by action type
 */
export async function getSessionsByAction(uid: string, action: string): Promise<SessionDocument[]> {
  try {
    const allSessions = await getUserHistory(uid);
    return allSessions.filter(session => session.action === action);
  } catch (error) {
    console.error('Error fetching sessions by action:', error);
    throw new Error('Failed to fetch sessions by action');
  }
}
