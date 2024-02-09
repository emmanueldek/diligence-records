import NavigationMenuDemo from "@/components/dropdown";
import Footer from "@/pages/auth/Footer";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main>
    
      <div className="w-full h-screen bg-link auth-hero p-4 relative">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 h-full ">
        <div className="w-full h-full mx-auto md:block flex justify-center order-2 lg:order-1">
          <div className="flex flex-col justify-center items-center w-full h-full lg:w-4/5">
            <div className="w-full flex items-start">
            <h4 className='text-3xl sm:text-4xl lg:text-[2.85rem] text-left leading-10 mb-12 font-bold text-white hidden lg:block'>
              Reduce your risk <br /> with our robust <br /><span className="text-[#00FFB1]">due diligence  </span> tool.
            </h4>
            </div>
              <Outlet />
          </div>
        </div>
        <div className="relative flex order-1 lg:order-2">
          <div className="absolute right-4 top-8 ">
            <NavigationMenuDemo />
          </div>
        </div>

      </div>
      </div>
      <Footer />
    </main>

  );
}

export default AuthLayout;
