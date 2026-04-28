export type Intent =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "unknown";

export function interpretCommand(command: string): {
  intent: Intent;
  raw: string;
} {
  const text = command.toLowerCase().trim();

  const firstWord = text.split(" ")[0];

  let intent: Intent = "unknown";

  if (firstWord === "create") intent = "create";
  else if (firstWord === "show" || firstWord === "get") intent = "read";
  else if (firstWord === "update") intent = "update";
  else if (firstWord === "delete") intent = "delete";

  return {
    intent,
    raw: command
  };
}
