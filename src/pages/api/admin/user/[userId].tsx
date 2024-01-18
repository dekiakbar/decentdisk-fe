import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@/interfaces/user";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import fetchAPI from "@/utils/adapter";
import { useSearchParams } from "next/navigation";
import { buildSearchParams, isValidNumber } from "@/utils/builder";
import {
  BadRequestException,
  MethodNotAllowedException,
  unAuthorizedException,
} from "@/utils/http-api-exception";
import { isNumber } from "util";

export default async function userId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const requestMethod = req.method;
  const { userId } = req.query;
  if (!session?.access_token) {
    unAuthorizedException(res);
  }

  if (!isValidNumber(userId)) {
    BadRequestException(res);
  }

  const url = `/admin/user/${userId}`;

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
