import React, { useState, useEffect } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import { db } from "../firebase";

const PostMore = ({ postId }) => {
  const [more, setMore] = useState(false);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const postMore = () => {
    setMore(!more);
  };

  const deletePost = () => {
    db.collection("posts").doc(postId).delete();
  };

  const updateCaption = () => {
    db.collection("posts").doc(postId).set(
      {
        caption: input,
      },
      {
        merge: true,
      }
    );
    setOpen(false);
  };

  const openEditModal = () => {
    setOpen(!open);
    setMore(false);
  };

  useEffect(() => {});
  return (
    <>
      <div>
        <div className={open ? "edit__caption" : "none__edit_caption"}>
          <input
            type="text"
            placeholder="Update your caption..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="outlined" onClick={updateCaption}>
            Update
          </Button>
        </div>
        <Button onClick={postMore} className="post__more">
          <MoreVertIcon />
        </Button>
        <ul className={more ? "post__show" : "post__more__list"}>
          <li onClick={deletePost}>Delete Post</li>
          <li onClick={openEditModal}>Edit</li>
        </ul>
      </div>
    </>
  );
};

export default PostMore;
