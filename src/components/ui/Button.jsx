import { Plus } from "lucide-react";

export function CreateTaskBtn({ label, openTaskForm, ...props }) {
  const handleClick = () => openTaskForm(true);
  return (
    <button
      onClick={handleClick}
      {...props}
      className="dark:text-white py-2 text-center cursor-pointer hover:bg-[#1A1B1E]"
    >
      {label}
    </button>
  );
}

export function AddBtn({ label, ...props }) {
  return (
    <button
      className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {label}
    </button>
  );
}

export function CloseBtn({ label, ...props }) {
  return (
    <button
      type="button"
      className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition duration-200"
      {...props}
    >
      {label}
    </button>
  );
}
export function AddNewLabelBtn({ openLabelForm }) {
  const handleClick = () => openLabelForm(true);
  return (
    <button
      onClick={handleClick}
      className="dark:bg-[#262c36] h-fit p-2 rounded-lg cursor-pointer"
    >
      <Plus />
    </button>
  );
}
