import Arweave from "arweave";
import useConnected from "../../hooks/useConnected";
import useContract from "../../hooks/useContract";
import { useState, useEffect } from "react";
import {
  useModal,
  useInput,
  useToasts,
  Page,
  Spacer,
  Table,
  Text,
  Button,
  Modal,
  Row,
  Input,
} from "@geist-ui/react";
import Nav from "../../components/Governance/Nav";
import Footer from "../../components/Governance/Footer";
import { LockIcon } from "@primer/octicons-react";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const Vault = () => {
  const connected = useConnected();
  const { loading, state, height } = useContract();

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
  const [_, setToast] = useToasts();

  return (
    <Page>
      <Nav>
        {connected && (
          <span
            onClick={() => modal.setVisible(true)}
            style={{ cursor: "pointer" }}
          >
            <LockIcon />
          </span>
        )}
      </Nav>
      {connected && !loading ? (
        <>
          {address in state.vault ? (
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
              <Button onClick={() => modal.setVisible(true)}>
                Lock Tokens
              </Button>
            </div>
          )}
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
      {!loading && (
        <Modal {...modal.bindings}>
          <Modal.Title>Lock Tokens</Modal.Title>
          <Modal.Content>
            <Row justify="center">
              <span>
                <Input
                  {...amount.bindings}
                  type="number"
                  labelRight="$KYVE"
                  min={0}
                  max={address in state.balances ? state.balances[address] : 0}
                  width="100%"
                />
                <Spacer y={1} />
                <Input
                  {...length.bindings}
                  type="number"
                  labelRight="blocks"
                  min={0}
                  width="100%"
                />
              </span>
            </Row>
          </Modal.Content>
          <Modal.Action passive onClick={() => modal.setVisible(false)}>
            Cancel
          </Modal.Action>
          <Modal.Action
            onClick={async () => {
              const tx = await client.createTransaction({
                data: Math.random().toString().slice(-4),
              });

              tx.addTag("App-Name", "SmartWeaveAction");
              tx.addTag("App-Version", "0.3.0");
              tx.addTag(
                "Contract",
                "z7oP5KYMnPnSqWE81hM1BvewB7bJMwiOJtAl3JIl4_w"
              );
              tx.addTag(
                "Input",
                JSON.stringify({
                  function: "lock",
                  qty: amount.state,
                  length: length.state,
                })
              );

              await client.transactions.sign(tx);
              await client.transactions.post(tx);

              setToast({ text: `Locked. ${tx.id}` });
              modal.setVisible(false);

              amount.reset();
              length.reset();
            }}
          >
            Lock
          </Modal.Action>
        </Modal>
      )}
      <Footer name="Vault" height={height} />
    </Page>
  );
};

export default Vault;
