import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ChartComponent from "./ChartComponent.jsx";
import { groupedData } from "./groupedData.js";

const Dashboard1 = ({ soldData }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const result = await response.json();
        const products = result.products.map((item, index) => ({
          ...item,
          sold: soldData.current[index] || 0,
        }));
        setData(products);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [soldData]);

  useEffect(() => {
    let filtered = data;

    if (selectedCategory !== "All") {
      filtered = data.filter((item) => item.category === selectedCategory);
    }

    setFilteredData(filtered);
    setCategoryData(groupedData(filtered, "category"));
  }, [selectedCategory, data]);

  const columnDefs = [
    { field: "title" },
    { field: "category" },
    { field: "price" },
    { field: "rating" },
    { field: "stock" },
    { field: "sold" },
  ];

  return (
    <>
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="mr-2">
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          {[...new Set(data.map((item) => item.category))].map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {categoryData.length > 0 && <ChartComponent data={categoryData} />}

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={filteredData} columnDefs={columnDefs} />
      </div>
    </>
  );
};

export default Dashboard1;
