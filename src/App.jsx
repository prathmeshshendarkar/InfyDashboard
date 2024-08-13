import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard1 from "./components/Dashboard1";
import Dashboard2 from "./components/Dashboard2";
import { randomSold } from "./components/randomSold.js";
import { useRef } from "react";

// I am checking how to pull from origin in replit, just adding one comment to pull the repo instead of pushing.

const App = () => {
  const soldData = useRef(randomSold());
  const soldData2 = useRef(randomSold());

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Hello World</h1>
        </header>
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard1" className="text-white hover:underline">
                Dashboard 1
              </Link>
            </li>
            <li>
              <Link to="/dashboard2" className="text-white hover:underline">
                Dashboard 2
              </Link>
            </li>
            {/* Add a link for the root path if you have a home page */}
            <li>
              <Link to="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
          </ul>
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<div>Welcome to the Home Page</div>} />
            <Route
              path="/dashboard1"
              element={<Dashboard1 soldData={soldData} />}
            />
            <Route
              path="/dashboard2"
              element={<Dashboard2 soldData={soldData} soldData2={soldData2} />}
            />
            {/* Add a fallback route for unmatched paths */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
