type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: Record<string, any>;
}

interface Response {
  status: number;
  statusText: string;
  response?: object | null;
}

async function fetchAPI<T>(
  path: string,
  options: FetchOptions
): Promise<Response> {
  const { method, headers, body } = options;

  const url = process.env.API_URL + path;
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  });

  // if (!response.ok) {
  //   const error = await response.json();
  //   throw new Error(error.message);
  // }

  // when delete user, http code == 200 but body return null
  if (method == "DELETE" && response.ok) {
    const data: Response = {
      status: response.status,
      statusText: response.statusText,
      response: null,
    };

    return data;
  }

  const responseBody = await response.json();
  const data: Response = {
    status: response.status,
    statusText: response.statusText,
    response: responseBody,
  };

  return data;
}

export default fetchAPI;
