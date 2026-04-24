export function generateProject(plan: any) {
  return {
    project: plan.project,
    status: "generated",
    structure: [
      "pages/",
      "engine/",
      "lib/"
    ]
  };
}
