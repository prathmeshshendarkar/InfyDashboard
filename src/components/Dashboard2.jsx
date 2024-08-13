import React from "react";
import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { randomSold } from "./randomSold.js";
import { groupedData } from "./groupedData.js";
import ChartComponent2 from "./ChartComponent2.jsx";
import ChartComponent3 from "./ChartComponent3.jsx";

const Dashboard2 = (props) => {
  const { soldData, soldData2 } = props;
  const [data, setData] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState([
    { field: "title" },
    { field: "category" },
    { field: "price" },
    { field: "rating" },
    { field: "stock" },
    { field: "sold" },
    { field: "sold2" },
  ]);
  const [categoryData, setCategoryData] = useState(null);
  const [categoryData2, setCategoryData2] = useState(null);
  // const [data1, setData1] = useState(null);
  // const [data2, setData2] = useState(null);
  const data1 = useRef(null);
  const data2 = useRef(null);

  const [changeDate, setChangeDate] = useState(0);
  const [changeDate2, setChangeDate2] = useState(0);
  useEffect(() => {
    // console.log("Dashboard2 mounted");

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
            newItems["sold2"] = soldData2.current[i];
            i++;
          }
        }

        return newItems;
      });
      setRowData(newData);
      setData(newData);
      data1.current = JSON.parse(JSON.stringify(newData));
      data2.current = JSON.parse(JSON.stringify(newData));
      // console.log("I am getting called");
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Date 1");
    if (data1.current) {
      soldData.current = randomSold();
      let i = 0;
      const newData1 = data1.current.map((item) => {
        item["sold"] = soldData.current[i];
        i++;
        return item;
      });
      // console.log(newData);
      setCategoryData(groupedData(newData1, "category"));
      setRowData(newData1);
      data1.current = JSON.parse(JSON.stringify(newData1));
      // console.log(soldData);
    }
  }, [changeDate]);

  useEffect(() => {
    console.log("Date 2");
    if (data2.current) {
      soldData2.current = randomSold();
      // console.log(data2);
      let i = 0;
      const newData2 = data2.current.map((item) => {
        item["sold2"] = soldData2.current[i];
        i++;
        return item;
      });
      // console.log(newData);
      setCategoryData2(groupedData(newData2, "category"));
      setRowData(newData2);
      data2.current = JSON.parse(JSON.stringify(newData2));
      // console.log(soldData2);
    }
  }, [changeDate2]);
  const handleOnClick = () => {
    // console.log("Clicked");
    setChangeDate((prev) => prev + 1);
  };

  const handleOnClick2 = () => {
    // console.log("Clicked");
    setChangeDate2((prev) => prev + 1);
  };

  return (
    <>
      <div>Dashboard 2</div>
      <button onClick={handleOnClick}>Change Date1</button>
      <button onClick={handleOnClick2}>Change Date2</button>
      <div>Results for Dashboard 2</div>

      {categoryData && categoryData2 && (
        <ChartComponent2 soldData={categoryData} soldData2={categoryData2} />
      )}

      {data1.current && data2.current && (
        <ChartComponent3 data1={data1.current} data2={data2.current} />
      )}

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colData} />
      </div>
    </>
  );
};

export default Dashboard2;
