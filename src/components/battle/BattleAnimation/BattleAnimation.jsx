import { useEffect, useState } from "react";
import BattleRound from "../BattleRound/BattleRound";
import styles from "./BattleAnimation.module.css";

export default function BattleAnimation({ data, onFinish }) {
    const { battle, teams, result } = data;
    const { rounds, rewards } = battle;

    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [teamA, setTeamA] = useState(teams.A);
    const [teamB, setTeamB] = useState(teams.B);
    const [battleStarted, setBattleStarted] = useState(false);

    const updateTeamState = (teamKey, actorId, remainingHp, remainingMp) => {
        const updateTeam = (team) =>
            team.map((unit) =>
                unit.id === actorId
                    ? {
                        ...unit,
                        hp: typeof remainingHp !== "undefined" ? remainingHp : unit.hp,
                        mp: typeof remainingMp !== "undefined" ? remainingMp : unit.mp,
                    }
                    : unit
            );

        if (teamKey === "A") {
            setTeamA((prev) => updateTeam(prev));
        } else if (teamKey === "B") {
            setTeamB((prev) => updateTeam(prev));
        }
    };

    const handleRoundFinish = () => {
        // 確保所有回合都完成後才顯示結果
        if (currentRoundIndex + 1 < rounds.length) {
            setCurrentRoundIndex((prev) => prev + 1);
        } else {
            setTimeout(() => {
                setShowResult(true);
                onFinish?.();
            }, 500); // 結果顯示延遲
        }
    };

    const startBattle = () => {
        setBattleStarted(true);
    };

    useEffect(() => {
        if (battleStarted && currentRoundIndex === 0) {
            setTimeout(() => {
                setCurrentRoundIndex(0);
            }, 100);
        }
    }, [battleStarted, currentRoundIndex]);

    const renderTeamColumn = (team, isLeft) => {
        const front = team.filter((u) => u.row === "front");
        const back = team.filter((u) => u.row === "back");
        const maxLen = Math.max(front.length, back.length);

        return Array.from({ length: maxLen }).map((_, i) => (
            <div key={i} className={styles.teamRow}>
                {isLeft ? (
                    <>
                        <div
                            className={`${styles.character} ${back[i]?.hp <= 0 ? styles.dead : ""}`}
                        >
                            {renderCharacter(back[i])}
                        </div>
                        <div
                            className={`${styles.character} ${front[i]?.hp <= 0 ? styles.dead : ""}`}
                        >
                            {renderCharacter(front[i])}
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className={`${styles.character} ${front[i]?.hp <= 0 ? styles.dead : ""}`}
                        >
                            {renderCharacter(front[i])}
                        </div>
                        <div
                            className={`${styles.character} ${back[i]?.hp <= 0 ? styles.dead : ""}`}
                        >
                            {renderCharacter(back[i])}
                        </div>
                    </>
                )}
            </div>
        ));
    };

    const renderCharacter = (unit) => {
        if (!unit) return <div className={styles.empty} />;
        const isDead = unit.hp <= 0;
        return (
            <div className={`${styles.characterBox} ${isDead ? styles.dead : ""}`}>
                <img src={unit.avatar} alt={unit.name} />
                <div className={styles.name}>{unit.name}</div>
                <div className={styles.hp}>
                    HP: {unit.hp}/{unit.max_hp}
                </div>
                <div className={styles.mp}>
                    MP: {unit.mp}/{unit.max_mp}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.battleWrapper}>
            <div className={styles.battleField}>
                <div className={styles.teamLeft}>{renderTeamColumn(teamA, true)}</div>
                <div className={styles.vs}>VS</div>
                <div className={styles.teamRight}>{renderTeamColumn(teamB, false)}</div>
            </div>

            {!battleStarted && (
                <div className={styles.startMessage}
                    onClick={startBattle}
                    style={{ marginTop: "2rem" }}>
                    點擊開始戰鬥
                </div>
            )}

            {battleStarted && rounds[currentRoundIndex] && (
                <BattleRound
                    actions={rounds[currentRoundIndex]?.actions || []}
                    updateTeamState={updateTeamState}
                    onFinish={handleRoundFinish}
                />
            )}

            {showResult && (
                <div className={styles.resultCard}>
                    <h2>{result}</h2>
                    <h3>戰利品:</h3>
                    <ul>
                        {rewards.items.map((item) => (
                            <li key={item.item_id}>
                                {item.name} - {item.rarity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
