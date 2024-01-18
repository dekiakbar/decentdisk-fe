import { RoleEnum } from "@/enum/role-enum";

export type User = {
  id: number;
  name: string;
  email: string;
  picture: string;
  provider: string;
  providerId: string;
  createdAt?: string;
  updatedAt?: string;
  roles: RoleEnum[];
};
