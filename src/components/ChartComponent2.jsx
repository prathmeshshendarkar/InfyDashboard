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

const ChartComponent2 = (props) => {
  const { soldData, soldData2 } = props;
  // console.log(soldData2);
  const [dataset, setDataset] = useState(null);

  // console.log(soldData);
  useEffect(() => {
    const populateData = () => {
      const dataSet = {
        labels: soldData.map((item) => item["category"]),
        datasets: [
          {
            label: "Category Mapping",
            data: soldData.map((item) => item["sold"]),
            borderWidth: 1,
          },
          {
            label: "Category Mapping",
            data: soldData2.map((item) => item["sold"]),
            borderWidth: 1,
          },
        ],
      };
      // console.log(dataSet);
      setDataset(dataSet);
    };
    populateData();
  }, [, soldData, soldData2]);

  return <>{dataset && <Bar data={dataset} />}</>;
};

export default ChartComponent2;
