export function generateProject(plan: any) {
  return {
    projectName: plan.project,
    structure: {
      frontend: "/pages (Next.js)",
      api: "/pages/api",
      engine: "/engine",
      lib: "/lib",
      config: "/config"
    },
    notes: "This is a scaffold. Full code generation will be added in next phase."
  };
}
