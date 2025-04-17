// mocks/handlers/authHandlers.js
import { http, HttpResponse } from "msw";

export const mapHandlers = [
    http.get("http://127.0.0.1:8000/api/map", async ({ request }) => {
        const map = [
            { id: "forest", name: "幽靜森林" },
            { id: "cave", name: "黑暗洞窟" },
            { id: "ruins", name: "遺跡古城" },
          ]
        return HttpResponse.json(map, { status: 200 });
    }),

];