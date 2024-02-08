import { File } from "./file";
import { User } from "./user";

export type DashboardInterface = {
  totalUser: number;
  totalFile: number;
  totalStorage: number;
  latestUsers: User[];
  latestFiles: File[];
};
