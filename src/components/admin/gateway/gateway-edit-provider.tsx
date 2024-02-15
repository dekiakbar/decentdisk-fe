import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Gateway } from "@/interfaces/gateway";

export interface GatewayEditContextInterface {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  gatewayEdit: Gateway;
  setGatewayEdit: Dispatch<SetStateAction<Gateway>>;
}

/**
 * TODO: Warning: Forbidden non-null assertion.
 */
export const GatewayEditContext = createContext<GatewayEditContextInterface>(
  null!
);

export interface GatewayEditProviderProps {
  children: ReactNode;
}

const GatewayEditProvider: FC<GatewayEditProviderProps> = function ({
  children,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gatewayEdit, setGatewayEdit] = useState<Gateway>(null!); //TODO: Warning: Forbidden non-null assertion.

  return (
    <GatewayEditContext.Provider
      value={{ isModalOpen, setIsModalOpen, gatewayEdit, setGatewayEdit }}
    >
      {children}
    </GatewayEditContext.Provider>
  );
};

export default GatewayEditProvider;
