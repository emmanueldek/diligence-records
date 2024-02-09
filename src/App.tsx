import { Routes, Route } from "react-router-dom";
import {
  appRoutes,
  authRoutes,
  spaceRoutes,
  documentRoutes,
} from "./AppRoutes";
import { AuthLayout, PageLayout, WorkspaceLayout } from "./layout";
import { ErrorPage } from "./pages";
import DocumentLayout from "./layout/document";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />} errorElement={<ErrorPage />}>
        {authRoutes.map((authRoute, index) => {
          const { path, element } = authRoute;

          return <Route key={index} path={path} element={element} />;
        })}
      </Route>

      <Route path="/" element={<PageLayout />}>
        {appRoutes.map((appRoute, index) => {
          const { path, element } = appRoute;

          return <Route key={index} path={path} element={element} />;
        })}
      </Route>

      <Route path="/space" element={<WorkspaceLayout />}>
        {spaceRoutes.map((spaceRoute, index) => {
          const { path, element } = spaceRoute;

          return <Route key={index} path={path} element={element} />;
        })}
      </Route>

      <Route path="/document" element={<DocumentLayout />}>
        {documentRoutes.map((docRoutes, index) => {
          const { path, element } = docRoutes;

          return <Route key={index} path={path} element={element} />;
        })}
      </Route>
      {/* <Route path="/auth/reset-password" element={<ResetPassword/>}/> */}
    </Routes>
  );
}

export default App;
