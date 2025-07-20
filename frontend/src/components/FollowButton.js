import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toggleFollow, isFollowing } from "../services/followService";
import { useAppContext } from "../context/AppContext";

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
    <Button
      onClick={handleFollow}
      variant={following ? "outlined" : "contained"}
      color={following ? "secondary" : "primary"}
    >
      {following ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
