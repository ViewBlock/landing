import useContract from "../../hooks/useContract";
import { useState, useEffect } from "react";
import { Link, Code, Text, Page, Table } from "@geist-ui/react";
import Nav from "../../components/Governance/Nav";
import Footer from "../../components/Governance/Footer";

const Tokens = () => {
  const { state, height } = useContract();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (state) {
      const data = [];
      for (const addr of Object.keys(state.balances)) {
        const balance = state.balances[addr];
        const locked =
          addr in state.vault
            ? state.vault[addr]
                .map((element) => element.amount)
                .reduce((a, b) => a + b, 0)
            : 0;

        data.push({
          address: (
            <Link
              target="_blank"
              href={`https://viewblock.io/arweave/address/${addr}`}
            >
              <Code style={{ color: "#a76c6e" }}>{addr}</Code>
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
    <Page>
      <Nav />
      <Table data={data}>
        <Table.Column prop="address" label="Address" />
        <Table.Column prop="balance" label="Balance" />
        <Table.Column prop="locked" label="Locked Balance" />
      </Table>
      <Footer name="Tokens" height={height} />
    </Page>
  );
};

export default Tokens;
