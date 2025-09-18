import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Loading from "../components/Loading";

const Layout = () => {
  const { isLoaded, user } = useUser(); // Clerk hook
  const [sidebarOpen, setSideBarOpen] = useState(false);

  // Block rendering until Clerk finishes loading
  if (!isLoaded) {
    return <Loading />;
  }

  // If no user, maybe redirect to login (optional)
  if (!user) {
    return <div>No user found, please log in.</div>;
  }

  return (
    <div className="w-full flex h-max relative">
      {/* Sidebar */}
      <Header sidebarOpen={sidebarOpen} setSideBarOpen={setSideBarOpen} />

      <Sidebar sidebarOpen={sidebarOpen} setSideBarOpen={setSideBarOpen} />

      {/* Main content area */}
      <div
        className={`flex-1 bg-slate-50 overflow-y-auto transition-all duration-300 
  sm:ml-60 xl:ml-72 no-scrollbar`}
      >
        <Outlet  />
      </div>
    </div>
  );
};

export default Layout;
