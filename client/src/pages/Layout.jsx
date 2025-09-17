import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

import Sidebar from "../components/SideBar";
import Loading from "../components/Loading";

const Layout = () => {
  const { isLoaded, user } = useUser(); // Clerk hook
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Block rendering until Clerk finishes loading
  if (!isLoaded) {
    return <Loading />;
  }

  // If no user, maybe redirect to login (optional)
  if (!user) {
    return <div>No user found, please log in.</div>;
  }

  return (
    <div className="w-full flex h-screen relative">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex-1 bg-slate-50 overflow-y-auto">
        <Outlet />
      </div>

      {/* Mobile toggle button */}
      {sidebarOpen ? (
        <X
          className="absolute top-3 right-3 p-2 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden cursor-pointer z-50"
          onClick={() => setSidebarOpen(false)}
        />
      ) : (
        <Menu
          className="absolute top-3 right-3 p-2 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden cursor-pointer z-50"
          onClick={() => setSidebarOpen(true)}
        />
      )}
    </div>
  );
};

export default Layout;
