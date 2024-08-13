import React from "react";
import { useEffect, useState, useRef } from "react";
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
  // console.log(soldData);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // console.log("Dashboard1 mounted");

    const fetchData = async () => {
      let i = 0;
      const fetchedData = await fetch("https://dummyjson.com/products");
      const results = await fetchedData.json();

      const columnData = ["title", "category", "price", "rating", "stock"];

      const newData = results["products"].map((item) => {
        // console.log(item);
        let newItems = {};
        for (let keys in item) {
          if (columnData.includes(keys)) {
            // console.log(keys);
            newItems[keys] = item[keys];
            newItems["sold"] = soldData.current[i];
            i++;
          }
        }

        return newItems;
      });
      setRowData(newData);
      setData(newData);
      // console.log(newData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCategoryData(groupedData(data, "category"));
  }, [data, setData]);
  return (
    <>
      <div>Dashboard 1</div>
      <div>Results for Dashboard 1</div>

      {categoryData && <ChartComponent data={categoryData} />}

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colData} />
      </div>
    </>
  );
};

export default Dashboard1;
