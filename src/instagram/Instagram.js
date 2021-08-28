import React, { useState, useEffect } from "react";
import Post from "./Post";
import { auth, db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import SingUp from "../components/SingUp";
import SignIn from "../components/SignIn";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [signIn, setSignIn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <>
      <div className="app">
        <SingUp
          open={open}
          setOpen={setOpen}
          classes={classes}
          email={email}
          username={username}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setUsername={setUsername}
        />
        <SignIn
          classes={classes}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          signIn={signIn}
          setSignIn={setSignIn}
        />

        <Header user={user} setOpen={setOpen} setSignIn={setSignIn} />

        <div className="app__post">
          <div>
            {posts.map(({ id, post }) => {
              return (
                <Post
                  user={user}
                  postId={id}
                  key={id}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
