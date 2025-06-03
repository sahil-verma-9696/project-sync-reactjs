import React, { useState } from "react";
import { Toast } from "./components/layout/Toast.jsx";
import { fallbackNavItems, navItems } from "./data/navItems.js";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";
import { Outlet } from "react-router-dom";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex gap-2 w-screen h-screen overflow-hidden bg-[#f4fbf9] dark:bg-black p-2 dark:text-white">
      <Toast />
      <Sidebar
        open={showSidebar}
        navItems={navItems}
        fallbackNavItems={fallbackNavItems}
      />
      <main className="size-full flex flex-col  gap-2 flex-1 rounded-lg overflow-y-auto">
        <Header setOpen={setShowSidebar} open={showSidebar} />
        <Outlet />
      </main>
    </div>
  );
}
