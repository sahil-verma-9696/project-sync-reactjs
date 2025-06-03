import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import React from "react";
import { navItems } from "../../data/navItems";
import { filterByPathname } from "./Sidebar";

export default function Header({ open, setOpen }) {
  function toggleSidebar() {
    setOpen(!open);
  }
  return (
    <div className="h-fit sticky top-0 dark:bg-[#131416] flex items-center z-50 py-2 rounded-lg">
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-[#202124] rounded-md"
      >
        {open ? <PanelRightOpen /> : <PanelLeftOpen />}
      </button>
      <h1 className="text-2xl font-semibold">
        {navItems.filter(filterByPathname)[0].label}
      </h1>
    </div>
  );
}
