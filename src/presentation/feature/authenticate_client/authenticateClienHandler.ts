export async function authenticateClientHandler(
  request: any,
  token: any,
  h: any
): Promise<any> {
  // here is where you validate your token
  // comparing with token from your database for example
  const isValid = token === "1234";

  // console.log(token);

  const credentials = { token };
  const artifacts = { test: "info" };

  return { isValid, credentials, artifacts };
}
