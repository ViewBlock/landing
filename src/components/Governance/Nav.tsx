import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Row, Link, Button, Spacer } from "@geist-ui/react";

const Nav = ({ children }) => {
  const router = useRouter();
  const [hasWallet, setHasWallet] = useState(false);
  const [connected, setConnected] = useState(false);

  const base = router.asPath.split(router.pathname)[0];
  console.log(router, base);

  useEffect(() => {
    if (window.arweaveWallet) {
      tryToConnect();
    } else {
      addEventListener("arweaveWalletLoaded", tryToConnect);
    }
  }, []);

  async function tryToConnect() {
    setHasWallet(true);
    const permissions = await window.arweaveWallet.getPermissions();
    if (
      permissions.indexOf("ACCESS_ADDRESS") > -1 &&
      permissions.indexOf("SIGN_TRANSACTION") > -1
    ) {
      setConnected(true);
    }
  }

  return (
    <>
      <Row align="middle" justify="space-between">
        <Link href={`${base}/gov`}>
          <svg
            height="20"
            viewBox="0 0 1510 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M66 350H-9.49949e-08L74.5 -2.38419e-05H140.5L110 143.5H122L235 -2.38419e-05H312V5.99999L179 172V181L263 347V350H190L117 206.5H96L66 350ZM740.152 5.99999L595.152 227H580.152L554.152 350H488.152L514.152 227H499.152L444.152 -2.38419e-05H514.152L552.152 167H561.152L668.152 -2.38419e-05H740.152V5.99999ZM844.305 -2.38419e-05H911.305L922.805 317H931.805L1066.3 -2.38419e-05H1135.3V5.99999L984.305 350H861.305L844.305 -2.38419e-05ZM1229.46 344L1302.46 -2.38419e-05H1509.96V63H1354.96L1337.96 143H1473.46V206H1324.46L1307.46 287H1454.96V350H1229.46V344Z"
              fill="#F5F5F5"
            />
          </svg>
        </Link>
        <Row align="middle">
          {children}
          <Spacer x={1} />
          <Button
            type="secondary"
            ghost
            onClick={async () => {
              if (!hasWallet)
                return window.open(
                  "https://chrome.google.com/webstore/detail/arconnect/einnioafmpimabjcddiinlhmijaionap"
                );
              if (connected) {
                // @ts-ignore
                await window.arweaveWallet.disconnect();
                setConnected(false);
              } else {
                await window.arweaveWallet.connect([
                  "ACCESS_ADDRESS",
                  "SIGN_TRANSACTION",
                ]);
                setConnected(true);
              }
            }}
            style={{ borderRadius: 0 }}
          >
            {hasWallet
              ? connected
                ? "Disconnect"
                : "Connect"
              : "Install ArConnect"}
          </Button>
        </Row>
      </Row>
      <Spacer y={1} />
    </>
  );
};

export default Nav;
