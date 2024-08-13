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
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    const populateData = () => {
      const dataSet = {
        labels: soldData.map((item) => item["category"]),
        datasets: [
          {
            label: "Category Mapping 1",
            data: soldData.map((item) => item["sold"]),
            borderWidth: 1,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Category Mapping 2",
            data: soldData2.map((item) => item["sold"]),
            borderWidth: 1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      };
      setDataset(dataSet);
    };
    populateData();
  }, [soldData, soldData2]); // Corrected dependency array

  return <>{dataset && <Bar data={dataset} />}</>;
};

export default ChartComponent2;
