import { Response } from "@/utils/adapter";
import { SWRResponse } from "swr";

export interface SwrResponse extends SWRResponse {
  data: Response;
}
