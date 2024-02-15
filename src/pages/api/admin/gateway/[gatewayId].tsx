import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import fetchAPI from "@/utils/adapter";
import { isValidNumber } from "@/utils/builder";
import {
  BadRequestException,
  MethodNotAllowedException,
  unAuthorizedException,
} from "@/utils/http-api-exception";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default async function gatewayId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const requestMethod = req.method;
  const { gatewayId } = req.query;
  if (!session?.access_token) {
    unAuthorizedException(res);
  }

  if (!isValidNumber(gatewayId)) {
    BadRequestException(res);
  }

  const url = `/admin/gateway-checker/${gatewayId}`;

  switch (requestMethod) {
    case "PATCH":
      req.headers.authorization = "Bearer " + session?.access_token;
      return httpProxyMiddleware(req, res, {
        target: process.env.NEXT_PUBLIC_API_URL,
        pathRewrite: [
          {
            patternStr: `api/admin/gateway/${gatewayId}`,
            replaceStr: `admin/gateway-checker/${gatewayId}`,
          },
        ],
      });
    case "DELETE":
      const response = await fetchAPI(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + session?.access_token,
        },
      });

      res.status(response.status).json(response);

    default:
      MethodNotAllowedException(res);
  }
}
