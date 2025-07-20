import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useUserProfile = (uid) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!uid) return;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.warn("No profile found for UID:", uid);
        setProfile(null);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [uid]);

  return { profile, loading };
};
