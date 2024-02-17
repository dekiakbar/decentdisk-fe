import { NotificationType } from "@/enum/notification";
import { Toast } from "flowbite-react";
import { FC } from "react";
import { HiCheck, HiX } from "react-icons/hi";

export interface NotificationProps {
  toastMessage: string | null;
  onDismiss?: () => void;
  type: NotificationType;
}

const Notification: FC<NotificationProps> = function ({
  toastMessage,
  onDismiss,
  type,
}) {
  let icon = <></>;
  if (type == NotificationType.SUCCESS) {
    icon = (
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <HiCheck className="h-5 w-5" />
      </div>
    );
  }

  if (type == NotificationType.ERROR) {
    icon = (
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <HiX className="h-5 w-5" />
      </div>
    );
  }

  return (
    <>
      <div className="absolute right-5 top-5 z-20">
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            {icon}
          </div>
          <div className="ml-3 text-sm font-normal">{toastMessage}</div>
          <Toast.Toggle onDismiss={onDismiss} />
        </Toast>
      </div>
    </>
  );
};

export default Notification;
