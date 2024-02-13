import { User } from "./user";

export type File = {
  id: number;
  userId: number;
  cid: string;
  internalCid: string;
  name: string;
  size: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
};
