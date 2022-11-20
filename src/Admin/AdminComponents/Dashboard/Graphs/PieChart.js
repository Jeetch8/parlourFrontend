import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const options = {
    labels: [
      "Direct",
      "Search engine",
      "Google ads",
      "Facebook ads",
      "Social media",
    ],
  };
  const series = [4, 5, 6, 1, 5]; //our data

  return (
    <div className="donut">
      <Chart options={options} series={series} type="donut" width="380" />
    </div>
  );
};

export default PieChart;
