import { useRouter } from "next/router";
import { useState } from "react";
import { Page, Link, Spacer, Text, Divider, Grid } from "@geist-ui/react";
import Logo from "../components/Logo";

const Partners = [
  { name: "Arweave", link: "https://www.arweave.org" },
  { name: "Polkadot", link: "https://polkadot.network" },
  { name: "TheGraph", link: "https://thegraph.com" },
  { name: "Solana", link: "https://solana.com" },
  { name: "Cosmos", link: "https://cosmos.network" },
  { name: "Avalanche", link: "https://www.avalabs.org" },
  { name: "Skale", link: "https://skale.network" },
];

const Home = () => {
  const router = useRouter();
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <Page>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      >
        <Link
          href={`${router.asPath}about`}
          style={{ margin: 0 }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <svg
            height="45"
            viewBox="0 0 1510 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M66 350H-9.49949e-08L74.5 -2.38419e-05H140.5L110 143.5H122L235 -2.38419e-05H312V5.99999L179 172V181L263 347V350H190L117 206.5H96L66 350ZM740.152 5.99999L595.152 227H580.152L554.152 350H488.152L514.152 227H499.152L444.152 -2.38419e-05H514.152L552.152 167H561.152L668.152 -2.38419e-05H740.152V5.99999ZM844.305 -2.38419e-05H911.305L922.805 317H931.805L1066.3 -2.38419e-05H1135.3V5.99999L984.305 350H861.305L844.305 -2.38419e-05ZM1229.46 344L1302.46 -2.38419e-05H1509.96V63H1354.96L1337.96 143H1473.46V206H1324.46L1307.46 287H1454.96V350H1229.46V344Z"
              fill={logoHovered ? "#a76c6e" : "#F5F5F5"}
            />
          </svg>
        </Link>
        <Spacer y={0.5} />
        <Text h3 type="secondary" style={{ textTransform: "uppercase" }}>
          the unified archive for blockchains.
        </Text>
        <Spacer y={1} />
        <Divider>Partners</Divider>
        <Grid.Container gap={3} justify="center">
          {Partners.map((partner) => (
            <Grid key={partner.name} style={{ paddingBottom: 0 }}>
              <Link target="_blank" href={partner.link}>
                <Logo name={partner.name} />
              </Link>
            </Grid>
          ))}
        </Grid.Container>
      </div>
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
    </Page>
  );
};

export default Home;
