export function interpretCommand(command: string) {
  const text = command.toLowerCase().trim();

  const firstWord = text.split(" ")[0];

  let intent = "unknown";

  if (firstWord === "create") intent = "create";
  else if (firstWord === "show" || firstWord === "get") intent = "read";
  else if (firstWord === "update") intent = "update";
  else if (firstWord === "delete") intent = "delete";

  return {
    intent,
    raw: command
  };
}
