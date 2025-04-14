import { useEffect, useState, useRef } from "react";
import styles from "./BattleRound.module.css";

export default function BattleRound({ actions, updateTeamState, onFinish }) {
  const [currentAction, setCurrentAction] = useState(null);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setCurrentAction(null);
    indexRef.current = 0;

    const showNext = () => {
      const idx = indexRef.current;
      const action = actions[idx];

      if (!action) {
        timeoutRef.current = setTimeout(() => {
          onFinish?.(); // 結束後呼叫 onFinish
        }, 500);
        return;
      }

      setCurrentAction(action);

      const { actor, remaining_hp, remaining_mp, team } = action;
      if (typeof remaining_hp !== "undefined" || typeof remaining_mp !== "undefined") {
        updateTeamState(team, actor, remaining_hp, remaining_mp);
      }

      indexRef.current += 1;
      timeoutRef.current = setTimeout(showNext, 1000); // 顯示每個動作的時間
    };

    showNext();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [actions]);

  return (
    <div className={styles.round}>
      {currentAction && (
        <div className={styles.action}>
          <div className={styles.actor}>{currentAction.actor_name || currentAction.actor}</div>
          <div className={styles.actionType}>{currentAction.action_type}</div>
          <div className={styles.target}>
            → {currentAction.target_name || currentAction.target}
          </div>
          {currentAction.damage != null && (
            <div className={styles.damage}>
              造成 {currentAction.damage} 傷害 {currentAction.crit && "（暴擊！）"}
            </div>
          )}
          {currentAction.buff && (
            <div className={styles.buff}>
              {currentAction.buff.type} +{currentAction.buff.value}
              （持續 {currentAction.buff.duration} 回合）
            </div>
          )}
        </div>
      )}
    </div>
  );
}
