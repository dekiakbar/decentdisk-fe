import { Alert } from "flowbite-react";
import { FC } from "react";
import { HiInformationCircle } from "react-icons/hi";

const AlertError: FC = function () {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-semibold">Oops! Something went wrong.</span>
      &nbsp; We&apos;re sorry, but we couldn&apos;t fetch the data at the
      moment. Please try again later. If the problem persists, feel free to
      contact support for assistance.
    </Alert>
  );
};

export default AlertError;
