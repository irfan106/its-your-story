import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import FollowButton from "./FollowButton";

export default function UserProfilePage({ userId, currentUserId }) {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const followersSnap = await getDocs(
        collection(db, "users", userId, "followers")
      );
      const followingSnap = await getDocs(
        collection(db, "users", userId, "following")
      );
      setFollowerCount(followersSnap.size);
      setFollowingCount(followingSnap.size);
    };
    fetchCounts();
  }, [userId]);

  return (
    <div className="p-4 max-w-md mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold">User Profile</h1>

      <div className="flex justify-center space-x-6 text-lg">
        <div>
          <span className="font-semibold">{followerCount}</span>
          <p className="text-sm text-gray-600">Followers</p>
        </div>
        <div>
          <span className="font-semibold">{followingCount}</span>
          <p className="text-sm text-gray-600">Following</p>
        </div>
      </div>

      <FollowButton currentUserId={currentUserId} targetUserId={userId} />
    </div>
  );
}
