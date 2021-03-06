import Arweave from "arweave";
import { useState, useEffect } from "react";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const useContract = (initial: { state: any; height: number }) => {
  const [state, setState] = useState(initial.state);
  const [height, setHeight] = useState(initial.height);

  useEffect(() => {
    setInterval(async () => {
      const res = await fetch("https://cache.kyve.network");
      const state = await res.json();

      setState(state);
      setHeight((await client.network.getInfo()).height);
    }, 60000);
  }, []);

  return { state, height };
};

export default useContract;
