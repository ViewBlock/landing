import { useState, useEffect } from "react";

const useConnected = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    addEventListener("arweaveWalletLoaded", async () => {
      const permissions = await window.arweaveWallet.getPermissions();
      if (
        permissions.indexOf("ACCESS_ADDRESS") > -1 &&
        permissions.indexOf("SIGN_TRANSACTION") > -1
      ) {
        setConnected(true);
      }
    });

    addEventListener("message", (event) => {
      if (event.data) {
        if (
          event.data.ext === "arconnect" &&
          event.data.res &&
          event.data.message === "Success"
        ) {
          setConnected(true);
        }
      }
    });
  }, []);

  return connected;
};

export default useConnected;
