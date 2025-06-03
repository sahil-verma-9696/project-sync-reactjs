import React, { useContext, useEffect, useRef, useState } from "react";
import Task from "../Task";
import CreateTaskForm from "../form/CreateTaskForm";
import { LABELS, LABELS_COLOR, NEW_LABELS } from "../../data/constants";
import { Edit, Ellipsis, Trash } from "lucide-react";
import LocalStorageContext from "../../context/LocalStorage";
import CreateLabelForm from "../form/CreateLabelForm";

export default function TaskList({
  label,
  tasks,
  handleDrop,
  handleDeleteTask,
  handleDragOver,
}) {
  const [showForm, setShowForm] = useState(false);
  const { labels, setLabels } = useContext(LocalStorageContext);
  const [labelFormState, setLabelFormState] = useState("");

  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.currentTarget.dataset.id);
  }

  function sortByCreatedDate(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  function renderTask(task) {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        label={task.label}
        priority={task.priority}
        createdAt={task.createdAt}
        updatedAt={task.updatedAt}
        handleDeleteTask={handleDeleteTask}
        handleDragStart={handleDragStart}
      />
    );
  }

  function handleFormOpen() {
    setShowForm(true);
  }

  function handleDeleteList() {
    const newLabels = labels.filter((l) => l.id !== label.id);
    setLabels(newLabels);
  }

  function handleEditLabel() {
    setLabelFormState("edit");
  }

  const sortedTasks = [...tasks].sort(sortByCreatedDate);

  return (
    <>
      <section
        role="task-list"
        data-label={label.title}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="bg-white dark:bg-[#121316] shrink-0  w-[330px] rounded-lg shadow-lg flex flex-col overflow-hidden"
      >
        <h2 className="dark:text-white text-center py-2 px-4 font-bold flex items-center justify-between">
          <div
            className={`size-4 border-2  ${
              LABELS_COLOR[label.color]
            } rounded-full`}
          ></div>
          <span>{label.title}</span>
          <Menu onDelete={handleDeleteList} onEdit={handleEditLabel} />
        </h2>
        <div className="h-[730px] overflow-y-auto">
          {sortedTasks.map(renderTask)}
        </div>
        <button
          onClick={handleFormOpen}
          className="dark:text-white py-2 text-center cursor-pointer hover:bg-[#1A1B1E]"
        >
          + Create Task
        </button>
      </section>
      {showForm && (
        <CreateTaskForm setShowForm={setShowForm} defaultLabel={label.title} />
      )}
      {labelFormState === "edit" && (
        <CreateLabelForm
          label={label}
          labelFormState={labelFormState}
          setLabelFormState={setLabelFormState}
        />
      )}
    </>
  );
}

function Menu({ onDelete, onEdit }) {
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
      className="relative select-none w-fit h-fit rounded-lg px-2 hover:bg-[#262c36]"
      ref={menuRef}
    >
      <span
        className="cursor-pointer  "
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <Ellipsis />
      </span>

      {showMenu && (
        <ul className="absolute flex flex-col gap-2 top-12 right-0 bg-white dark:bg-[#1a1b1e] rounded-md shadow-md">
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
