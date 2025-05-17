import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import type { Votes, VoteType } from "../../types/votes";
import { useState, type JSX } from "react";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

export default function App(): JSX.Element {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  function handleVote(type: VoteType): void {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  }

  function resetVotes(): void {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  }

  const totalVotes: number = votes.good + votes.neutral + votes.bad;
  const positiveRate: number =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 && (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      )}
      {totalVotes === 0 && <Notification />}
    </div>
  );
}
