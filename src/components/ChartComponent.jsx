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

const ChartComponent = ({ data }) => {
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    console.log("Data received in ChartComponent:", data);

    const populateData = () => {
      if (data.length === 0) return; // Handle empty data

      const dataSet = {
        labels: data.map((item) => item["category"]),
        datasets: [
          {
            label: "Category Sales",
            data: data.map((item) => item["sold"]),
            borderWidth: 1,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
          },
        ],
      };
      setDataset(dataSet);
    };

    populateData();
  }, [data]); // Update chart when data changes

  return <>{dataset ? <Bar data={dataset} /> : <p>Loading chart data...</p>}</>;
};

export default ChartComponent;
