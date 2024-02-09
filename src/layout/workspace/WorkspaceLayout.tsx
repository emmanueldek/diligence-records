import { Outlet } from "react-router-dom";

function WorkspaceLayout() {
  return (
    <main className="w-full h-screen">
      <div className="w-[90%] h-[100%] max-w-[480px] mx-auto">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default WorkspaceLayout;
