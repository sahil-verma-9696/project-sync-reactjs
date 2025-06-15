export function dueDateFormater(dueDate) {
  return new Date(dueDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
