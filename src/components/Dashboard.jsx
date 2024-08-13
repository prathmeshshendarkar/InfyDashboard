import React from "react";
import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import { randomSold } from "./randomSold.js";
import { useRef } from "react";

const Dashboard = () => {
  const soldData = useRef(randomSold());
  const soldData2 = useRef(randomSold());
  // console.log(soldData);
  return (
    <>
      <Dashboard1 soldData={soldData} />
      <Dashboard2 soldData={soldData} soldData2={soldData2} />
    </>
  );
};

export default Dashboard;
