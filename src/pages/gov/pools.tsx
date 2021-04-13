import useConnected from "../../hooks/useConnected";
import useContract from "../../hooks/useContract";
import { Page, Grid, Card, Text } from "@geist-ui/react";
import Nav from "../../components/Governance/Nav";
import { DatabaseIcon } from "@primer/octicons-react";
import Footer from "../../components/Governance/Footer";
import CreatePoolModal from "../../components/Governance/pools/CreatePoolModal";
import { useRef } from "react";

const Pools = () => {
  const connected = useConnected();
  const { loading, state, height } = useContract();

  const authNodeModal = useRef();

  return (
    <>
      <Page>
        <Nav>
          {connected && (
            <span
              onClick={() => {
                // @ts-ignore
                authNodeModal.current.open();
              }}
              style={{ cursor: "pointer" }}
            >
              <DatabaseIcon />
            </span>
          )}
        </Nav>
        {!loading && (
          <Grid.Container gap={1}>
            {state.pools.map((pool) => (
              <Grid xs>
                <Card style={{ border: "1px dashed #333" }}>
                  <Text h3>{pool.name}</Text>
                  <Text b type="secondary">
                    {pool.balance} $KYVE
                  </Text>
                </Card>
              </Grid>
            ))}
          </Grid.Container>
        )}
        <Footer name="Pools" height={height} />
      </Page>

      <CreatePoolModal ref={authNodeModal} />
    </>
  );
};

export default Pools;
