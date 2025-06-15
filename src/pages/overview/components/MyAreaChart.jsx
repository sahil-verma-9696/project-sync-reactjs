import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getColor } from "../utility/util";

function getDDMMTT(time) {
  return new Date(time).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    hour12: true,
  });
}

export default function MyAreaChart({ tasks, labels }) {
  function groupTaskByTime(acc, task) {
    const time = getDDMMTT(task.createdAt);

    if (!acc[time]) {
      acc[time] = { time };
      labels.forEach((label) => (acc[time][label.title] = 0));
    }

    const findByLabel = (label) => label.title === task.label;
    const matchedLabel = labels.find(findByLabel);

    if (matchedLabel) {
      acc[time][matchedLabel.title] += 1;
    }

    return acc;
  }
  const trendByLabel = tasks.reduce(groupTaskByTime, {});

  const trendData = Object.values(trendByLabel);

  function mapToLinerGradient(label) {
    return (
      <linearGradient
        key={label.id}
        id={`color-${label.id}`}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop offset="5%" stopColor={getColor(label)} stopOpacity={0.8} />
        <stop offset="95%" stopColor={getColor(label)} stopOpacity={0} />
      </linearGradient>
    );
  }

  function mapToArea(label) {
    return (
      <Area
        key={label.id}
        type="monotone"
        dataKey={label.title}
        stroke={getColor(label)}
        fill={`url(#color-${label.id})`}
        stackId="1"
      />
    );
  }
  return (
    <section className="dark:bg-[#131416] bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Task Trend
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={trendData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>{labels.map(mapToLinerGradient)}</defs>
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          {labels.map(mapToArea)}
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}
