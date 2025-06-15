import { Edit, Ellipsis, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Menu({ onDelete, onEdit, ...props }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      {...props}
      className="relative select-none w-fit h-fit rounded-lg px-2 hover:bg-[#262c36]"
      ref={menuRef}
    >
      <span
        className="cursor-pointer "
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <Ellipsis />
      </span>

      {showMenu && (
        <ul
          className={`absolute flex flex-col gap-2 bg-white dark:bg-[#1a1b1e] rounded-md shadow-md z-10 top-6 right-0`}
        >
          <button
            className="text-red-500 rounded-md flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2e]"
            onClick={() => {
              onDelete?.();
              setShowMenu(false);
            }}
          >
            <Trash size={16} />
            <span className="text-sm">Delete</span>
          </button>
          <button
            className="text-indigo-500 rounded-md flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2e]"
            onClick={() => {
              onEdit?.();
              setShowMenu(false);
            }}
          >
            <Edit size={16} />
            <span className="text-sm">Edit</span>
          </button>
        </ul>
      )}
    </div>
  );
}
