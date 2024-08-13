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
  const data1 = useRef([]);
  const data2 = useRef([]);

  const [changeDate, setChangeDate] = useState(0);
  const [changeDate2, setChangeDate2] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let i = 0;
        const fetchedData = await fetch("https://dummyjson.com/products");
        const results = await fetchedData.json();

        const columnData = ["title", "category", "price", "rating", "stock"];

        const newData = results["products"].map((item) => {
          let newItems = {};
          for (let keys in item) {
            if (columnData.includes(keys)) {
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
        data1.current = [...newData];
        data2.current = [...newData];
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [soldData, soldData2]);

  useEffect(() => {
    if (data1.current.length > 0) {
      soldData.current = randomSold();
      const newData1 = data1.current.map((item, i) => ({
        ...item,
        sold: soldData.current[i],
      }));
      setCategoryData(groupedData(newData1, "category"));
      setRowData(newData1);
      data1.current = [...newData1];
    }
  }, [changeDate]);

  useEffect(() => {
    if (data2.current.length > 0) {
      soldData2.current = randomSold();
      const newData2 = data2.current.map((item, i) => ({
        ...item,
        sold2: soldData2.current[i],
      }));
      setCategoryData2(groupedData(newData2, "category"));
      setRowData(newData2);
      data2.current = [...newData2];
    }
  }, [changeDate2]);

  const handleDateChange1 = () => {
    setChangeDate((prev) => prev + 1);
  };

  const handleDateChange2 = () => {
    setChangeDate2((prev) => prev + 1);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard 2</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="date"
          onChange={handleDateChange1}
          className="border p-2 rounded"
        />
        <input
          type="date"
          onChange={handleDateChange2}
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-4">Results for Dashboard 2</div>

      {categoryData && categoryData2 && (
        <ChartComponent2 soldData={categoryData} soldData2={categoryData2} />
      )}

      {data1.current && data2.current && (
        <ChartComponent3 data1={data1.current} data2={data2.current} />
      )}

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colData} />
      </div>
    </div>
  );
};

export default Dashboard2;
