export function interpretCommand(command: string) {
  const raw = command.toLowerCase().trim();

  if (raw.startsWith("create")) {
    return { intent: "create", raw: command };
  }

  if (raw.startsWith("read") || raw === "list") {
    return { intent: "read", raw: command };
  }

  if (raw.startsWith("delete") || raw.startsWith("remove")) {
    return { intent: "delete", raw: command };
  }

  if (raw.startsWith("update") || raw.startsWith("edit")) {
    return { intent: "update", raw: command };
  }

  return { intent: "unknown", raw: command };
}
