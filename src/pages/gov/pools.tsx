import useContract from "../../hooks/useContract";
import { Page, Row, Card, Text, Spacer } from "@geist-ui/react";
import Nav from "../../components/Governance/Nav";
import Footer from "../../components/Governance/Footer";

const Pools = () => {
  const { loading, state, height } = useContract();

  return (
    <Page>
      <Nav />
      {!loading && (
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
      )}
      <Footer name="Pools" height={height} />
    </Page>
  );
};

export default Pools;
