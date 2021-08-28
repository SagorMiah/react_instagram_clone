import React from "react";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "../firebase";

const SignIn = ({
  signIn,
  setSignIn,
  password,
  setPassword,
  email,
  setEmail,
  classes,
}) => {
  const signInAccount = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setSignIn(false);
  };
  return (
    <>
      <Modal open={signIn} onClose={() => setSignIn(false)}>
        <div id="modal" className={classes.paper}>
          <center>
            <h2 className="logo">Instagram</h2>
          </center>
          <form className="app__singup">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signInAccount}>
              Sing In
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SignIn;
