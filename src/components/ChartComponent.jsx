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

const ChartComponent = (props) => {
  const { data } = props;
  const [dataset, setDataset] = useState(null);

  // console.log(data);
  useEffect(() => {
    const populateData = () => {
      const dataSet = {
        labels: data.map((item) => item["category"]),
        datasets: [
          {
            label: "Category Mapping",
            data: data.map((item) => item["sold"]),
            borderWidth: 1,
          },
        ],
      };
      // console.log(dataSet);
      setDataset(dataSet);
    };
    populateData();
  }, [, data]);

  return <>{dataset && <Bar data={dataset} />}</>;
};

export default ChartComponent;
