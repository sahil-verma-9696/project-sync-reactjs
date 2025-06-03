import React, { useContext, useState } from "react";
import { LABELS, LABELS_COLOR, NEW_LABELS } from "../data/constants";
import TaskList from "../components/layout/TaskList";
import { taskContext } from "../context/Task";
import { toasterContext } from "../context/Toaster";
import { Plus } from "lucide-react";
import CreateLabelForm from "../components/form/CreateLabelForm";
import LocalStorageContext from "../context/LocalStorage";

export default function MyTasks() {
  const { showToast } = useContext(toasterContext);
  const { labels, tasks, setTasks } = useContext(LocalStorageContext);

  console.log(tasks);

  const [labelFormState, setLabelFormState] = useState("");

  const handleDrop = (e) => {
    const newLabel = e.currentTarget.dataset.label;
    const draggedTaskId = e.dataTransfer.getData("text/plain");

    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggedTaskId ? { ...task, label: newLabel } : task
      )
    );
    const task = tasks.find((task) => task.id === draggedTaskId);
    showToast(`${task.title} moved to ${LABELS[newLabel].title}`, "success");
  };

  const handleDeleteTask = (e) => {
    const taskId = e.currentTarget.dataset.id;
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    showToast("Task deleted successfully", "success");
  };

  function handleDragOver(e) {
    e.preventDefault();
  }

  function labelFilter(label) {
    return tasks.filter((task) => task.label === label);
  }

  function renderTaskList(label) {
    return (
      <TaskList
        key={label.id}
        label={label}
        tasks={labelFilter(label.title)}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleDeleteTask={handleDeleteTask}
        labelFormState={labelFormState}
        setLabelFormState={setLabelFormState}
      />
    );
  }

  return (
    <div className="flex gap-2 w-[1456px] h-[760px] overflow-auto ">
      {labels.map(renderTaskList)}
      <span
        onClick={() => setLabelFormState("new")}
        className="dark:bg-[#262c36] h-fit p-2 rounded-lg cursor-pointer"
      >
        <Plus />
      </span>

      {labelFormState == "new" && (
        <CreateLabelForm
          labelFormState={labelFormState}
          setLabelFormState={setLabelFormState}
        />
      )}
    </div>
  );
}
