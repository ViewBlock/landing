import useConnected from "../../../hooks/useConnected";
import useContract from "../../../hooks/useContract";
import { Page, Grid, Card, Text } from "@geist-ui/react";
import Nav from "../../../components/Governance/Nav";
import { DatabaseIcon } from "@primer/octicons-react";
import Footer from "../../../components/Governance/Footer";
import CreatePoolModal from "../../../components/Governance/pools/CreatePoolModal";
import { useRef } from "react";
import { useRouter } from "next/router";

const Pools = () => {
  const router = useRouter();
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
            {state.pools.map((pool, id) => (
              <Grid>
                <Card
                  style={{ border: "1px dashed #333", cursor: "pointery" }}
                  onClick={() => {
                    router.push(`/gov/pools/${id}`);
                  }}
                >
                  <Text h3>{pool.name}</Text>
                  <Text h5 type="secondary">
                    {pool.architecture}
                  </Text>
                  <Text h5 type="secondary">
                    {pool.balance} $KYVE
                  </Text>
                  <Text h5 type="secondary">
                    {pool.registered.length} Validators online
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
