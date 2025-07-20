import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import UserProfilePage from "../components/UserProfileCard";

export default function UserProfilePageWrapper() {
  const { userId } = useParams();
  const { user } = useAppContext();

  return <UserProfilePage userId={userId} currentUserId={user?.uid || null} />;
}
