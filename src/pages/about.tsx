import { useRouter } from "next/router";
import { useMediaQuery, Page, Row, Link, Spacer, Text } from "@geist-ui/react";
import { Twitter } from "react-feather";

const About = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("mobile");

  return (
    <Page size="small">
      <Row align="middle" justify="space-between">
        <Link href={`${router.asPath.split(router.pathname)[0]}/`}>
          <svg
            height="20"
            viewBox="0 0 1510 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M66 350H-9.49949e-08L74.5 -2.38419e-05H140.5L110 143.5H122L235 -2.38419e-05H312V5.99999L179 172V181L263 347V350H190L117 206.5H96L66 350ZM740.152 5.99999L595.152 227H580.152L554.152 350H488.152L514.152 227H499.152L444.152 -2.38419e-05H514.152L552.152 167H561.152L668.152 -2.38419e-05H740.152V5.99999ZM844.305 -2.38419e-05H911.305L922.805 317H931.805L1066.3 -2.38419e-05H1135.3V5.99999L984.305 350H861.305L844.305 -2.38419e-05ZM1229.46 344L1302.46 -2.38419e-05H1509.96V63H1354.96L1337.96 143H1473.46V206H1324.46L1307.46 287H1454.96V350H1229.46V344Z"
              fill="#F5F5F5"
            />
          </svg>
        </Link>
        <Link target="_blank" href="https://twitter.com/KYVENetwork">
          <Twitter color="#8f9ba8" />
        </Link>
      </Row>
      <Spacer y={2} />
      <div
        style={{
          textAlign: isMobile ? "left" : "justify",
        }}
      >
        <Text h4>
          KYVE is an initiative to store any data stream, with built-in
          validation. By leveraging the{" "}
          <Link target="_blank" href="https://www.arweave.org" underline color>
            Arweave
          </Link>{" "}
          blockchain, we can permanently and immutably store this data.
        </Text>
        <Text h4>
          The network is powered by decentralised archivers and validators.
          These nodes reside in pools, each pool focusing on archiving a
          specific data stream. Pools are funded by <i>$KYVE</i> tokens, and
          anyone can fund these storage initiatives by depositing tokens.
        </Text>
        <Text h4>
          A designated archiver is appointed by a DAO (Decentralized Autonomous
          Organisation) for each pool. Nodes are incentivised by a unique
          staking system, which involves them locking their <i>$KYVE</i> tokens
          while being active in the pool.
        </Text>
        <Text h4>
          Validators will "get together" and vote on whether the designated
          archiver is properly doing it's job. If the validators come to a
          consensus that the archiver is no longer acting honestly or reliably,
          a new archiver will be decided upon in the DAO. Validators can
          seemlessly transition into an archiver if need be.
        </Text>
      </div>
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: "95%",
            left: "50%",
            transform: "translateX(-50%) translateY(-95%)",
          }}
        >
          <Link target="_blank" href="mailto:team@kyve.network" underline>
            <Text type="secondary">team@kyve.network</Text>
          </Link>
        </div>
      )}
    </Page>
  );
};

export default About;
