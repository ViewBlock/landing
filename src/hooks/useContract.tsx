import Arweave from "arweave";
import { useState, useEffect } from "react";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const useContract = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(null);
  const [height, setHeight] = useState(null);

  const fetchData = async () => {
    const res = await fetch("https://cache.kyve.network");
    const state = await res.json();

    setState(state);
    setHeight((await client.network.getInfo()).height);
  };

  useEffect(() => {
    (async () => {
      await fetchData();
      setLoading(false);

      setInterval(async () => {
        await fetchData();
      }, 60000);
    })();
  }, []);

  return { loading, state, height };
};

export default useContract;
