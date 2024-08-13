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

const ChartComponent2 = ({ soldData, soldData2 }) => {
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    console.log("soldData:", soldData);
    console.log("soldData2:", soldData2);

    const populateData = () => {
      if (soldData.length === 0 || soldData2.length === 0) return; // Handle empty data

      // Create labels from unique categories
      const labels = [...new Set(soldData.map((item) => item["category"]))];

      // Map soldData and soldData2 to have the same order of categories
      const dataMapping = (data) => {
        return labels.map((label) => {
          const item = data.find((d) => d["category"] === label);
          return item ? item["sold"] : 0;
        });
      };

      const dataSet = {
        labels: labels,
        datasets: [
          {
            label: "Category Mapping 1",
            data: dataMapping(soldData),
            borderWidth: 1,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Category Mapping 2",
            data: dataMapping(soldData2),
            borderWidth: 1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      };
      setDataset(dataSet);
    };

    populateData();
  }, [soldData, soldData2]); // Update chart when either dataset changes

  return <>{dataset ? <Bar data={dataset} /> : <p>Loading chart data...</p>}</>;
};

export default ChartComponent2;
