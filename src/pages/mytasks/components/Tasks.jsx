import React from "react";
import Task from "./Task";

export default function Tasks({ tasks }) {
  const handleDragStart = (e) =>
    e.dataTransfer.setData("text/plain", e.currentTarget.dataset.id);
  
  function mapToTask(task) {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        label={task.label}
        dueDate={task.dueDate}
        priority={task.priority}
        createdAt={task.createdAt}
        updatedAt={task.updatedAt}
        handleDragStart={handleDragStart}
      />
    );
  }
  return (
    <section className="h-[730px] overflow-y-auto">
      {tasks.map(mapToTask)}
    </section>
  );
}
