// mocks/handlers/authHandlers.js
import { http, HttpResponse } from "msw";

export const authHandlers = [
    http.post("http://127.0.0.1:8000/api/auth/login", async ({ request }) => {
        const { username, password } = await request.json();
        if (username === "testuser" && password === "testpass") {
            return HttpResponse.json({ access_token: "fake-jwt-token" }, { status: 200 });
        }
        return new HttpResponse("Invalid credentials", { status: 401 });
    }),
    http.get("http://127.0.0.1:8000/api/userinfo", async ({ request }) => {
        const user_info = {
            current_map_id: "cave",
            user_id: "12345",
        }
        return HttpResponse.json(user_info, { status: 200 });
    }),

];
