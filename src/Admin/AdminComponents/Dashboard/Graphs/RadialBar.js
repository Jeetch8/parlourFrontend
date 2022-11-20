import React from "react";
import Chart from "react-apexcharts";

const RadialBar = () => {
  const series = [70]; //70 percent
  const options = {
    labels: ["Female"], //label of this diagram
  };
  return <Chart type="radialBar" series={series} options={options} />;
};

export default RadialBar;
