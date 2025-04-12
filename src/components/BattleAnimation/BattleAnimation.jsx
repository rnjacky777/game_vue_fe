import { useEffect, useState } from "react";
import BattleRound from "../BattleRound/BattleRound";
import BattleResultCard from "../BattleResultCard/BattleResultCard";

export default function BattleAnimation({ data, onFinish }) {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentActions, setCurrentActions] = useState([]);

  useEffect(() => {
    if (!data || isFinished) return;

    const currentRound = data.rounds[currentRoundIndex];
    const actions = currentRound.actions;

    if (currentActionIndex < actions.length) {
      const timeout = setTimeout(() => {
        setCurrentActions((prev) => [...prev, actions[currentActionIndex]]);
        setCurrentActionIndex((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(timeout);
    } else if (currentRoundIndex < data.rounds.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentRoundIndex((prev) => prev + 1);
        setCurrentActionIndex(0);
        setCurrentActions([]);
      }, 1500);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsFinished(true);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [currentActionIndex, currentRoundIndex, data, isFinished]);

  const handleEnd = () => {
    setIsFinished(false);
    setCurrentRoundIndex(0);
    setCurrentActionIndex(0);
    setCurrentActions([]);
    onFinish();
  };

  return (
    <div style={{ cursor: isFinished ? "pointer" : "default" }}>
      {!isFinished ? (
        <BattleRound
          round={currentRoundIndex + 1}
          actions={currentActions}
        />
      ) : (
        <BattleResultCard
          result={data.result}
          rewards={data.rewards}
          onClose={handleEnd}
        />
      )}
    </div>
  );
}
