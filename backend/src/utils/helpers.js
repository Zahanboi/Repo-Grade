export function parseRepoUrl(url) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname !== "github.com") {
      throw new Error("Not a GitHub URL");
    }

    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts.length !== 2) {
      throw new Error("Invalid GitHub repository format");
    }

    return {
      owner: parts[0],
      repo: parts[1]
    };
  } catch {
    throw new Error("Invalid GitHub repository URL");
  }
}
