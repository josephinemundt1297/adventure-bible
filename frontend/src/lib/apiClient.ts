const DEFAULT_API_BASE_URL = "http://localhost:3000";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

interface ApiRequestOptions {
  authUserId: string;
  body?: unknown;
  method?: "GET" | "POST" | "PUT";
}

export async function apiRequest<TResponse>(
  path: string,
  { authUserId, body, method = "GET" }: ApiRequestOptions,
): Promise<TResponse> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-test-auth-user-id": authUserId,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}
