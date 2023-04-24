import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    roles?: RoleEnum[];
    access_token?: string | null;
  }
}

declare module "next-auth" {
  export interface HeaderProps {
    session: Session | null;
  }

  interface Session {
    roles?: RoleEnum[];
  }

  interface Account {
    roles?: RoleEnum[];
    access_token?: string | null;
  }

  interface Session {
    roles?: RoleEnum[];
    access_token?: string | null;
  }
}
