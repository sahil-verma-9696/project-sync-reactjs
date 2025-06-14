import React, { useContext, useRef, useState } from "react";
import { DateInput, TitleInput } from "../ui/Input";
import { DescriptionInput } from "../ui/TextArea";
import { LabelSelect } from "../ui/Select";
import { AddBtn, CloseBtn } from "../ui/Button";
import { LIMIT } from "../../data/constants";
import LocalStorageContext from "../../context/LocalStorage";
import { toasterContext } from "../../context/Toaster";

function isValidDueDate(dueDate) {
  if (!dueDate) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day

  const inputDate = new Date(dueDate);
  inputDate.setHours(0, 0, 0, 0); // Ignore time, compare only date

  return inputDate >= today;
}

export default function TaskForm({
  closeForm,
  defaultLabel,
  isEdit = false,
  oldTask,
}) {
  const { showToast } = useContext(toasterContext);
  const { labels, tasks, setTasks } = useContext(LocalStorageContext);

  const [title, setTitle] = useState(isEdit ? oldTask.title : "");
  const [dueDate, setDueDate] = useState(isEdit ? oldTask.dueDate : "");
  const [description, setDescription] = useState(
    isEdit ? oldTask.description : ""
  );
  const [label, setLabel] = useState(isEdit ? oldTask.label : defaultLabel);

  function validateTask(task) {
    switch (true) {
      case task.title.length === 0:
        showToast("Title is required", "error");
        return false;

      case task.title.length > LIMIT.title:
        showToast("Title must be less than 100 characters", "error");
        return false;

      case task.description.length > LIMIT.description:
        showToast("Description must be less than 200 characters", "error");
        return false;

      case !isValidDueDate(task.dueDate):
        showToast("Select a valid date", "error");
        return false;

      default:
        return true;
    }
  }

  function createTask() {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const task = {
      id: `task-${new Date().getTime()}`,
      title,
      description: description || "no description found",
      label,
      dueDate: dueDate ? new Date(dueDate).toISOString() : dueDate, // ⬅️ formatted
      createdAt,
      updatedAt,
    };

    if (!validateTask(task)) throw new Error("validation fail");

    setTasks((prevTasks) => [...prevTasks, task]);
    showToast(`${title} added successfully`);
    console.log(task);
  }

  function editTask() {
    const modifiedTask = {
      title,
      description,
      label,
      dueDate,
    };

    if (!validateTask(modifiedTask)) {
      showToast(`Task validation failed`, "error");
      throw new Error(`Task validation failed`);
    }

    function mapToModifiedTask(task) {
      if (task.id === oldTask.id) {
        (task.title = modifiedTask.title),
          (task.description = modifiedTask.description),
          (task.label = modifiedTask.label),
          (task.dueDate = modifiedTask.dueDate);
      }
      return task;
    }
    setTasks(tasks.map(mapToModifiedTask));
    showToast("task updated");
  }

  function handleSubmit(e) {
    e.preventDefault();
    isEdit ? editTask() : createTask();
  }

  return (
    <div
      onClick={closeForm}
      className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-[#121316] dark:text-white p-6 rounded-xl shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-2 text-center">
          {isEdit ? "Update Task" : "Create Task"}
        </h2>

        <div className="flex flex-col gap-2">
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={LIMIT.title}
          />
          <span className="text-sm opacity-45">{`${title.length}/${LIMIT.title}`}</span>
          <DateInput
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <LabelSelect
            onChange={(e) => setLabel(e.target.value)}
            value={label}
            labels={labels}
            defaultValue={defaultLabel}
          />
          <DescriptionInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={LIMIT.description}
          />
          <span className="text-sm opacity-45">{`${description.length}/${LIMIT.description}`}</span>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <CloseBtn label="Close" onClick={closeForm} />
          <AddBtn label="Save" />
        </div>
      </form>
    </div>
  );
}
