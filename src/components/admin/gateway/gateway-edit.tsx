import { Button, Label, Modal, TextInput, ToggleSwitch } from "flowbite-react";
import { FC, useContext, useEffect, useState } from "react";
import Notification from "../../main/notification";
import { mutate } from "swr";
import { Gateway } from "@/interfaces/gateway";
import { GatewayEditContext } from "./gateway-edit-provider";

export interface GatewayEditModalProps {
  gatewayData: Gateway | null;
}

const GatewayEditModal: FC = function () {
  const { isModalOpen, setIsModalOpen, gatewayEdit } =
    useContext(GatewayEditContext);

  const [isRequesting, setIsRequesting] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // const [openModal, setOpenModal] = useState(false);

  const [gateway, setGateway] = useState(gatewayEdit?.gateway || "");
  const [enable, setEnable] = useState(gatewayEdit?.isEnabled || false);

  function onCloseModal() {
    setIsModalOpen(false);
    setGateway("");
  }

  useEffect(() => {
    if (gatewayEdit) {
      setGateway(gatewayEdit?.gateway);
      setEnable(gatewayEdit?.isEnabled);
    }
  }, [gatewayEdit]);

  {
    /** State for update input file upload, so when upload complete field will refreshed. */
  }
  const [inputKey, setInputKey] = useState<number | null>(null);

  async function handleRequest() {
    if (gateway) {
      setIsRequesting(true);

      try {
        const result = await fetch(`/api/admin/gateway/${gatewayEdit.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gateway: gateway,
            isEnabled: enable,
          }),
        });

        if (result.ok) {
          setIsRequesting(false);
          setGateway("");
          {
            /** trigger update Gateway list */
          }
          mutate(
            (key) =>
              typeof key === "string" &&
              key.startsWith("/api/admin/gateway/list"),
            undefined,
            { revalidate: true }
          );

          setToastMessage("Gateway added successfully.");
          setOpenToast(true);
          setInputKey(Date.now());
          setIsModalOpen(false);
        } else {
          // TODO: Handle Error
          setIsRequesting(false);
        }
        setIsRequesting(false);
      } catch (error) {
        setIsRequesting(false);
      }
    }
  }

  return (
    <>
      <Modal
        show={isModalOpen}
        size="md"
        onClose={onCloseModal}
        popup
        theme={{
          content: {
            inner:
              "relative rounded-lg bg-white shadow dark:bg-dark-content flex flex-col max-h-[90vh]",
          },
        }}
      >
        <Modal.Header className="font-medium text-gray-900 dark:text-white m-2">
          Edit 3rd party gateway
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="gatewayInput" value="Gateway Url" />
              </div>
              <TextInput
                id="gatewayInput"
                placeholder="https://example.com/ipfs"
                value={gateway}
                // defaultValue={gatewayEdit?.gateway}
                onChange={(event) => setGateway(event.target.value)}
                required
                disabled={isRequesting == true}
                key={`${inputKey}-TextInput-edit` || ""}
              />
            </div>
            <div>
              <ToggleSwitch
                color="purple"
                checked={enable}
                label="Enable Gateway"
                onChange={setEnable}
                disabled={isRequesting == true}
                key={`${inputKey}-ToggleSwitch-edit` || ""}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleRequest}
            className="text-white rounded-lg bg-purple-800 hover:bg-purple-900 sm:w-auto dark:bg-purple-700 dark:hover:bg-purple-800"
          >
            Save
          </Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Notification */}
      {openToast && (
        <Notification
          toastMessage={toastMessage}
          onDismiss={() => setOpenToast(false)}
        />
      )}
    </>
  );
};

export default GatewayEditModal;
