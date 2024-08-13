import React from "react";
import { useEffect, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent3 = (props) => {
  const { data1, data2 } = props;
  // console.log("I am inside char3");
  console.log(data1);
  console.log("Seperate Data1 and Data2");
  console.log(data2);
  const [dataset, setDataset] = useState(null);
  useEffect(() => {
    const populateData = () => {
      const dataSet = {
        labels: data1.map((item) => item["title"]),
        datasets: [
          {
            label: "Product Mapping",
            data: data1.map((item) => item["sold"]),
            borderWidth: 1,
          },
          {
            label: "Product Mapping",
            data: data2.map((item) => item["sold"]),
            borderWidth: 1,
          },
        ],
      };
      // console.log(dataSet);
      setDataset(dataSet);
    };
    populateData();
  }, [, data1, data2]);

  return <>{dataset && <Bar data={dataset} />}</>;
};

export default ChartComponent3;
