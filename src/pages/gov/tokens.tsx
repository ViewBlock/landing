import {
  useMediaQuery,
  Link,
  Code,
  Text,
  Page,
  Table,
  useToasts,
  Spinner,
  Spacer,
} from "@geist-ui/react";
import useConnected from "../../hooks/useConnected";
import useContract from "../../hooks/useContract";
import { useState, useEffect, useRef } from "react";
import Nav from "../../components/Governance/Nav";
import { ArrowSwitchIcon, PlusIcon } from "@primer/octicons-react";
import Footer from "../../components/Governance/Footer";
import TransferTokenModal from "../../components/Governance/tokens/TransferTokensModal";
import { dispense } from "../../contract";

const Tokens = () => {
  const isMobile = useMediaQuery("mobile");

  const [toasts, setToast] = useToasts();
  const [loading, setLoading] = useState(false);

  const connected = useConnected();
  const { state, height } = useContract();

  const transferTokenModal = useRef();

  const [data, setData] = useState([]);
  useEffect(() => {
    if (state) {
      const data = [];
      for (const addr of Object.keys(state.balances)) {
        const balance = state.balances[addr];
        const locked =
          addr in Object.keys(state.vault || {})
            ? state.vault[addr]
                .map((element) => element.amount)
                .reduce((a, b) => a + b, 0)
            : 0;

        const formatted =
          addr.slice(0, 5) + "..." + addr.slice(addr.length - 5, addr.length);

        data.push({
          address: (
            <Link
              target="_blank"
              href={`https://viewblock.io/arweave/address/${addr}`}
            >
              <Code style={{ color: "#a76c6e" }}>
                {isMobile ? formatted : addr}
              </Code>
            </Link>
          ),
          balance: <Text>{balance} $KYVE</Text>,
          locked: <Text>{locked} $KYVE</Text>,
          total: balance + locked,
        });
      }
      setData(data.sort((a, b) => b.total - a.total));
    }
  }, [state]);

  return (
    <>
      <Page>
        <Nav>
          {connected && (
            <>
              <span
                onClick={async () => {
                  setLoading(true);
                  const id = await dispense();
                  setToast({
                    text: `Successfully dispensed tokens. Please wait for tx: ${id} to mine.`,
                  });
                  setLoading(false);
                }}
                style={{ cursor: "pointer" }}
              >
                {loading ? (
                  <Spinner
                    style={{
                      height: "1em",
                      width: "1em",
                    }}
                  />
                ) : (
                  <PlusIcon />
                )}
              </span>
              <Spacer x={1} />
              <span
                onClick={() => {
                  // @ts-ignore
                  transferTokenModal.current.open();
                }}
                style={{ cursor: "pointer" }}
              >
                <ArrowSwitchIcon />
              </span>
            </>
          )}
        </Nav>
        <Table data={data}>
          <Table.Column prop="address" label="Address" />
          <Table.Column prop="balance" label="Balance" />
          <Table.Column prop="locked" label="Locked Balance" />
        </Table>
        <Footer name="Tokens" height={height} />
      </Page>

      <TransferTokenModal ref={transferTokenModal} />
    </>
  );
};

export default Tokens;
