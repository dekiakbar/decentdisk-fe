import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import fetchAPI from "@/utils/adapter";
import { buildSearchParams } from "@/utils/builder";
import {
  MethodNotAllowedException,
  unAuthorizedException,
} from "@/utils/http-api-exception";

export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const requestMethod = req.method;
  const query = "/admin/user" + buildSearchParams(req);

  if (!session?.access_token) {
    unAuthorizedException(res);
  }

  switch (requestMethod) {
    case "GET":
      const response = await fetchAPI(query, {
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
