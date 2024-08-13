import React from "react";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { randomSold } from "./randomSold.js";
import ChartComponent from "./ChartComponent.jsx";
import { groupedData } from "./groupedData.js";

const Dashboard1 = (props) => {
  const [data, setData] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState([
    { field: "title" },
    { field: "category" },
    { field: "price" },
    { field: "rating" },
    { field: "stock" },
    { field: "sold" },
  ]);
  const { soldData } = props;
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let i = 0;
      const fetchedData = await fetch("https://dummyjson.com/products");
      const results = await fetchedData.json();

      const columnData = ["title", "category", "price", "rating", "stock"];

      const newData = results["products"].map((item) => {
        let newItems = {};
        for (let key of columnData) {
          if (key in item) {
            newItems[key] = item[key];
          }
        }
        newItems["sold"] = soldData.current[i];
        i++;
        return newItems;
      });
      setRowData(newData);
      setData(newData);
    };

    fetchData();
  }, [soldData]);

  useEffect(() => {
    if (data) {
      setCategoryData(groupedData(data, "category"));
    }
  }, [data]);

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard 1</h2>
      <div className="mb-4">Results for Dashboard 1</div>

      {categoryData && <ChartComponent data={categoryData} />}

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colData} />
      </div>
    </div>
  );
};

export default Dashboard1;
