import { Button, FileInput, Spinner } from "flowbite-react";
import { FC, useState } from "react";
import Notification from "../notification";
import { mutate } from "swr";
import { NotificationType } from "@/enum/notification";

export interface FileUploadProps {
  apiUrl: string;
  mutateKey: string;
}
const FileUpload: FC<FileUploadProps> = function ({ apiUrl, mutateKey }) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<NotificationType>(
    NotificationType.SUCCESS
  );
  {
    /** State for update input file upload, so when upload complete field will refreshed. */
  }
  const [inputKey, setInputKey] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  async function handleUpload() {
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("files", file);

      try {
        const result = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        if (result.ok) {
          setIsUploading(false);
          setFile(null);
          {
            /** trigger update File list */
          }
          mutate(
            (key) => typeof key === "string" && key.startsWith(mutateKey),
            undefined,
            { revalidate: true }
          );

          setToastMessage("File uploaded successfully.");
          setToastType(NotificationType.SUCCESS);
          setOpenToast(true);
          setInputKey(Date.now());
        }

        const response = await result.json();

        if (result.status == 400) {
          setToastMessage(response.message);
          setToastType(NotificationType.ERROR);
          setOpenToast(true);
          setIsUploading(false);
        }
      } catch (error) {
        setIsUploading(false);
      }
    }
  }

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5 dark:bg-dark-light dark:border-gray-700 mb-2">
        <div className="w-full mb-1">
          <div className="sm:flex">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {isUploading && (
                <Spinner color="purple" aria-label="Uploading File" />
              )}
              <FileInput
                id="files"
                name="files"
                sizing="sm"
                disabled={isUploading == true}
                onChange={handleFileChange}
                key={inputKey || ""}
              />
              {file && (
                <Button
                  className="text-white rounded-lg bg-purple-700 hover:bg-purple-800 sm:w-auto dark:bg-purple-600 dark:hover:bg-purple-700 p-0 z-10"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Notification */}
      {openToast && (
        <Notification
          toastMessage={toastMessage}
          onDismiss={() => setOpenToast(false)}
          type={toastType}
        />
      )}
    </>
  );
};

export default FileUpload;
