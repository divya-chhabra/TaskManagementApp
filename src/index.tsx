import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals.js";
import TaskProvider from "./contexts/TaskContext/taskcontext";

const rootElement = document.getElementById("root") as HTMLElement | null;
if (rootElement) {
  // Your code that uses rootElement
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <TaskProvider>
          <App />
        </TaskProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
