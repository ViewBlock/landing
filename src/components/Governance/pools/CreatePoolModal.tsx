import {
  Input,
  Modal,
  Textarea,
  useInput,
  useModal,
  Text,
  Select,
  useToasts,
} from "@geist-ui/react";
import { forwardRef, useImperativeHandle, useState } from "react";

import { interactWrite } from "smartweave";

import { arweave } from "../../../extensions";
import { CONTRACT as CONTRACT_ID } from "@kyve/logic";

const CreatePoolModal = forwardRef((props, ref) => {
  const { setVisible, bindings } = useModal();

  const [loading, setLoading] = useState(false);

  const [toasts, setToast] = useToasts();

  // declare inputs
  const { state: pool, bindings: bindingsPool } = useInput("");
  // TODO SHOULD BE SELECT
  const { state: architecture, setState: setArchitecture } = useInput(
    "Avalanche"
  );
  const { state: config, bindings: bindingsConfig } = useInput("{}");
  const { state: bundleSize, bindings: bindingsBundleSize } = useInput("20");
  const { state: uploader, bindings: bindingsUploader } = useInput(
    "3dX8Cnz3N64nKt2EKmWpKL1EbErFP3RFjxSDyQHQrkI"
  );
  const { state: archiveRate, bindings: bindingsArchiveRate } = useInput("1");
  const { state: validatorRate, bindings: bindingsValidatorRate } = useInput(
    "1"
  );

  const createPool = async () => {
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
  };

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  return (
    <>
      <Modal {...bindings}>
        <Modal.Title>Create Pool</Modal.Title>
        <Modal.Content>
          <Input {...bindingsPool} width={"100%"}>
            Poolname
          </Input>
          <Text>Architecture</Text>
          <Select
            placeholder="Architecture"
            width={"100%"}
            onChange={(value) => {
              // @ts-ignore
              setArchitecture(value);
            }}
          >
            <Select.Option value="Avalanche">Avalanche</Select.Option>
            <Select.Option value="Cosmos">Cosmos</Select.Option>
            <Select.Option value="Polkadot">Polkadot</Select.Option>
            <Select.Option value="Solana">Solana</Select.Option>
            <Select.Option value="SmartWeave">SmartWeave</Select.Option>
          </Select>
          <Text>Config</Text>
          <Textarea {...bindingsConfig} width={"100%"} />
          <Input {...bindingsBundleSize} width={"100%"}>
            Bundle size
          </Input>
          <Input {...bindingsUploader} width={"100%"} disabled={true}>
            Uploader
          </Input>
          <Input {...bindingsArchiveRate} width={"100%"}>
            Archive rate
          </Input>
          <Input {...bindingsValidatorRate} width={"100%"}>
            Validator rate
          </Input>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          loading={loading}
          onClick={async () => {
            setLoading(true);
            await createPool();
            setLoading(false);
            setVisible(false);
          }}
        >
          Create Pool
        </Modal.Action>
      </Modal>
    </>
  );
});

export default CreatePoolModal;
