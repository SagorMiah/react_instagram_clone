import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "../firebase";
import firebase from "firebase";
import "../css/upload.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const ImageUpload = ({ userName }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const porgressbar = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(porgressbar);
      },
      (error) => {
        console.log(error.message);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: userName,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <>
      <div className="app__ImageUpload">
        <input
          className="post__caption"
          type="text"
          placeholder="Enter your caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <div className="post__file">
          <input type="file" onChange={handleChange} />
          <progress value={progress} max="100" />
        </div>
        <Button
          className="upload__btn"
          variant="outlined"
          color="primary"
          onClick={handleUpload}
        >
          <CloudUploadIcon />
        </Button>
      </div>
    </>
  );
};

export default ImageUpload;
