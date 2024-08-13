import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ChartComponent2 from "./ChartComponent2.jsx";
import ChartComponent3 from "./ChartComponent3.jsx";
import { groupedData } from "./groupedData.js";

const Dashboard2 = ({ soldData, soldData2 }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryData2, setCategoryData2] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();
      const products = result.products.map((item, index) => ({
        ...item,
        sold: soldData.current[index] || 0,
        sold2: soldData2.current[index] || 0,
      }));
      setData(products);
      setFilteredData(products);
      setCategoryData(groupedData(products, "category"));
      setCategoryData2(groupedData(products, "category"));
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [soldData, soldData2]);

  useEffect(() => {
    let filtered = data;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (selectedProduct !== "All") {
      filtered = filtered.filter((item) => item.title === selectedProduct);
    }

    setFilteredData(filtered);
  }, [selectedCategory, selectedProduct, data]);

  useEffect(() => {
    if (date1 && date2) {
      // Simulate date-based filtering by generating new data
      const updatedData = data.map((item) => ({
        ...item,
        sold: Math.floor(Math.random() * 100), // Replace this with actual logic
        sold2: Math.floor(Math.random() * 100), // Replace this with actual logic
      }));

      setFilteredData(updatedData);
      setCategoryData(groupedData(updatedData, "category"));
      setCategoryData2(groupedData(updatedData, "category"));
    }
  }, [date1, date2]);

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
          {categoryData.map((cat, index) => (
            <option key={index} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>

        <label htmlFor="productFilter" className="ml-4 mr-2">
          Filter by Product:
        </label>
        <select
          id="productFilter"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          {data.map((item, index) => (
            <option key={index} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="date1" className="mr-2">
          Select Date 1:
        </label>
        <input
          type="date"
          id="date1"
          value={date1}
          onChange={(e) => setDate1(e.target.value)}
          className="p-2 border rounded"
        />

        <label htmlFor="date2" className="ml-4 mr-2">
          Select Date 2:
        </label>
        <input
          type="date"
          id="date2"
          value={date2}
          onChange={(e) => setDate2(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {categoryData.length > 0 && categoryData2.length > 0 && (
        <>
          <ChartComponent2 soldData={categoryData} soldData2={categoryData2} />
          <ChartComponent3 data1={filteredData} data2={filteredData} />
        </>
      )}

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={filteredData}
          columnDefs={[
            { field: "title", headerName: "Product Name" },
            { field: "category", headerName: "Category" },
            { field: "sold", headerName: "Date 1 Sales Amount" },
            { field: "sold2", headerName: "Date 2 Sales Amount" },
            {
              field: "difference",
              headerName: "Difference",
              valueGetter: (params) => params.data.sold2 - params.data.sold,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Dashboard2;
