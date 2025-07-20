import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// currentUser: object from auth context (includes uid)
// targetUserId: UID of user you're trying to follow/unfollow

export const followUser = async (currentUser, targetUserId) => {
  if (!currentUser || !targetUserId || currentUser.uid === targetUserId) return;

  const currentUid = currentUser.uid;

  const currentUserFollowingRef = doc(
    db,
    "users",
    currentUid,
    "following",
    targetUserId
  );
  const targetUserFollowersRef = doc(
    db,
    "users",
    targetUserId,
    "followers",
    currentUid
  );

  const currentUserDocRef = doc(db, "users", currentUid);
  const targetUserDocRef = doc(db, "users", targetUserId);

  try {
    const docSnap = await getDoc(currentUserFollowingRef);

    if (docSnap.exists()) {
      // ❌ Already following – so unfollow
      await deleteDoc(currentUserFollowingRef);
      await deleteDoc(targetUserFollowersRef);

      await updateDoc(currentUserDocRef, { following: increment(-1) });
      await updateDoc(targetUserDocRef, { followers: increment(-1) });
    } else {
      // ✅ Not following – so follow
      await setDoc(currentUserFollowingRef, {
        followedAt: new Date(),
      });

      await setDoc(targetUserFollowersRef, {
        followedAt: new Date(),
      });

      await updateDoc(currentUserDocRef, { following: increment(1) });
      await updateDoc(targetUserDocRef, { followers: increment(1) });
    }
  } catch (error) {
    console.error("Follow/unfollow failed:", error);
  }
};
