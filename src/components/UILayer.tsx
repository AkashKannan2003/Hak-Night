import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import { AccountContext,stateContext } from "@/lib/appwriteContext";
export default function UILayer() {
  const account = useContext(AccountContext);
  const {
    colorState: [colorState, setColorState],
  } = useContext(stateContext);

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    account
      .get()
      .then((res:any) => {
        setLoggedIn(true);
      })
      .catch((err:any) => {
        setLoggedIn(false);
      });
  }, []);

  return (
    <div className="">
      {loggedIn ? (
        <Button
          className="absolute bottom-10 right-1/2"
          onClick={() => {
            account.deleteSession("current");
            setLoggedIn(false);
          }}
        >
          Logout
        </Button>
      ) : (
        <>
        <Button
          className="absolute bottom-10 right-1/2"
          onClick={() => {
            account.createOAuth2Session(
                "github",
                window.location.origin + "/",
                window.location.origin + "/",
            )
          }}
        >
          Login
        </Button>
        <div>You Need to Log In to Change Colors!</div>
        </>
      )}
    </div>
  );
}
