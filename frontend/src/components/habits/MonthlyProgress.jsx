"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetMonthlyProgessQuery } from "@/features/habits/habit.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

const fillColours = ["#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e"];

const chartColours = [
  "#90ee90",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "#90ee90",
  "hsl(var(--chart-5))",
];

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// };

export function MonthlyProgress() {
  const { data, isLoading, isSuccess, isError } = useGetMonthlyProgessQuery();
  let chartConfig = {};
  const chartData = data?.map((progress, i) => {
    chartConfig = {
      ...chartConfig,
      [progress?.habitName]: {
        label: progress?.habitName,
        colour: chartColours[i],
      },
    };
    return { fill: fillColours[i], ...progress };
  });
  //
  console.log(chartData);

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (isError) {
    return "Something went wrong";
  }
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Your monthly progress</CardTitle>
        <CardDescription>October 2024</CardDescription>
        <div className="leading-none  text-blue-400">
          Info - Radial chart are showing how many percent did you finish your
          habits for this month
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelKey="totalPercent"
                  nameKey="habitName"
                />
              }
            />
            <RadialBar dataKey="totalPercent" background>
              <LabelList
                position="insideStart"
                dataKey="habitName"
                className="fill-blue-800 capitalize "
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 gap-6">
          {chartData.map((data) => (
            <div key={data.habitName} className="flex gap-2 items-center">
              <button
                style={{
                  backgroundColor: data.fill,
                  width: "10px",
                  height: "10px",
                }}
              ></button>
              <div className="flex gap-2 ">
                <p>{data.habitName}</p>
                <p>-</p>
                <p>{data.totalPercent}%</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          Increasing by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
