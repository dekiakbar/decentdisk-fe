import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import fetchAPI from "@/utils/adapter";
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
      const response = await fetchAPI("/admin/dashboard", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session?.access_token,
        },
      });

      res.status(response.status).json(response);
    default:
      MethodNotAllowedException(res);
  }
}
