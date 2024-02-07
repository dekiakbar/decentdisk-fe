import { NextApiRequest } from "next";

type orderType = "ASC" | "DESC";
interface searchParams {
  limit?: number;
  page?: number;
  order?: orderType;
}

export function buildSearchParams(request: NextApiRequest): string {
  const params: searchParams = request.query;

  if (!isValidNumber(params.limit)) {
    params.limit = 10;
  }

  if (!params.page) {
    params.page = 1;
  }

  if (!params.order || !isValidOrder(params.order)) {
    params.order = "DESC";
  }

  return objectToQueryParam(params);
}

function isValidOrder(value: string): value is orderType {
  return value === "ASC" || value === "DESC";
}

export function objectToQueryParam(obj: searchParams): string {
  return `?${Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&")}`;
}

export function isValidNumber(value: any): boolean {
  return !isNaN(Number(value));
}
