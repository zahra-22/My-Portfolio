// 🟢 Backend deployed on Render
export const API_BASE_URL = "https://my-portfolio-9cfi.onrender.com";

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  const options = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (res.status === 401) {
    return { unauthorized: true };
  }

  return res.json();
};
