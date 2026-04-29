export function interpretCommand(command: string) {
  const lower = command.toLowerCase();

  if (lower.startsWith("create")) {
    return { intent: "create", raw: command };
  }

  if (lower.startsWith("delete")) {
    return { intent: "delete", raw: command };
  }

  if (lower.startsWith("update")) {
    return { intent: "update", raw: command };
  }

  if (lower.startsWith("read") || lower.startsWith("get")) {
    return { intent: "read", raw: command };
  }

  return { intent: "unknown", raw: command };
}
