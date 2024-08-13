import React from "react";
import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import { randomSold } from "./randomSold.js";
import { useRef } from "react";

const Dashboard = () => {
  const soldData = useRef(randomSold());
  const soldData2 = useRef(randomSold());
  return (
    <div className="container mx-auto p-4">
      <Dashboard1 soldData={soldData} />
      <Dashboard2 soldData={soldData} soldData2={soldData2} />
    </div>
  );
};

export default Dashboard;
