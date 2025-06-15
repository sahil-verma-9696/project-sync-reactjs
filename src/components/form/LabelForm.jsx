import React, { useContext, useState } from "react";
import { LABELS_COLOR, LIMIT } from "../../data/constants";
import LocalStorageContext from "../../context/LocalStorage";
import { toasterContext } from "../../context/Toaster";
import { LabelInput } from "../ui/Input";
import { DescriptionInput } from "../ui/TextArea";
import { ColorSelect } from "../ui/Select";
import { AddBtn, CloseBtn } from "../ui/Button";

function capitalizeEachWord(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function LabelForm({ oldLabel, isEdit = false, closeForm }) {
  const [title, setTitle] = useState(isEdit ? oldLabel?.title : "");
  const [description, setDescription] = useState(
    isEdit ? oldLabel?.description : ""
  );
  const [color, setColor] = useState(isEdit ? oldLabel?.color : "red");

  const { setLabels, labels } = useContext(LocalStorageContext);
  const { showToast } = useContext(toasterContext);

  function createLabel() {
    if (title < 3) {
      showToast("At least 3 charater are required", "error");
      throw new Error("At least 3 charater are required");
    }

    const newLabel = {
      id: Date.now(),
      title: capitalizeEachWord(title),
      description,
      color,
    };
    setLabels((prev) => [...prev, newLabel]);
  }

  function updateLabel() {
    function mapToUpdatedLabel(label) {
      if (label.id === oldLabel.id) {
        label.title = title;
        label.description = description;
        label.color = color;
      }
      return label;
    }
    setLabels(labels.map(mapToUpdatedLabel));
  }

  function handleSubmit(e) {
    e.preventDefault();
    isEdit ? updateLabel() : createLabel();
  }

  const handleFormClose = () => closeForm(false);

  return (
    <div
      onClick={handleFormClose}
      className="fixed w-screen h-screen bg-transparent top-0 left-0 flex justify-center items-center "
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="dark:bg-[#262c36] w-fit flex flex-col p-4 rounded-lg gap-2"
      >
        <h2>{capitalizeEachWord(title) || "New Label"}</h2>
        <LabelInput
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          maxLength={LIMIT.LABLE_TITLE}
          minLength={3}
        />
        <span className="text-xs font-thin">{`${title.length}/${LIMIT.LABLE_TITLE}`}</span>

        <ColorSelect
          colors={Object.keys(LABELS_COLOR)}
          onChange={(e) => setColor(e.target.value)}
          defaultValue={color}
        />
        <DescriptionInput
          maxLength={LIMIT.LABLE_DESCRIPTION}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <span className="text-xs font-thin">{`${description.length}/${LIMIT.LABLE_DESCRIPTION}`}</span>

        <div className="flex gap-2 justify-end">
          <AddBtn label={"Save"} />
          <CloseBtn label={"Cancel"} onClick={handleFormClose} />
        </div>
      </form>
    </div>
  );
}
