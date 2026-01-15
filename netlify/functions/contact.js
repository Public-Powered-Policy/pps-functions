import querystring from "querystring";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Parse form-encoded body
  const data = querystring.parse(event.body);

  const { name, email, message, honeypot } = data;

  // Honeypot check
  if (honeypot) {
    return { statusCode: 200, body: "OK" };
  }

  // Build payload for StaticForms
  const payload = {
    accessKey: process.env.STATICFORMS_KEY,
    name,
    email,
    message
  };

  // Forward to StaticForms
  const response = await fetch("https://api.staticforms.xyz/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  return {
    statusCode: 302,
    headers: {
      Location: "https://public-powered-policy.github.io/public-powered-policy/thank-you/"
    }
  };
}