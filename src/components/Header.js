import React, { useState } from "react";
import { auth } from "../firebase";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ImageUpload from "../instagram/ImageUpload";

const Header = ({ user, setOpen, setSignIn }) => {
  const [create, setCreate] = useState(false);
  return (
    <>
      <div className="app__headerMain">
        <div className="app__header">
          <div>
            <h2 className="logo">Instagram</h2>
          </div>

          <div className="app__login">
            <Button
              onClick={() => setCreate(!create)}
              variant="outlined"
              color="primary"
              className="app__create"
            >
              <AddIcon />
            </Button>
            {user ? (
              <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
              <div className="app__singupin">
                <Button onClick={() => setSignIn(true)}>Sing In</Button>
                <Button onClick={() => setOpen(true)}>Sing Up</Button>
              </div>
            )}
          </div>
        </div>
        <div
          id="open__uploads"
          className={create ? "open__upload" : "close__upload"}
        >
          {user?.displayName ? (
            <ImageUpload userName={user.displayName} />
          ) : (
            <h3>Sorry you need to login to upload!</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
