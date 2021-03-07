import { useState, useEffect } from "react";

const useConnected = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (window.arweaveWallet) {
      tryToConnect();
    } else {
      addEventListener("arweaveWalletLoaded", tryToConnect);
    }

    addEventListener("message", (event) => {
      if (event.data) {
        if (
          event.data.ext === "arconnect" &&
          event.data.type === "connect_result" &&
          event.data.res &&
          event.data.message === "Success"
        ) {
          setConnected(true);
        }
      }
    });
  }, []);

  async function tryToConnect() {
    const permissions = await window.arweaveWallet.getPermissions();
    if (
      permissions.indexOf("ACCESS_ADDRESS") > -1 &&
      permissions.indexOf("SIGN_TRANSACTION") > -1
    ) {
      setConnected(true);
    }
  }

  return connected;
};

export default useConnected;
