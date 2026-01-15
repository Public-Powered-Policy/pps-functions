export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.STATICFORMS_KEY;
  const formData = JSON.parse(event.body);

  const payload = {
    ...formData,
    accessKey: apiKey
  };

  const response = await fetch("https://api.staticforms.xyz/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(result)
  };
}
