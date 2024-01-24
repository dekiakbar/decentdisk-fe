import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import {
  MethodNotAllowedException,
  unAuthorizedException,
} from "@/utils/http-api-exception";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const requestMethod = req.method;
  if (!session?.access_token || !session.access_token) {
    unAuthorizedException(res);
  }

  switch (requestMethod) {
    case "POST":
      req.headers.authorization = "Bearer " + session?.access_token;
      return httpProxyMiddleware(req, res, {
        target: process.env.API_URL,
        pathRewrite: [
          {
            patternStr: "api/admin/file/upload",
            replaceStr: "admin/file",
          },
        ],
      });
    default:
      MethodNotAllowedException(res);
  }
}
/**
 * Increase bodySize for file upload
 */
export const config = {
  api: {
    bodyParser: false,
  },
};
