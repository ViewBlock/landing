import Arweave from "arweave";
import { useState, useEffect } from "react";
import {
  Page,
  Row,
  Card,
  Text,
  Code,
  Spacer,
  Link,
  Spinner,
} from "@geist-ui/react";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const Gov = (props: { state: any; height: number }) => {
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

  return (
    <Page>
      {/* TODO: Nav */}
      <Row justify="space-around">
        <Card style={{ border: "1px dashed #333" }}>
          <Text h3>Tokens</Text>
          <Text b type="secondary">
            {Object.keys(state.balances)
              .map((addr) => state.balances[addr])
              .reduce((a, b) => a + b, 0)}{" "}
            $KYVE
          </Text>
          <Card.Footer style={{ borderTop: "1px dashed #333" }}>
            <Code style={{ color: "#a76c6e" }}>/tokens</Code>
          </Card.Footer>
        </Card>
        <Spacer x={1} />
        <Card style={{ border: "1px dashed #333" }}>
          <Text h3>Pools</Text>
          <Text b type="secondary">
            {Object.keys(state.pools).length} Pools
          </Text>
          <Card.Footer style={{ borderTop: "1px dashed #333" }}>
            <Code style={{ color: "#a76c6e" }}>/pools</Code>
          </Card.Footer>
        </Card>
        <Spacer x={1} />
        <Card style={{ border: "1px dashed #333" }}>
          <Text h3>Votes</Text>
          <Text b type="secondary">
            WIP
          </Text>
          <Card.Footer style={{ borderTop: "1px dashed #333" }}>
            <Code style={{ color: "#a76c6e" }}>/votes</Code>
          </Card.Footer>
        </Card>
        <Spacer x={1} />
        <Card style={{ border: "1px dashed #333" }}>
          <Text h3>Vault</Text>
          <Text b type="secondary">
            {Object.keys(state.vault)
              .map((addr) =>
                state.vault[addr]
                  .map((element) => element.amount)
                  .reduce((a, b) => a + b, 0)
              )
              .reduce((a, b) => a + b, 0)}{" "}
            $KYVE Locked
          </Text>
          <Card.Footer style={{ borderTop: "1px dashed #333" }}>
            <Code style={{ color: "#a76c6e" }}>/vault</Code>
          </Card.Footer>
        </Card>
        <Spacer x={1} />
      </Row>
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

export default Gov;
