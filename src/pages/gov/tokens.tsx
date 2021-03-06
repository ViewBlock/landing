import Arweave from "arweave";
import useContract from "../../hooks/useContract";
import { useState, useEffect } from "react";
import { Link, Code, Text, Page, Table } from "@geist-ui/react";
import Nav from "../../components/Governance/Nav";
import Footer from "../../components/Governance/Footer";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const Tokens = (props: { state: any; height: number }) => {
  const { state, height } = useContract({
    state: props.state,
    height: props.height,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const data = [];
    for (const addr of Object.keys(state.balances)) {
      data.push({
        address: (
          <Link
            target="_blank"
            href={`https://viewblock.io/arweave/address/${addr}`}
          >
            <Code style={{ color: "#a76c6e" }}>{addr}</Code>
          </Link>
        ),
        balance: <Text>{state.balances[addr]} $KYVE</Text>,
        locked: (
          <Text>
            {addr in state.vault
              ? state.vault[addr]
                  .map((element) => element.amount)
                  .reduce((a, b) => a + b, 0)
              : 0}{" "}
            $KYVE
          </Text>
        ),
      });
    }
    setData(data);
  }, [state]);

  return (
    <Page>
      <Nav />
      <Table data={data}>
        <Table.Column prop="address" label="Address" />
        <Table.Column prop="balance" label="Balance" />
        <Table.Column prop="locked" label="Locked Balance" />
      </Table>
      <Footer height={height} />
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

export default Tokens;
