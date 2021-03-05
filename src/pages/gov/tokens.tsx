import Arweave from "arweave";
import { useState, useEffect } from "react";
import {
  Link,
  Code,
  Text,
  Page,
  Table,
  Row,
  Spacer,
  Spinner,
} from "@geist-ui/react";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const Tokens = (props: { state: any; height: number }) => {
  const [state, setState] = useState(props.state);
  const [height, setHeight] = useState(props.height);

  useEffect(() => {
    setInterval(async () => {
      const res = await fetch("https://cache.kyve.network");
      const state = await res.json();

      setState(state);
      setHeight((await client.network.getInfo()).height);
    }, 60000);
  }, []);

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
      {/* TODO: Nav */}
      <Table data={data}>
        <Table.Column prop="address" label="Address" />
        <Table.Column prop="balance" label="Balance" />
        <Table.Column prop="locked" label="Locked Balance" />
      </Table>
      <div
        style={{
          position: "absolute",
          top: "95%",
          left: "100%",
          transform: "translateX(-100%) translateY(-95%)",
        }}
      >
        <Row align="middle">
          <Link
            underline
            target="_blank"
            href={`https://viewblock.io/arweave/block/${height}`}
          >
            <Text b>{height}</Text>
          </Link>
          <Spacer x={0.5} />
          <Spinner
            style={{
              height: "1em",
              width: "1em",
              margin: "0 .05em 0 .1em",
              verticalAlign: "-0.1em",
            }}
          />
        </Row>
      </div>
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
