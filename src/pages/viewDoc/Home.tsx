import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { getAuthToken } from "@/helpers/authTokens";

type ViewerProps = {
  fileUrl?: string;
};

const Home: React.FC<ViewerProps> = ({ fileUrl }) => {
  const token = getAuthToken();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer
        fileUrl={fileUrl ? fileUrl : ""}
        httpHeaders={{
          "Access-Control-Allow-Origin": "*",
          SPACES_SECRET_KEY: "F5nTpzfGyEuMny89fkH2ouXp2vnc1ZCaIN0HLewzwig",
          Authorization: `Bearer ${token}`,
        }}
        withCredentials={true}
      />
    </Worker>
  );
};

export default Home;
