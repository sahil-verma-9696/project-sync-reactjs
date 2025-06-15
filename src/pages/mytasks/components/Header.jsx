import React, { useContext } from "react";
import Menu from "../../../components/utility/Menu";
import { LABELS_COLOR } from "../../../data/constants";
import LocalStorageContext from "../../../context/LocalStorage";

export default function Header({ color, title, id, openEditForm }) {
  const { labels, setLabels } = useContext(LocalStorageContext);

  function deleteList() {
    const newLabels = labels.filter((l) => l.id !== id);
    setLabels(newLabels);
  }
  const handleEditLabel = () => openEditForm(true);
  return (
    <h2 className="dark:text-white text-center py-2 px-4 font-bold flex items-center justify-between">
      <div
        className={`size-4 border-2  ${LABELS_COLOR[color]} rounded-full`}
      ></div>
      <span>{title}</span>
      <Menu
        onDelete={deleteList}
        onEdit={handleEditLabel}
        positionClass="top-8 right-0"
      />
    </h2>
  );
}
