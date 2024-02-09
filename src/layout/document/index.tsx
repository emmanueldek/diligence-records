import { Outlet } from "react-router-dom";

function DocumentLayout() {
  return (
    <main className="w-full h-screen">
      <div className="w-full h-[100%] ">
        <div className=" w-full h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default DocumentLayout;
