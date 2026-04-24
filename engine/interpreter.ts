export function interpretCommand(command: string) {
  return {
    intent: command.toLowerCase().includes("build") ? "build" : "unknown",
    raw: command
  };
}
