"use client"

interface PersonalScoreProps {
  score: number;
  trend: string;
}

export function PersonalScore({ score, trend }: PersonalScoreProps) {
  return (
    <div className="p-4 bg-orange-500/10 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium mb-1">Current Score</p>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">{score}</span>
            <span className="text-lg font-medium ml-1">%</span>
          </div>
        </div>
        <div className="bg-orange-500/20 rounded-lg px-3 py-1">
          <span className="text-orange-600 font-medium text-sm">
            {trend === "up" ? "↑ Improving" : "↓ Declining"}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-gray-500 mb-1">DAILY</p>
          <p className="text-sm font-medium">Good</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">WEEKLY</p>
          <p className="text-sm font-medium">Great</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">MONTHLY</p>
          <p className="text-sm font-medium">Excellent</p>
        </div>
      </div>
    </div>
  )
}

