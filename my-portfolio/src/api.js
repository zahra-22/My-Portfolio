const BASE_URL = process.env.REACT_APP_API || "http://localhost:5000";

export const apiRequest = async (url, method = "GET", body) => {
  const res = await fetch(BASE_URL + url, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include", // needed for cookies
    body: body ? JSON.stringify(body) : undefined,
  });

  return await res.json();
};
