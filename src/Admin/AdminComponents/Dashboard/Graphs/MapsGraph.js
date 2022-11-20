import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: [
    "Facebook",
    "Pinterest",
    "Linkedin",
    "Instagram",
    "SnapChat",
    "Twitter",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [2, 9, 3, 10, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

export default function MapsGraph() {
  return <Radar data={data} />;
}
