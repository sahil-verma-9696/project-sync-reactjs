"use client";

import { useContext } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import LocalStorageContext from "../context/LocalStorage";
import { LABELS_COLOR } from "../data/constants";

export default function Overview() {
  const { tasks, labels } = useContext(LocalStorageContext);

  const COLOR_TO_HEX = {
    red: "#ef4444",
    yellow: "#facc15",
    green: "#10b981",
    blue: "#3b82f6",
    gray: "#6b7280",
    purple: "#a855f7",
    orange: "#f59e0b",
    pink: "#ec4899",
  };

  const getColor = (label) => COLOR_TO_HEX[label.color] || "#6b7280";

  // Group tasks by time and label for AreaChart
  const trendByLabel = tasks.reduce((acc, task) => {
    const time = new Date(task.createdAt).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      hour12: true,
    });

    if (!acc[time]) {
      acc[time] = { time };
      labels.forEach((label) => (acc[time][label.title] = 0));
    }

    const matchedLabel = labels.find((label) => label.title === task.label);
    if (matchedLabel) {
      acc[time][matchedLabel.title] += 1;
    }

    return acc;
  }, {});

  const trendData = Object.values(trendByLabel);

  // Prepare data for PieChart
  const pieData = labels.map((label) => ({
    name: label.title,
    value: tasks.filter((task) => task.label === label.title).length,
    color: getColor(label),
  }));

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      {/* Area Chart */}
      <section className="dark:bg-[#131416] bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Task Trend
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={trendData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {labels.map((label) => (
                <linearGradient
                  key={label.id}
                  id={`color-${label.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={getColor(label)}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={getColor(label)}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>

            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />

            {labels.map((label) => (
              <Area
                key={label.id}
                type="monotone"
                dataKey={label.title}
                stroke={getColor(label)}
                fill={`url(#color-${label.id})`}
                stackId="1"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </section>

      {/* Label Summary */}
      <section className="dark:bg-[#131416] bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Labels
        </h2>
        <div className="flex flex-wrap gap-6">
          {labels.map((label) => (
            <div
              key={label.id}
              className="w-48 p-4 border border-slate-300 rounded-xl flex flex-col gap-4 justify-center items-center bg-white dark:bg-[#1c1c1e] shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`border-[6px] size-24 flex justify-center items-center rounded-full p-4 ${
                  LABELS_COLOR[label.color]
                }`}
              >
                <span className="text-4xl font-bold">
                  {tasks.filter((task) => task.label === label.title).length}
                </span>
              </div>
              <span className="text-lg font-medium text-center text-gray-700 dark:text-gray-300">
                {label.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pie Chart */}
      <section className="dark:bg-[#131416] bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Task Distribution (Pie Chart)
        </h2>

        <div className="w-full flex justify-center">
          <ResponsiveContainer width="60%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
