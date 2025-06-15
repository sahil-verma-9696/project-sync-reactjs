export function filterTasksByLabel(tasks, label) {
  const filterByLabel = (task) => task.label === label;
  return tasks.filter(filterByLabel);
}