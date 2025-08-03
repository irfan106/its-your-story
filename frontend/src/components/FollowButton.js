import React, { useEffect, useState } from "react";
import { toggleFollow, isFollowing } from "../services/followService";
import { useAppContext } from "../context/AppContext";
import GlassButton from "./GlassButton/GlassButton";

const FollowButton = ({ targetUserId }) => {
  const { user } = useAppContext();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (user?.uid && targetUserId) {
      isFollowing(user.uid, targetUserId).then(setFollowing);
    }
  }, [user?.uid, targetUserId]);

  const handleFollow = async () => {
    const result = await toggleFollow(user.uid, targetUserId);
    setFollowing(result);
  };

  if (!user || user.uid === targetUserId) return null; // Hide for own profile

  return (
    <GlassButton
      onClick={handleFollow}
      variant={following ? "outlined" : "contained"}
      size="small"
    >
      {following ? "Unfollow" : "Follow"}
    </GlassButton>
  );
};

export default FollowButton;
