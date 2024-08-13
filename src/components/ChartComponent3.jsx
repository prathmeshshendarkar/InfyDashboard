import React, { useEffect, useState } from "react";
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

const ChartComponent3 = ({ data1, data2 }) => {
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    const populateData = () => {
      const labels = data1.map((item) => item.title);

      const dataset = {
        labels: labels,
        datasets: [
          {
            label: "Sales for Date 1",
            data: data1.map((item) => item.sold),
            borderWidth: 1,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Sales for Date 2",
            data: data2.map((item) => item.sold2),
            borderWidth: 1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      };

      setDataset(dataset);
    };

    populateData();
  }, [data1, data2]);

  return <>{dataset && <Bar data={dataset} />}</>;
};

export default ChartComponent3;
