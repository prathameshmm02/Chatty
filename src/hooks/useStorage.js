import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    if (file == null) return;
    // references
    const storageRef = ref(
      getStorage(),
      "media/" + Date.now() + "." + file.name.split(".").pop()
    );

    uploadBytesResumable(storageRef, file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
        console.log(snap)
      },
      (err) => {
        setError(err);
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          setMediaUrl(url);
        })
      }
    );
  }, [file]);

  return { progress, mediaUrl, error };
};

export default useStorage;
