import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function useFileUpload(initialPreview = "") {
  const [file, setFileState] = useState(null);
  const [preview, setPreview] = useState(initialPreview);
  const [progress, setProgress] = useState(null);
  const [url, setUrl] = useState("");
  const uniqueId = uuidv4();

  // Select a new file
  const setFile = async (newFile) => {
    try {
      if (!newFile) return;

      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(newFile, options);

      setFileState(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));
      setProgress(null);
      setUrl("");
    } catch (err) {
      console.error("Image compression error:", err);
      toast.error("Failed to compress image-testing change");
    }
  };

  const startUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `${uniqueId}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        console.error("Upload error:", error);
        toast.error("Image upload failed");
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadUrl);
        setProgress(null);
        toast.success("Image uploaded successfully");
      }
    );
  };

  return { file, setFile, preview, setPreview, progress, url, startUpload };
}
