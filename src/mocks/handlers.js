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
  http.post("http://127.0.0.1:8000/api/explore", async ({ request }) => {
    const isBattle = Math.random() < 0.5;
    const { user_id, map_id } = await request.json();
  
    if (isBattle) {
      return new HttpResponse(
        JSON.stringify({
          type: "battle",
          texts: [
            "你走進古老神殿，一股黑氣撲面而來…",
            "一隻魔化戰士出現在你面前，戰鬥開始！"
          ],
          teams: {
            A: [
              {
                id: "hero_1",
                name: "劍士艾倫",
                hp: 500,
                max_hp: 500,
                mp: 100,
                max_mp: 100,
                avatar: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
                row: "front"
              },
              {
                id: "hero_2",
                name: "法師莉娜",
                hp: 400,
                max_hp: 400,
                mp: 120,
                max_mp: 120,
                avatar: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
                row: "back"
              }
            ],
            B: [
              {
                id: "enemy_1",
                name: "魔化戰士",
                hp: 500,
                max_hp: 500,
                mp: 50,
                max_mp: 50,
                avatar: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
                row: "front"
              },
              {
                id: "enemy_2",
                name: "魔化弓手",
                hp: 500,
                max_hp: 500,
                mp: 60,
                max_mp: 60,
                avatar: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
                row: "back"
              }
            ]
          },
          result: "你成功擊敗魔化戰士，獲得了戰利品。",
          battle: {
            result: "win",
            rounds: [
              {
                round: 1,
                actions: [
                  {
                    actor: "hero_1",
                    actor_name: "劍士艾倫",
                    action_type: "attack",
                    target: "enemy_1",
                    target_name: "魔化戰士",
                    damage: 120,
                    crit: false,
                    mp_used: 0,
                    remaining_hp: 380,
                    remaining_mp: 100,
                    team: "A"
                  },
                  {
                    actor: "enemy_1",
                    actor_name: "魔化戰士",
                    action_type: "skill",
                    target: "hero_1",
                    target_name: "劍士艾倫",
                    damage: 150,
                    crit: true,
                    mp_used: 20,
                    remaining_hp: 250,
                    remaining_mp: 30,
                    team: "B"
                  }
                ]
              },
              {
                round: 2,
                actions: [
                  {
                    actor: "hero_2",
                    actor_name: "法師莉娜",
                    action_type: "buff",
                    target: "hero_all",
                    buff: {
                      type: "attack_up",
                      value: 20,
                      duration: 3
                    },
                    mp_used: 30,
                    remaining_hp: 400,
                    remaining_mp: 90,
                    team: "A"
                  },
                  {
                    actor: "enemy_1",
                    actor_name: "魔化戰士",
                    action_type: "attack",
                    target: "hero_1",
                    damage: 100,
                    crit: false,
                    mp_used: 0,
                    remaining_hp: 150,
                    remaining_mp: 30,
                    team: "B"
                  }
                ]
              }
            ],
            rewards: {
              gold: 200,
              exp: 150,
              items: [
                {
                  item_id: 101,
                  name: "神聖之劍",
                  rarity: "epic"
                },
                {
                  item_id: 202,
                  name: "治療藥水",
                  rarity: "common"
                }
              ]
            }
          }
        }),
        { status: 200 }
      );
    }
  
    return new HttpResponse(
      JSON.stringify({
        type: "normal",
        texts: [
          "你在森林中聽到奇怪的聲音...",
          "你靠近後發現是一隻受傷的小狐狸。",
          "牠似乎對你產生了信任。"
        ],
        result: "你獲得了小狐狸的信任！"
      }),
      { status: 200 }
    );
  }),
  http.get("http://127.0.0.1:8000/api/userinfo", async ({ request }) => {
    const user_info = {
      current_map_id: "cave",
      user_id:"12345",
    }
    return HttpResponse.json(user_info, { status: 200 });
  }),
];
