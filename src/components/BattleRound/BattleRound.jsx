import { useEffect, useState } from "react";
import styles from "./BattleRound.module.css";

export default function BattleRound({ actions }) {
  const [visibleActions, setVisibleActions] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleActions((prev) => {
        const next = actions[index];
        if (next) return [...prev, next];
        return prev;
      });
      index++;
      if (index >= actions.length) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [actions]);

  return (
    <div className={styles.round}>
      {visibleActions.map((action, i) =>
        action ? (
          <div key={i} className={styles.action}>
            <div className={styles.actor}>{action.actor_name || action.actor}</div>
            <div className={styles.actionType}>{action.action_type}</div>
            <div className={styles.target}>
              → {action.target_name || action.target}
            </div>
            {action.damage != null && (
              <div className={styles.damage}>
                造成 {action.damage} 傷害 {action.crit && "（暴擊！）"}
              </div>
            )}
            {action.buff && (
              <div className={styles.buff}>
                {action.buff.type} +{action.buff.value}（持續 {action.buff.duration} 回合）
              </div>
            )}
          </div>
        ) : null
      )}
    </div>
  );
}
