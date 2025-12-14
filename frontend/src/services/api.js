export async function analyzeRepo(repoUrl) {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/analyze";

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repoUrl })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Analysis failed");
  }

  return data;
}
