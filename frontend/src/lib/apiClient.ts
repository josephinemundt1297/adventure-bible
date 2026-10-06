const DEFAULT_API_BASE_URL = "http://localhost:3000";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

interface ApiRequestOptions {
  authUserId?: string;
  body?: unknown;
  getToken?: () => Promise<string | null>;
  method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
}

export async function apiRequest<TResponse>(
  path: string,
  { authUserId, body, getToken, method = "GET" }: ApiRequestOptions,
): Promise<TResponse> {
  const token = getToken ? await getToken() : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (authUserId) {
    headers["x-test-auth-user-id"] = authUserId;
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}
