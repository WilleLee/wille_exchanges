export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T | undefined> {
  console.log(input);
  console.log(init);
  try {
    const response = await fetch(input, init);
    const data = (await response.json()) as T;
    console.log("response", response);
    console.log("data", data);
    if (response.ok) {
      return data;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
