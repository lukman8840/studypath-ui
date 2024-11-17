const isDevelopment = import.meta.env.MODE === "development";

export const BASE_URL = isDevelopment ? "http://localhost:3000" : import.meta.env.VITE_BASEURL;

// If VITE_BASEURL is not set in production, throw an error
if (!isDevelopment && !import.meta.env.VITE_BASEURL) {
  throw new Error("VITE_BASEURL environment variable is required in production");
}
