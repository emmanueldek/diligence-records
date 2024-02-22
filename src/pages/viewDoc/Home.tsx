// import React from "react";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { getAuthToken } from "@/helpers/authTokens";

// type ViewerProps = {
//   fileUrl?: string;
// };

// const Home: React.FC<ViewerProps> = ({ fileUrl }) => {
//   const token = getAuthToken();

//   return (
//     <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
//       <Viewer
//         fileUrl={fileUrl ? fileUrl : ""}
//         httpHeaders={{
//           "Access-Control-Allow-Origin": "*",
//           SPACES_SECRET_KEY: "F5nTpzfGyEuMny89fkH2ouXp2vnc1ZCaIN0HLewzwig",
//           Authorization: `Bearer ${token}`,
//         }}
//         withCredentials={true}
//       />
//     </Worker>
//   );
// };

// export default Home;

// import React from "react";
// import { pdfjs } from "react-pdf";
// import { Document, Page } from "react-pdf";
// import { useState } from "react";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url,
// ).toString();

// type ViewerProps = {
//   fileUrl?: string;
// };

// const Home: React.FC<ViewerProps> = ({ fileUrl }) => {
//   const [numPages, setNumPages] = useState<number>();
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
//     setNumPages(numPages);
//   }
//   return (
//     <div>
//       {" "}
//       <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// };

// export default Home;

// import React from "react";
// import "../../assets/css/index.css";
// import {
//   PdfViewerComponent,
//   Toolbar,
//   Magnification,
//   Navigation,
//   LinkAnnotation,
//   BookmarkView,
//   ThumbnailView,
//   Print,
//   TextSelection,
//   Annotation,
//   TextSearch,
//   FormFields,
//   FormDesigner,
//   Inject,
// } from "@syncfusion/ej2-react-pdfviewer";

// type ViewerProps = {
//   fileUrl?: string;
// };

// const Home: React.FC<ViewerProps> = ({ fileUrl }) => {
//   return (
//     <div>
//       {" "}
//       <div className="control-section">
//         {/* Render the PDF Viewer */}
//         <PdfViewerComponent
//           id="container"
//           documentPath={
//             "https://cdn.shopify.com/s/files/1/2081/8163/files/001-HIDE-AND-SEEK-Free-Childrens-Book-By-Monkey-Pen.pdf?v=1589846897"
//           }
//           resourceUrl="https://cdn.syncfusion.com/ej2/23.1.40/dist/ej2-pdfviewer-lib"
//           // serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer"
//           style={{ height: "640px" }}
//         >
//           <Inject
//             services={[
//               Toolbar,
//               Magnification,
//               Navigation,
//               Annotation,
//               LinkAnnotation,
//               BookmarkView,
//               ThumbnailView,
//               Print,
//               TextSelection,
//               TextSearch,
//               FormFields,
//               FormDesigner,
//             ]}
//           />
//         </PdfViewerComponent>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";

type ViewerProps = {
  fileUrl?: string;
};

const Home: React.FC<ViewerProps> = ({ fileUrl }) => {
  return <iframe src={fileUrl} width="100%" height="100%"></iframe>;
};

export default Home;
