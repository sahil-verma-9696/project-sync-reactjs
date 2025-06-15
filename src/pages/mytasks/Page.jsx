import React, { useContext, useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import LabelForm from "../../components/form/LabelForm";
import LocalStorageContext from "../../context/LocalStorage";
import { filterTasksByLabel } from "../../utils/filters";
import { AddNewLabelBtn } from "../../components/ui/Button";
import useDragDrop from "./hooks/useDragDrop";

export default function Page() {
  const { labels, tasks } = useContext(LocalStorageContext);
  const [showLabelForm, setShowLabelForm] = useState(false);
  const { handleDrop } = useDragDrop();

  const [title, setTitle] = useState("");

  function mapToTaskList(label) {
    const tasksByLabel = filterTasksByLabel(tasks, label.title);
    const filterByInputTitle = (task) => task.title.startsWith(title.trim());

    return (
      <TaskList
        key={label.id}
        label={label}
        tasks={tasksByLabel.filter(filterByInputTitle)}
        handleDrop={handleDrop}
      />
    );
  }

  useEffect(() => {
    console.log(title);
  }, [title]);
  return (
    <div>
      <section>
        <input
          className="m-1 p-1 rounded-lg px-2 dark:bg-[#131416]"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Search by title"
        />
      </section>
      <section className="flex gap-2 w-[1456px] overflow-auto ">
        {labels.map(mapToTaskList)}
        <AddNewLabelBtn openLabelForm={setShowLabelForm} />
        {showLabelForm && <LabelForm closeForm={setShowLabelForm} />}
      </section>
    </div>
  );
}
