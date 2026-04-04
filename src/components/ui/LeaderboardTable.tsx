import { motion } from 'framer-motion';

interface LeaderboardItem {
  id: string;
  name: string;
  score: number;
  attempts?: number;
}

interface LeaderboardTableProps {
  data: LeaderboardItem[];
}

export const LeaderboardTable = ({ data }: LeaderboardTableProps) => {
  return (
    <div className="saas-card overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Leaderboard</h3>
        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300">Live Ranking</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-ui-border text-xs uppercase tracking-wide text-muted">
              <th className="px-3 py-3">Rank</th>
              <th className="px-3 py-3">Student</th>
              <th className="px-3 py-3">Score</th>
              <th className="px-3 py-3">Attempts</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className="border-b border-ui-border/70 last:border-b-0"
              >
                <td className="px-3 py-3 font-semibold text-brand-600 dark:text-brand-300">#{index + 1}</td>
                <td className="px-3 py-3 font-medium">{item.name}</td>
                <td className="px-3 py-3">
                  <div className="h-2 w-full max-w-[140px] rounded-full bg-slate-200 dark:bg-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(item.score, 100)}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600"
                    />
                  </div>
                  <span className="mt-1 inline-block text-xs text-muted">{item.score}%</span>
                </td>
                <td className="px-3 py-3 text-muted">{item.attempts ?? 1}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
