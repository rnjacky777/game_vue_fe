export default function BattleRound({ actions }) {
    return (
      <div className="battle-round">
        {actions.map((action, index) => (
          <div key={index} className="battle-action">
            <p>
              {action.actor} 使用了 {action.action_type} 對 {action.target} 造成{" "}
              {action.damage || action.buff || 0} 點效果
              {action.crit && "（暴擊！）"}
            </p>
          </div>
        ))}
      </div>
    );
  }
  