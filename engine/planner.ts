export function createPlan(intent: string, command: string) {
  return {
    intent,
    project: "factory-app",
    stack: {
      frontend: "nextjs",
      backend: "vercel",
      database: "supabase"
    },
    raw: command
  };
}
