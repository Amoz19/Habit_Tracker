import { useGetProgressQuery } from "../../features/habits/habit.api";
import { TrendingUp } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export const description = "A radial chart with text";

const Progress = ({ habitLength }) => {
  const { data } = useGetProgressQuery();
  console.log(habitLength);

  return (
    <div className="fixed bottom-5 p-6 rounded bg-slate-100">
      <h1 className="mb-3 font-semibold text-l">Weekly Progress</h1>
      <div className=" flex justify-around items-center ">
        {data?.map(({ key, value }) => (
          <div key={key} className="chart-container flex flex-col items-center">
            <h5 className="text-xs">{key}</h5>
            <RadialBarChart
              width={40}
              height={40}
              data={[{ progress: value, fill: "#22c55e" }]}
              startAngle={90}
              endAngle={(value / 100) * 450}
              innerRadius={15}
              outerRadius={25}
              barSize={3}
            >
              <RadialBar
                dataKey="progress"
                background={{ fill: "#f1f5f9" }}
                cornerRadius={1}
              />
              <PolarRadiusAxis tick={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-[10px]"
                          >
                            {value.toLocaleString()}%
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
