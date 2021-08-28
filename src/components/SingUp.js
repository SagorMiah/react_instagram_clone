import React from "react";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "../firebase";

const SingUp = ({
  classes,
  email,
  username,
  password,
  open,
  setOpen,
  setEmail,
  setPassword,
  setUsername,
}) => {
  const signUP = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div id="modal" className={classes.paper}>
          <center>
            <h2 className="logo">Instagram</h2>
          </center>
          <form className="app__singup">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <Button type="submit" onClick={signUP}>
              Sing Up
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SingUp;
