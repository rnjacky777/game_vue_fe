import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://127.0.0.1:8000/api/auth/login", async ({ request }) => {
    const { username, password } = await request.json();
    if (username === "testuser" && password === "testpass") {
      return HttpResponse.json({access_token: "fake-jwt-token" },{ status: 200 });
    }
    return new HttpResponse("Invalid credentials", { status: 401 });
  }),
];
