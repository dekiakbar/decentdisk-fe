import { User } from "./user";

export type File = {
  id: number;
  userId: number;
  cid: string;
  internalCid: string;
  name: string;
  size: number;
  gateways: string[];
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
};
