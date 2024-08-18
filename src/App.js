// src/App.js

import React from "react";
import "./App.css";
import Profile from "./components/Profile";
import ThemeSwitch from "./components/ThemeSwitch";

function App() {
  return (
    <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex justify-end p-4">
        <ThemeSwitch />
      </div>
      <Profile />
    </div>
  );
}

export default App;
