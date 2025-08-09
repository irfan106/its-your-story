import React, { useEffect, useState } from "react";
import { toggleFollow, isFollowing } from "../services/followService";
import { useAppContext } from "../context/AppContext";
import GlassButton from "./GlassButton/GlassButton";

const FollowButton = ({ targetUserId }) => {
  const { user } = useAppContext();
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (user?.uid && targetUserId) {
      isFollowing(user.uid, targetUserId).then(setFollowing);
    }
  }, [user?.uid, targetUserId]);

  // Animate dots for "Please wait"
  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  const handleFollow = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await toggleFollow(user.uid, targetUserId);
      setFollowing(result);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
    setLoading(false);
  };

  if (!user || user.uid === targetUserId) return null; // Hide for own profile

  return (
    <GlassButton
      onClick={handleFollow}
      variant={following ? "outlined" : "contained"}
      size="small"
      disabled={loading}
      sx={{ minWidth: 90, cursor: loading ? "default" : "pointer" }}
    >
      {loading ? `Please wait${dots}` : following ? "Unfollow" : "Follow"}
    </GlassButton>
  );
};

export default FollowButton;
