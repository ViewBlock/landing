import {interactWrite} from "smartweave";
import {arweave} from "./extensions";
import {CONTRACT as CONTRACT_ID} from "@kyve/logic";

/*
export   const createPool = async () => {
  const input = {
    function: "createPool",
    pool: pool,
    architecture: architecture,
    config: JSON.parse(config),
    bundleSize: bundleSize,
    uploader: uploader,
    archiveRate: archiveRate,
    validatorRate: validatorRate,
  };
  console.log(input);
  const state = await interactWrite(arweave, undefined, CONTRACT_ID, input);
  console.log(state);
  setToast({ text: "Pool successfully created", type: "success" });
};*/

export const dispense = async(): Promise<any> => {
  const input = {
    function: "dispense"
  }
  return await interactWrite(arweave, undefined, CONTRACT_ID, input)
}