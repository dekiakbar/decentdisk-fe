import { Account } from "next-auth/core/types";
import fetchAPI from "./adapter";
export async function validateToken(
  accessToken: Account["access_token"]
): Promise<boolean> {
  if (!accessToken) {
    return false;
  }

  const response = await fetchAPI("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.status === 200;
}
