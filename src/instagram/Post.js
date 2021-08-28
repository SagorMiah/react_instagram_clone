import React, { useState, useEffect } from "react";
import "../css/post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import Comment from "../components/Comment";
import PostMore from "../components/PostMore";

const Post = ({ postId, username, caption, imageUrl, user }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubcribe;
    if (postId) {
      unsubcribe = db;
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubcribe();
    };
  }, [postId]);

  return (
    <div className="post">
      <div className="post__header">
        <div>
          <Avatar
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
          />
          <h3>{username}</h3>
        </div>
        <PostMore postId={postId} />
      </div>
      <div className="post__imgsize">
        <img className="post__img" src={imageUrl} alt="" />
      </div>
      <h4 className="post__caption">
        <strong>{username}:</strong> {caption}
      </h4>
      <Comment
        comment={comment}
        comments={comments}
        setComment={setComment}
        user={user}
        postId={postId}
      />
    </div>
  );
};

export default Post;
