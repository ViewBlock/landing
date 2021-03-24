import {Modal, useModal} from "@geist-ui/react";
import {forwardRef, useImperativeHandle, useState} from "react";

const CreatePoolModal = forwardRef((props, ref) => {
  const { setVisible, bindings } = useModal();

  const [loading, setLoading] = useState(false);

  const createPool = async () => {};

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  return (
    <>
      <Modal {...bindings}>
        <Modal.Title>Create Pool</Modal.Title>
        <Modal.Content>Create a pool here</Modal.Content>
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
