import { Button, Label, Modal, TextInput, ToggleSwitch } from "flowbite-react";
import { FC, useState } from "react";
import Notification from "../../main/notification";
import { mutate } from "swr";

const GatewayAdd: FC = function () {
  const [isRequesting, setIsRequesting] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [gateway, setGateway] = useState("");
  const [enable, setEnable] = useState(true);

  function onCloseModal() {
    setOpenModal(false);
    setGateway("");
  }

  {
    /** State for update input file upload, so when upload complete field will refreshed. */
  }
  const [inputKey, setInputKey] = useState<number | null>(null);

  async function handleRequest() {
    if (gateway) {
      setIsRequesting(true);

      try {
        const result = await fetch("/api/admin/gateway/list", {
          method: "POST",
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
          setOpenModal(false);
        } else {
          // TODO: Handle Error
          setIsRequesting(false);
        }
      } catch (error) {
        setIsRequesting(false);
      }
    }
  }

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5 dark:bg-dark-light dark:border-gray-700 mb-2">
        <div className="w-full mb-1">
          <div className="sm:flex">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                onClick={() => setOpenModal(true)}
                className="text-white rounded-lg bg-purple-700 hover:bg-purple-800 sm:w-auto dark:bg-purple-600 dark:hover:bg-purple-700 p-0"
              >
                Add Gateway
              </Button>
              <Modal
                show={openModal}
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
                  Add 3rd party gateway
                </Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="gateway" value="Gateway Url" />
                      </div>
                      <TextInput
                        id="gateway"
                        placeholder="https://example.com/ipfs"
                        value={gateway}
                        onChange={(event) => setGateway(event.target.value)}
                        required
                        disabled={isRequesting == true}
                        key={`${inputKey}-TextInput` || ""}
                      />
                    </div>
                    <div>
                      <ToggleSwitch
                        color="purple"
                        checked={enable}
                        label="Enable Gateway"
                        onChange={setEnable}
                        disabled={isRequesting == true}
                        key={`${inputKey}-ToggleSwitch` || ""}
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
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
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

export default GatewayAdd;
