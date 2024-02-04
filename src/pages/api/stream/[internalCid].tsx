import type { NextApiRequest, NextApiResponse } from "next";
import {
  BadRequestException,
  MethodNotAllowedException,
} from "@/utils/http-api-exception";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default async function stream(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;
  const { internalCid } = req.query;
  if (!internalCid) {
    BadRequestException(res);
  }

  const backendStreamUrl = `view/${internalCid}`;

  switch (requestMethod) {
    case "GET":
      return httpProxyMiddleware(req, res, {
        target: process.env.NEXT_PUBLIC_API_URL,
        pathRewrite: [
          {
            patternStr: `api/stream/${internalCid}`,
            replaceStr: backendStreamUrl,
          },
        ],
      });
    case "HEAD":
      return httpProxyMiddleware(req, res, {
        target: process.env.NEXT_PUBLIC_API_URL,
        pathRewrite: [
          {
            patternStr: `api/stream/${internalCid}`,
            replaceStr: backendStreamUrl,
          },
        ],
        onProxyInit: (httpProxy) => (httpProxy.method = "HEAD"),
      });
    default:
      MethodNotAllowedException(res);
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
