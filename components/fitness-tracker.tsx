"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalScore } from "@/components/personal-score"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 70 },
  { name: "Wed", value: 68 },
  { name: "Thu", value: 72 },
  { name: "Fri", value: 75 },
  { name: "Sat", value: 78 },
  { name: "Sun", value: 82 },
]

export function FitnessTracker() {
  const [activeTab, setActiveTab] = useState("fitness")
  const [score] = useState(78)
  const [trend] = useState("up")

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Fitness Tracker</h3>
        <p className="text-gray-500 text-sm">Track your progress and stay motivated</p>
      </div>

      <Tabs defaultValue="fitness" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger 
            value="fitness"
            className="flex-1"
            onClick={() => setActiveTab("fitness")}
          >
            Fitness Score
          </TabsTrigger>
          <TabsTrigger 
            value="progress"
            className="flex-1"
            onClick={() => setActiveTab("progress")}
          >
            Progress
          </TabsTrigger>
        </TabsList>

        {activeTab === "fitness" ? (
          <PersonalScore score={score} trend={trend} />
        ) : (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Tabs>
    </Card>
  )
}

