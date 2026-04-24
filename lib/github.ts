export async function createRepoPlaceholder(name: string) {
  return {
    repo: name,
    status: "placeholder-created",
    note: "GitHub API integration will be added in next phase"
  };
}
