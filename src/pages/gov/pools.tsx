import Arweave from "arweave";
import useContract from "../../hooks/useContract";
import { Page, Row, Card, Text, Spacer } from "@geist-ui/react";
import Nav from "../../components/Governance/Nav";
import Footer from "../../components/Governance/Footer";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const Pools = (props: { state: any; height: number }) => {
  const { state, height } = useContract({
    state: props.state,
    height: props.height,
  });

  return (
    <Page>
      <Nav />
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

export default Pools;
