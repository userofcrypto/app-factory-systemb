export function createPlan(intent: string, command: string) {
  return {
    intent,
    project: "factory-generated-app",
    stack: {
      frontend: "nextjs",
      backend: "vercel-functions",
      database: "supabase"
    },
    steps: [
      "create-github-structure",
      "generate-code",
      "setup-database",
      "prepare-deployment"
    ],
    raw: command
  };
}
