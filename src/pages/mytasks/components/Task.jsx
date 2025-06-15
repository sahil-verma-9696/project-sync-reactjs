import React, { useContext, useState } from "react";
import Menu from "../../../components/utility/Menu";
import LocalStorageContext from "../../../context/LocalStorage";
import { toasterContext } from "../../../context/Toaster";
import TaskForm from "../../../components/form/TaskForm";
import { Clock } from "lucide-react";
import { dueDateFormater } from "../../../utils/formaters";

function getOverDue(dueDate) {
  if (!dueDate) return null;

  const due = new Date(dueDate);
  const today = new Date();

  // Normalize to ignore time
  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInMs = today - due;
  const daysOverdue = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return daysOverdue > 0 ? daysOverdue : null;
}

export default function Task({
  id,
  title,
  description,
  label,
  dueDate,
  handleDragStart,
}) {
  const { setTasks } = useContext(LocalStorageContext);
  const { showToast } = useContext(toasterContext);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const deleteTask = (id) => {
    const filterByCurrentTaskId = (task) => task.id !== id;
    setTasks((prev) => prev.filter(filterByCurrentTaskId));
    showToast("Task deleted successfully", "success");
  };

  const daysOverdue = getOverDue(dueDate);

  return (
    <>
      <div
        data-id={id}
        draggable
        onDragStart={handleDragStart}
        className="group relative justify-between items-center flex cursor-grab select-none m-2 bg-white dark:bg-[#0F0F0F] rounded-md p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border dark:border-[#2B2B2B]"
      >
        <div>
          <h2 className="text-xl  text-gray-800 dark:text-white">{title}</h2>
          <p className="text-sm text-gray-600 font-thin dark:text-gray-300 mt-1">
            {description}
          </p>
        </div>
        <span className="absolute top-0 right-0">
          <Menu
            data-id={id}
            onDelete={() => deleteTask(id)}
            onEdit={() => setShowTaskForm(true)}
          />
        </span>
        <div className="flex flex-col">
          <span className="italic font-extralight text-xs flex gap-2 items-center text-gray-500 dark:text-gray-400 mt-2">
            <Clock size={14} />
            {dueDate ? dueDateFormater(dueDate) : "No due date"}
          </span>
          <span className="italic font-extralight text-xs flex gap-2 items-center text-yellow-500 dark:text-yellow-400 mt-2">
            {daysOverdue &&
              `⚠️ ${daysOverdue} day${daysOverdue > 1 ? "s" : ""} overdue`}
          </span>
        </div>
      </div>
      {/* Popup Components */}
      {showTaskForm && (
        <TaskForm
          isEdit={true}
          oldTask={{ id, title, description, label, dueDate }}
          closeForm={() => setShowTaskForm(false)}
        />
      )}
    </>
  );
}
