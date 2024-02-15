export enum Status {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type Gateway = {
  id: number;
  gateway: string;
  status: Status;
  latency: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};
