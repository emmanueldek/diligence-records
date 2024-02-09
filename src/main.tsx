import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./assets/css/index.css";
import ScrollToTop from "./libs/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>,
);
