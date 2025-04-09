import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://127.0.0.1:8000/api/auth/login", async ({ request }) => {
    const { username, password } = await request.json();
    if (username === "testuser" && password === "testpass") {
      return HttpResponse.json({ access_token: "fake-jwt-token" }, { status: 200 });
    }
    return new HttpResponse("Invalid credentials", { status: 401 });
  }),
  http.get("http://127.0.0.1:8000/api/character/list", async ({ request }) => {
    const characterData = [
      { id: "char_001", name: "Warrior", level: 10, class: "Fighter" },
      { id: "char_002", name: "Mage", level: 8, class: "Wizard" },
      { id: "char_003", name: "Archer", level: 12, class: "Ranger" },
      { id: "char_004", name: "Warrior", level: 10, class: "Fighter" },
      { id: "char_005", name: "Mage", level: 8, class: "Wizard" },
      { id: "char_006", name: "Archer", level: 12, class: "Ranger" },
      { id: "char_007", name: "Warrior", level: 10, class: "Fighter" },
      { id: "char_008", name: "Mage", level: 8, class: "Wizard" },
      { id: "char_009", name: "Archer", level: 12, class: "Ranger" },
      { id: "char_010", name: "Warrior", level: 10, class: "Fighter" },
      { id: "char_011", name: "Mage", level: 8, class: "Wizard" },
      { id: "char_012", name: "Archer", level: 12, class: "Ranger" },
      { id: "char_013", name: "Warrior", level: 10, class: "Fighter" },
      { id: "char_014", name: "Mage", level: 8, class: "Wizard" },
      { id: "char_015", name: "Archer", level: 12, class: "Ranger" },
      { id: "char_016", name: "Warrior", level: 10, class: "Fighter" },
      { id: "char_017", name: "Mage", level: 8, class: "Wizard" },
      { id: "char_018", name: "Archer", level: 12, class: "Ranger" },
      { id: "char_019", name: "Warrior", level: 10, class: "Fighter" },
      { id: "char_020", name: "Mage", level: 8, class: "Wizard" },
      { id: "char_021", name: "Archer", level: 12, class: "Ranger" },
      { id: "char_022", name: "Warrior", level: 10, class: "Fighter" },
      { id: "char_023", name: "Mage", level: 8, class: "Wizard" },
      { id: "char_024", name: "Archer", level: 12, class: "Ranger" }
    ];


    return HttpResponse.json(characterData, { status: 200 });

  }),
];
