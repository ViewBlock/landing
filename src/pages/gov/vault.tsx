import Arweave from "arweave";
import useConnected from "../../hooks/useConnected";
import useContract from "../../hooks/useContract";
import { useState, useEffect } from "react";
import {
  useModal,
  useInput,
  Page,
  Spacer,
  Table,
  Text,
  Button,
  Modal,
} from "@geist-ui/react";
import Nav from "../../components/Governance/Nav";
import Footer from "../../components/Governance/Footer";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const Vault = (props: { state: any; height: number }) => {
  const connected = useConnected();
  const { state, height } = useContract({
    state: props.state,
    height: props.height,
  });

  const [address, setAddress] = useState("");
  useEffect(() => {
    if (connected) {
      // @ts-ignore
      window.arweaveWallet.getActiveAddress().then((address) => {
        setAddress(address);
      });
    }
  }, [connected]);

  const modal = useModal();
  const amount = useInput("0");
  const length = useInput("0");

  return (
    <Page>
      <Nav />
      {connected ? (
        <>
          {address in state.vault ? (
            <>
              <Spacer y={1} />
              <Table
                data={state.vault[address].map((entry) => {
                  return {
                    amount: <Text>{entry.amount} $KYVE</Text>,
                    status:
                      entry.end < height
                        ? "Ended."
                        : `Ends in ${entry.end - height} blocks.`,
                  };
                })}
              >
                <Table.Column prop="amount" label="Amount" />
                <Table.Column prop="status" label="Status" />
              </Table>
            </>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              <Text h3 type="secondary">
                You don't have any tokens locked.
              </Text>
              <Spacer y={1} />
              <Button disabled onClick={() => modal.setVisible(true)}>
                Lock Tokens
              </Button>
            </div>
          )}
          <Footer height={height} />
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <Text h3 type="secondary">
            Please connect your wallet.
          </Text>
        </div>
      )}
      {/* TODO(@johnletey): Modal */}
      <Modal {...modal.bindings}></Modal>
    </Page>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://cache.kyve.network");
  const state = await res.json();

  return {
    props: {
      state,
      height: (await client.network.getInfo()).height,
    },
  };
}

export default Vault;
