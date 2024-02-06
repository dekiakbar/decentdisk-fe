import { Toast } from "flowbite-react";
import { FC, useState } from "react";
import { HiCheck } from "react-icons/hi";

export interface NotificationProps {
  toastMessage: string | null;
  onDismiss?: () => void;
}

const Notification: FC<NotificationProps> = function ({
  toastMessage,
  onDismiss,
}) {
  return (
    <>
      <div className="absolute right-5 top-5">
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{toastMessage}</div>
          <Toast.Toggle onDismiss={onDismiss} />
        </Toast>
      </div>
    </>
  );
};

export default Notification;
