const API_BASE_URL = "http://localhost:8000";

export const parsePipeline = async ({ nodes, edges }) => {
  const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nodes, edges }),
  });

  if (!response.ok) {
    throw new Error("Failed to parse pipeline");
  }

  return response.json();
};