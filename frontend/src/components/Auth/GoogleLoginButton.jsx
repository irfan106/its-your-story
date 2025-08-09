import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlassButton from "../GlassButton/GlassButton";

const GoogleLoginButton = () => {
  const { setUser, setActive } = useAppContext();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      try {
        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            firstName: user.displayName?.split(" ")[0] || "",
            lastName: user.displayName?.split(" ")[1] || "",
            avatar: user.photoURL || "",
            bio: "",
            followers: 0,
            following: 0,
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (firestoreError) {
        console.error("Firestore error:", firestoreError);
        toast.error("Failed to save user to Firestore");
      }

      setUser(user);
      setActive("home");
      toast.success("Google login successful!");
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed");
    }
  };

  return (
    <GlassButton
      fullWidth
      startIcon={<FcGoogle size={20} />}
      variant="contained"
      onClick={handleGoogleLogin}
      sx={{
        mt: 2,
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        backgroundColor: "background.paper",
        ":hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      Continue with Google
    </GlassButton>
  );
};

export default GoogleLoginButton;
