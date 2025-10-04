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
  inputLength?: number;
  outputLength?: number;
  processingTime?: number;
}

export interface SessionDocument extends SessionData {
  id: string;
}

/**
 * Save a session to Firestore
 */
export async function saveSession(
  uid: string, 
  data: { input: string; output: string; action: string; processingTime?: number }
): Promise<string> {
  try {
    if (!uid || !data.input || !data.output || !data.action) {
      throw new Error('Missing required session data');
    }

    const sessionData: SessionData = {
      ...data,
      inputLength: data.input.length,
      outputLength: data.output.length,
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(
      collection(db, `sessions/${uid}/entries`), 
      sessionData
    );
    
    console.log('✅ Session saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving session:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('permission')) {
        throw new Error('Permission denied. Please check your authentication.');
      }
      if (error.message.includes('network')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
    
    throw new Error('Failed to save session. Please try again.');
  }
}

/**
 * Get user's session history
 */
export async function getUserHistory(uid: string): Promise<SessionDocument[]> {
  try {
    if (!uid) {
      throw new Error('User ID is required');
    }

    const q = query(
      collection(db, `sessions/${uid}/entries`),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const sessions: SessionDocument[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as SessionData;
      sessions.push({
        id: doc.id,
        ...data
      });
    });
    
    console.log(`📚 Fetched ${sessions.length} sessions for user ${uid}`);
    return sessions;
  } catch (error) {
    console.error('❌ Error fetching user history:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('permission')) {
        throw new Error('Permission denied. Please check your authentication.');
      }
      if (error.message.includes('network')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
    
    throw new Error('Failed to fetch session history. Please try again.');
  }
}

/**
 * Delete a specific session
 */
export async function deleteSession(uid: string, sessionId: string): Promise<void> {
  try {
    if (!uid || !sessionId) {
      throw new Error('User ID and session ID are required');
    }

    await deleteDoc(doc(db, `sessions/${uid}/entries`, sessionId));
    console.log('🗑️ Session deleted:', sessionId);
  } catch (error) {
    console.error('❌ Error deleting session:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('permission')) {
        throw new Error('Permission denied. Please check your authentication.');
      }
      if (error.message.includes('not-found')) {
        throw new Error('Session not found. It may have already been deleted.');
      }
    }
    
    throw new Error('Failed to delete session. Please try again.');
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
