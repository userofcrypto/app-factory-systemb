export function interpretCommand(command: string) {
  return {
    intent: "build",
    raw: command
  };
}
