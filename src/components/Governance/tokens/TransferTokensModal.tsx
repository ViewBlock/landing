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

const TransferTokenModal = forwardRef((props, ref) => {
  const { setVisible, bindings } = useModal();

  const [loading, setLoading] = useState(false);

  const [toasts, setToast] = useToasts();

  // declare inputs
  const { state: target, bindings: bindingsTarget } = useInput("");
  const { state: quantity, bindings: bindingsQuantity } = useInput("");

  const contractId = "v2p-0OhAxDCCMLjQ8e_6_YhT3Tfw2uUAbIQ3PXRtjr4";

  const transfer = async () => {
    const input = {
      function: "transfer",
      target: target,
      qty: parseInt(quantity),
    };
    console.log(input);
    const state = await interactWrite(arweave, undefined, contractId, input);
    console.log(state);
    setToast({ text: "Successfully transferred", type: "success" });
  };

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  return (
    <>
      <Modal {...bindings}>
        <Modal.Title>Transfer Tokens</Modal.Title>
        <Modal.Content>
          <Input {...bindingsTarget} width={"100%"}>
            Target
          </Input>
          <Input {...bindingsQuantity} width={"100%"}>
            Quantity
          </Input>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          loading={loading}
          onClick={async () => {
            setLoading(true);
            await transfer();
            setLoading(false);
            setVisible(false);
          }}
        >
          Transfer
        </Modal.Action>
      </Modal>
    </>
  );
});

export default TransferTokenModal;
