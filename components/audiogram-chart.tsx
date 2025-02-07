"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { useAudiology } from "@/contextes/audiology-context"

interface AudiogramChartProps {
  ear: "right" | "left"
}

export function AudiogramChart({ ear }: AudiogramChartProps) {
  const { data } = useAudiology()
  const chartData = data[ear === "right" ? "rightEar" : "leftEar"]

  return (
    <ChartContainer
      config={{
        threshold: {
          label: "Hearing Threshold",
          color: ear === "right" ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="frequency"
            type="number"
            scale="log"
            domain={[125, 8000]}
            ticks={[125, 250, 500, 1000, 2000, 4000, 8000]}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            domain={[-10, 120]}
            reversed
            ticks={[-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]}
            label={{ value: "dB HL", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value, ) => [`${value} dB`, "Threshold"]}
            labelFormatter={(label) => `${label} Hz`}
          />
          <Line type="monotone" dataKey="threshold" stroke={`var(--color-threshold)`} strokeWidth={2} dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

