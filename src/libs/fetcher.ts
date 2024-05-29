export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T | undefined> {
  try {
    const response = await fetch(input, init);
    const data = (await response.json()) as T;
    if (response.ok) {
      return data;
    } else {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
}
