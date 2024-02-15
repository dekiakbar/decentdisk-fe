import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import fetchAPI from "@/utils/adapter";
import { buildSearchParams } from "@/utils/builder";
import {
  MethodNotAllowedException,
  unAuthorizedException,
} from "@/utils/http-api-exception";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default async function getGateway(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const requestMethod = req.method;

  if (!session?.access_token) {
    unAuthorizedException(res);
  }

  switch (requestMethod) {
    case "GET":
      const query = "/admin/gateway-checker" + buildSearchParams(req);
      const response = await fetchAPI(query, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session?.access_token,
        },
      });

      res.status(response.status).json(response);
    case "POST":
      req.headers.authorization = "Bearer " + session?.access_token;
      return httpProxyMiddleware(req, res, {
        target: process.env.NEXT_PUBLIC_API_URL,
        pathRewrite: [
          {
            patternStr: "api/admin/gateway/list",
            replaceStr: "admin/gateway-checker",
          },
        ],
      });
    default:
      MethodNotAllowedException(res);
  }
}
