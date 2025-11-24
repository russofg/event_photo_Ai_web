import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const DAILY_LIMIT = 15;

export const checkUsageLimit = async (userId: string): Promise<{ allowed: boolean; remaining: number }> => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const userRef = doc(firestore, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    if (data.lastDate === today) {
      const count = data.count || 0;
      return {
        allowed: count < DAILY_LIMIT,
        remaining: Math.max(0, DAILY_LIMIT - count),
      };
    } else {
      // New day, reset count
      await updateDoc(userRef, {
        lastDate: today,
        count: 0,
      });
      return { allowed: true, remaining: DAILY_LIMIT };
    }
  } else {
    // New user, create document
    await setDoc(userRef, {
      lastDate: today,
      count: 0,
    });
    return { allowed: true, remaining: DAILY_LIMIT };
  }
};

export const incrementUsage = async (userId: string): Promise<void> => {
  const today = new Date().toISOString().split("T")[0];
  const userRef = doc(firestore, "users", userId);
  
  // We assume the document exists and date is correct because checkUsageLimit was called before
  // But for safety we can use setDoc with merge to handle edge cases
  await setDoc(userRef, {
    lastDate: today,
    count: increment(1)
  }, { merge: true });
};
