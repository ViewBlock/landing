import useContract from "../../hooks/useContract";
import { Page, Grid, Card, Text } from "@geist-ui/react";
import Nav from "../../components/Governance/Nav";
import Footer from "../../components/Governance/Footer";

const Pools = () => {
  const { loading, state, height } = useContract();

  return (
    <Page>
      <Nav />
      {!loading && (
        <Grid.Container gap={1}>
          {Object.keys(state.pools).map((name) => (
            <Grid xs>
              <Card style={{ border: "1px dashed #333" }}>
                <Text h3>{name}</Text>
                <Text b type="secondary">
                  {state.pools[name].balance} $KYVE
                </Text>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      )}
      <Footer name="Pools" height={height} />
    </Page>
  );
};

export default Pools;
