import React, { useContext } from "react";
import { LABELS } from "../../../data/constants";
import LocalStorageContext from "../../../context/LocalStorage";
import { toasterContext } from "../../../context/Toaster";

export default function useDragDrop() {
  const { showToast } = useContext(toasterContext);
  const { tasks, setTasks } = useContext(LocalStorageContext);

  const handleDrop = (e) => {
    const newLabel = e.currentTarget.dataset.label;
    const draggedTaskId = e.dataTransfer.getData("text/plain");

    const mapToUpdatedLabel = (task) =>
      task.id === draggedTaskId ? { ...task, label: newLabel } : task;
    setTasks((prev) => prev.map(mapToUpdatedLabel));

    const findByDraggedTaskId = (task) => task.id === draggedTaskId;
    const task = tasks.find(findByDraggedTaskId);
    showToast(`${task.title} moved to ${LABELS[newLabel].title}`, "success");
  };

  return { handleDrop };
}
