import {
  doc,
  getDoc,
  increment,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// Toggle follow/unfollow between current user and target user
export const toggleFollow = async (currentUserId, targetUserId) => {
  if (!currentUserId || !targetUserId || currentUserId === targetUserId) return;

  const followingRef = doc(
    db,
    "users",
    currentUserId,
    "following",
    targetUserId
  );
  const followerRef = doc(
    db,
    "users",
    targetUserId,
    "followers",
    currentUserId
  );
  const currentUserDoc = doc(db, "users", currentUserId);
  const targetUserDoc = doc(db, "users", targetUserId);

  const alreadyFollowing = (await getDoc(followingRef)).exists();
  const batch = writeBatch(db);

  if (alreadyFollowing) {
    batch.delete(followingRef);
    batch.delete(followerRef);
    batch.update(currentUserDoc, { following: increment(-1) });
    batch.update(targetUserDoc, { followers: increment(-1) });
  } else {
    batch.set(followingRef, { followedAt: serverTimestamp() });
    batch.set(followerRef, { followedAt: serverTimestamp() });
    batch.update(currentUserDoc, { following: increment(1) });
    batch.update(targetUserDoc, { followers: increment(1) });
  }

  await batch.commit();
  return !alreadyFollowing;
};

export const isFollowing = async (currentUserId, targetUserId) => {
  const ref = doc(db, "users", currentUserId, "following", targetUserId);
  const snap = await getDoc(ref);
  return snap.exists();
};
