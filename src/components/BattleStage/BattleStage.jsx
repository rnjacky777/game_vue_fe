import { useState, useEffect } from "react";

export default function BattleStage({ data, onFinish }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [actionIndex, setActionIndex] = useState(0);
  const [log, setLog] = useState([]);

  const currentRound = data.rounds[roundIndex];
  const currentAction = currentRound?.actions[actionIndex];

  useEffect(() => {
    if (!currentAction) {
      if (roundIndex + 1 < data.rounds.length) {
        setRoundIndex(roundIndex + 1);
        setActionIndex(0);
      } else {
        // 戰鬥結束
        setTimeout(onFinish, 1000);
      }
    } else {
      const delay = 1000;
      const logMsg = `${currentAction.actor} 使用 ${currentAction.action_type} 對 ${currentAction.target} 造成 ${currentAction.damage || currentAction.value || "效果"}。`;
      setLog((prev) => [...prev, logMsg]);
      const timer = setTimeout(() => {
        setActionIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [roundIndex, actionIndex]);

  return (
    <div style={{ background: "#000", color: "#fff", padding: 16 }}>
      <h3>戰鬥中...</h3>
      {log.map((l, idx) => (
        <div key={idx}>{l}</div>
      ))}
    </div>
  );
}
