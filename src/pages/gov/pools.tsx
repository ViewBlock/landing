import Arweave from "arweave";
import { useState, useEffect } from "react";
import {
  Page,
  Row,
  Card,
  Text,
  Spacer,
  Link,
  Spinner,
} from "@geist-ui/react";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const Pools = (props: { state: any; height: number }) => {
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
        {Object.keys(state.pools).map((name) => (
          <>
            <Card style={{ border: "1px dashed #333" }}>
              <Text h3>{name}</Text>
              <Text b type="secondary">
                {state.pools[name].balance} $KYVE
              </Text>
            </Card>
            <Spacer x={1} />
          </>
        ))}
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

export default Pools;
