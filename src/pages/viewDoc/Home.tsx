import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

type ViewerProps = {
  fileUrl?: string;
};

const Home: React.FC<ViewerProps> = ({ fileUrl }) => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer fileUrl={fileUrl ? fileUrl : ""} />
    </Worker>
  );
};

export default Home;
