import { useState } from "react";
import { CreateTaskBtn } from "../../../components/ui/Button";
import TaskForm from "../../../components/form/TaskForm";
import LabelForm from "../../../components/form/LabelForm";
import Header from "./Header";
import Tasks from "./Tasks";

export default function TaskList({ label, tasks, handleDrop }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showLabelForm, setShowLabelForm] = useState(false);
  const handleDragOver = (e) => e.preventDefault();
  return (
    <>
      <section
        role="task-list"
        data-label={label.title}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="bg-white dark:bg-[#121316] shrink-0  w-[330px] rounded-lg shadow-lg flex flex-col overflow-hidden"
      >
        <Header openEditForm={setShowLabelForm} {...label} />
        <Tasks tasks={tasks} />
        <CreateTaskBtn label={"+ Create Task"} openTaskForm={setShowTaskForm} />
      </section>

      {/* Pop Up Components */}
      {showTaskForm && (
        <TaskForm
          closeForm={() => setShowTaskForm(false)}
          defaultLabel={label.title}
        />
      )}
      {showLabelForm && (
        <LabelForm
          isEdit={true}
          oldLabel={label}
          closeForm={() => setShowLabelForm(false)}
        />
      )}
    </>
  );
}
