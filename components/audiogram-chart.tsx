"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useAudiology } from "@/contextes/audiology-context";
import type { PTATestType } from "@/types/audiology";

import {
  Circle,
  X,
  Triangle,
  Diamond,
  Star,
  Square,
  Asterisk,
  Icon,
} from "lucide-react";

interface AudiogramChartProps {
  ear: "right" | "left";
}

const getIcon = (type: PTATestType, ear: "right" | "left") => {
  switch (type) {
    case "AC":
      return ear === "right" ? Circle : X;
    case "BC":
      return ear === "right" ? Triangle : Diamond;
    case "SF":
      return Star;
    case "SAL":
      return Square;
    case "UCL":
      return Asterisk;
    default:
      return Circle;
  }
};

const getColor = (type: PTATestType, ear: "right" | "left") => {
  switch (type) {
    case "AC":
      return ear === "right" ? "blue" : "red";
    case "BC":
      return ear === "right" ? "green" : "orange";
    case "SF":
      return "purple";
    case "SAL":
      return "brown";
    case "UCL":
      return "pink";
    default:
      return "gray";
  }
};

export function AudiogramChart({ ear }: AudiogramChartProps) {
  const { data } = useAudiology();
  const chartData = data[ear === "right" ? "rightEar" : "leftEar"];

  const renderLinesAndDots = () => {
    return (
      <Line
        key="audiogram-line"
        type="monotone"
        dataKey="threshold"
        data={chartData} // Use all data to connect all points
        stroke="blue" // Default color, can be customized
        strokeWidth={2}
        dot={({ cx, cy, payload }) => {
          if (!cx || !cy) return <></>;
          const Icon = getIcon(payload.testType, ear);
          const color = getColor(payload.testType, ear);

          return (
            <foreignObject x={cx - 9} y={cy - 9} width="18" height="18">
              <div className="flex items-center justify-center w-full h-full">
                <Icon size={18} stroke={color} fill="hsl(var(--background))" />
              </div>
            </foreignObject>
          );
        }}
        connectNulls
      />
    );
  };

  const renderReferenceMap = () => {
    const testTypes: PTATestType[] = ["AC", "BC", "SF", "SAL", "UCL"];
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {testTypes.map((type) => {
          const Icon = getIcon(type, ear);
          return (
            <div key={type} className="flex items-center">
              <Icon
                size={20}
                className="mr-2"
                fill="hsl(var(--background))"
                stroke={getColor(type, ear)}
              />
              <span>{type}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        {ear === "right" ? "Right" : "Left"} Ear Audiogram
      </h3>
      <ChartContainer
        config={{
          right: {
            label: "Right Ear",
            color: "hsl(var(--chart-1))",
          },
          left: {
            label: "Left Ear",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            accessibilityLayer
            margin={{ top: 20, right: 30, left: 20, bottom: 2 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="frequency"
              type="number"
              scale="log"
              domain={[125, 8000]}
              ticks={[
                125, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000,
              ]}
              tickFormatter={(value) => `${value}`}
              label={{
                value: "Frequency (Hz)",
                position: "insideLeft",
              }}
            />

            <YAxis
              domain={[-10, 120]}
              reversed
              ticks={[
                -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
              ]}
              label={{ value: "dB HL", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value, name, props) => [
                `${value} dB`,
                `${props.payload.testType} - ${props.payload.frequency} Hz`,
              ]}
            />
            {renderLinesAndDots()}
            <ReferenceLine y={0} stroke="gray" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      {renderReferenceMap()}
    </div>
  );
}
