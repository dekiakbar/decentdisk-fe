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

export default async function fileId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const requestMethod = req.method;
  const { fileId } = req.query;
  if (!session?.access_token) {
    unAuthorizedException(res);
  }

  if (!isValidNumber(fileId)) {
    BadRequestException(res);
  }

  const url = `/file/${fileId}`;

  switch (requestMethod) {
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
