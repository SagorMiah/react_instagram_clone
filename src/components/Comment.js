import React from "react";
import SendIcon from "@material-ui/icons/Send";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { db } from "../firebase";

const Comment = ({ comment, setComment, comments, user, postId }) => {
  const sendComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setComment("");
  };
  return (
    <>
      {comments.map((comment, id) => {
        return (
          <p className="post__comment" key={id}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        );
      })}
      {user && (
        <form className="post__commentBox" action="">
          <input
            type="text"
            placeholder="Enter your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="comment__button"
            color="primary"
            variant="outlined"
            disabled={!comment}
            type="submit"
            onClick={sendComment}
          >
            <SendIcon />
          </Button>
        </form>
      )}
    </>
  );
};

export default Comment;
