import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@/interfaces/user";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import fetchAPI from "@/utils/adapter";
import { useSearchParams } from "next/navigation";
import { buildSearchParams } from "@/utils/builder";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  MethodNotAllowedException,
  unAuthorizedException,
} from "@/utils/http-api-exception";

export default async function getFiles(
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
      const query = "/admin/file" + buildSearchParams(req);
      const response = await fetchAPI(query, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session?.access_token,
        },
      });

      res.status(response.status).json(response);
    case "POST":
      const uploadUrl = "/admin/file";
      const contentType = req.headers["content-type"]
        ? req.headers["content-type"]
        : "multipart/form-data;";

      const uploadResponse = await fetchAPI(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session?.access_token,
          "Content-Type": contentType,
        },
        body: req.body,
      });

      res.status(uploadResponse.status).json(uploadResponse);
    default:
      MethodNotAllowedException(res);
  }
}
/**
 * Increase bodySize for file upload
 */
export const config = {
  api: {
    // bodyParser: false,
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
