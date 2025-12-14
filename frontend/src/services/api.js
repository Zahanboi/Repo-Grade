export async function analyzeRepo(repoUrl) {
  const API_URL = import.meta.env.VITE_API_URL || "https://repo-grade-backend.onrender.com/api/analyze";
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ repoUrl })
  });

  return res.json();
}
