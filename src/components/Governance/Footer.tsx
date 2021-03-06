import { Row, Link, Text, Spacer, Spinner } from "@geist-ui/react";

const Footer = (props: { height: number }) => {
  return (
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
          href={`https://viewblock.io/arweave/block/${props.height}`}
        >
          <Text b>{props.height}</Text>
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
  );
};

export default Footer;
