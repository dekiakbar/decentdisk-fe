import {
  facebookLink,
  getStreamUrl,
  linkedinLink,
  telegramShare,
  whatsappLink,
} from "@/utils/share-url-builder";
import { Button, Modal, TextInput, Toast } from "flowbite-react";
import Link from "next/link";
import { FC, useState } from "react";
import {
  FaCheck,
  FaClipboard,
  FaExclamationCircle,
  FaFacebookSquare,
  FaLinkedin,
  FaShareAlt,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

export interface SocialMediaShareProps {
  streamPathUrl: string;
}

export interface ShareFileUrlProps {
  gateways: string[];
  streamPathUrl: string;
}

const ShareFile: FC<ShareFileUrlProps> = function ({
  gateways,
  streamPathUrl,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [isCopied, setIsCopied] = useState<number | null>(null);

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleCopyClick = async (url: string, index: number) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      setIsCopied(index);
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.value = url;

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";

      document.body.prepend(textArea);
      textArea.select();

      try {
        /**
         * Deprecated, should be use : await navigator.clipboard.writeText(url);
         * but its only for https can't used in http (unsecure)
         */
        document.execCommand("copy");
        setIsCopied(index);
      } catch (err) {
        console.error("Unable to copy to clipboard", err);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} title="Share" size="xs">
        <FaShareAlt className="h-5 w-5 text-gray-500 dark:text-white" />
      </Button>
      <Modal
        show={openModal}
        size="lg"
        onClose={onCloseModal}
        popup
        theme={{
          content: {
            inner:
              "relative rounded-lg bg-white shadow dark:bg-dark-content flex flex-col max-h-[90vh]",
          },
        }}
      >
        <Modal.Header className="m-4">
          <h2 className="text-2xl">Share The File</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="p-2">
            <Toast
              theme={{
                root: {
                  base: "flex w-full items-center rounded-lg p-4 text-gray-500 shadow bg-gray-100 dark:bg-dark-light dark:text-gray-400 my-2",
                },
              }}
            >
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                <FaExclamationCircle className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                Remember, anyone with the link can access your shared files.
              </div>
            </Toast>
            <div className="my-5">
              <h5 className="font-medium text-gray-900 dark:text-white my-2">
                Share via Social Media:
              </h5>
              <SocialMediaShare streamPathUrl={streamPathUrl} />
            </div>
            <Toast
              theme={{
                root: {
                  base: "flex w-full items-center rounded-lg p-4 text-gray-500 shadow bg-gray-100 dark:bg-dark-light dark:text-gray-400 my-2",
                },
              }}
            >
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                <FaExclamationCircle className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                Click the URL below to copy the link.
              </div>
            </Toast>
            <div className="my-5">
              <h5 className="font-medium text-gray-900 dark:text-white my-2">
                Access via our gateway:
              </h5>
              <TextInput
                rightIcon={isCopied === 9999999 ? FaCheck : FaClipboard}
                onClick={() => {
                  handleCopyClick(getStreamUrl(streamPathUrl), 9999999);
                }}
                readOnly
                value={getStreamUrl(streamPathUrl)}
              />
            </div>
            <div className="my-5">
              <h5 className="font-medium text-gray-900 dark:text-white my-2">
                Access via 3rd party gateway:
              </h5>
              <div className="flex max-w-md flex-col gap-4">
                {gateways?.map((gateway, index) => (
                  <TextInput
                    key={index}
                    rightIcon={isCopied === index ? FaCheck : FaClipboard}
                    onClick={() => {
                      handleCopyClick(gateway, index);
                    }}
                    readOnly
                    value={gateway}
                  />
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const SocialMediaShare: FC<SocialMediaShareProps> = function ({
  streamPathUrl,
}) {
  return (
    <>
      <Link
        href={facebookLink(streamPathUrl)}
        target="_blank"
        title="Preview"
        className="inline-block py-2 px-4 rounded-lg bg-gray-100 dark:bg-dark-light text-gray-500 dark:text-white mr-2 text-sm my-2"
      >
        <FaFacebookSquare className="mr-2 h-5 w-5 inline-block" />
        Facebook
      </Link>
      <Link
        href={linkedinLink(streamPathUrl)}
        target="_blank"
        title="Preview"
        className="inline-block py-2 px-4 rounded-lg bg-gray-100 dark:bg-dark-light text-gray-500 dark:text-white mr-2 text-sm my-2"
      >
        <FaLinkedin className="mr-2 h-5 w-5 inline-block" />
        LinkedIn
      </Link>
      <Link
        href={whatsappLink(streamPathUrl)}
        target="_blank"
        title="Preview"
        className="inline-block py-2 px-4 rounded-lg bg-gray-100 dark:bg-dark-light text-gray-500 dark:text-white mr-2 text-sm my-2"
      >
        <FaWhatsapp className="mr-2 h-5 w-5 inline-block" />
        WhatsApp
      </Link>
      <Link
        href={telegramShare(streamPathUrl)}
        target="_blank"
        title="Preview"
        className="inline-block py-2 px-4 rounded-lg bg-gray-100 dark:bg-dark-light text-gray-500 dark:text-white mr-2 text-sm my-2"
      >
        <FaTelegram className="mr-2 h-5 w-5 inline-block" />
        Telegram
      </Link>
    </>
  );
};
export default ShareFile;
