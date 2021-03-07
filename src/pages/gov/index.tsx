import { useRouter } from "next/router";
import useContract from "../../hooks/useContract";
import { Page, Grid, Card, Text, Code } from "@geist-ui/react";
import Nav from "../../components/Governance/Nav";
import Footer from "../../components/Governance/Footer";

const Gov = () => {
  const router = useRouter();
  const { loading, state, height } = useContract();

  return (
    <Page>
      <Nav />
      {!loading && (
        <Grid.Container gap={1}>
          <Grid xs>
            <Card
              style={{ border: "1px dashed #333", cursor: "pointer" }}
              onClick={() => router.push(router.asPath + "/tokens")}
            >
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
          </Grid>
          <Grid xs>
            <Card
              style={{ border: "1px dashed #333", cursor: "pointer" }}
              onClick={() => router.push(router.asPath + "/pools")}
            >
              <Text h3>Pools</Text>
              <Text b type="secondary">
                {Object.keys(state.pools).length} Pools
              </Text>
              <Card.Footer style={{ borderTop: "1px dashed #333" }}>
                <Code style={{ color: "#a76c6e" }}>/pools</Code>
              </Card.Footer>
            </Card>
          </Grid>
          <Grid xs>
            <Card style={{ border: "1px dashed #333" }}>
              <Text h3>Votes</Text>
              <Text b type="secondary">
                WIP
              </Text>
              <Card.Footer style={{ borderTop: "1px dashed #333" }}>
                <Code style={{ color: "#a76c6e" }}>/votes</Code>
              </Card.Footer>
            </Card>
          </Grid>
          <Grid xs>
            <Card
              style={{ border: "1px dashed #333", cursor: "pointer" }}
              onClick={() => router.push(router.asPath + "/vault")}
            >
              <Text h3>Vault</Text>
              <Text b type="secondary">
                {Object.keys(state.vault)
                  .map((addr) =>
                    state.vault[addr]
                      .map((element) => element.amount)
                      .reduce((a, b) => a + b, 0)
                  )
                  .reduce((a, b) => a + b, 0)}{" "}
                $KYVE
              </Text>
              <Card.Footer style={{ borderTop: "1px dashed #333" }}>
                <Code style={{ color: "#a76c6e" }}>/vault</Code>
              </Card.Footer>
            </Card>
          </Grid>
        </Grid.Container>
      )}
      <Footer height={height} />
    </Page>
  );
};

export default Gov;
