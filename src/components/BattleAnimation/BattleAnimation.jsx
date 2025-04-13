import { useEffect, useState } from "react";
import BattleRound from "../BattleRound/BattleRound";
import styles from "./BattleAnimation.module.css";

export default function BattleAnimation({ data, onFinish }) {
  const { battle, teams, result } = data;
  const { rounds, rewards } = battle;
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (currentRoundIndex < rounds.length) {
      const timer = setTimeout(() => {
        setCurrentRoundIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const resultTimer = setTimeout(() => {
        setShowResult(true);
        onFinish?.();
      }, 1000);
      return () => clearTimeout(resultTimer);
    }
  }, [currentRoundIndex, rounds.length, onFinish]);

  const renderTeamColumn = (team, isLeft) => {
    const front = team.filter((u) => u.row === "front");
    const back = team.filter((u) => u.row === "back");
    const maxLen = Math.max(front.length, back.length);

    return Array.from({ length: maxLen }).map((_, i) => (
      <div key={i} className={styles.teamRow}>
        {isLeft && (
          <>
            <div className={styles.character}>{renderCharacter(back[i])}</div>
            <div className={styles.character}>{renderCharacter(front[i])}</div>
          </>
        )}
        {!isLeft && (
          <>
            <div className={styles.character}>{renderCharacter(front[i])}</div>
            <div className={styles.character}>{renderCharacter(back[i])}</div>
          </>
        )}
      </div>
    ));
  };

  const renderCharacter = (unit) => {
    if (!unit) return <div className={styles.empty} />;
    return (
      <div className={styles.characterBox}>
        <img src={unit.avatar} alt={unit.name} />
        <div className={styles.name}>{unit.name}</div>
        <div className={styles.hp}>
          HP: {unit.hp}/{unit.max_hp}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.battleWrapper}>
      <div className={styles.battleField}>
        <div className={styles.teamLeft}>{renderTeamColumn(teams.A, true)}</div>
        <div className={styles.vs}>VS</div>
        <div className={styles.teamRight}>{renderTeamColumn(teams.B, false)}</div>
      </div>

      {currentRoundIndex < rounds.length && (
        <BattleRound actions={rounds[currentRoundIndex].actions} />
      )}

      {showResult && (
        <div className={styles.resultCard}>
          <h3>{result}</h3>
          <p>獲得金幣：{rewards.gold}</p>
          <p>經驗值：{rewards.exp}</p>
          <p>道具：</p>
          <ul>
            {rewards.items.map((item) => (
              <li key={item.item_id}>
                {item.name}（{item.rarity}）
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
