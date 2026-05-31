import { usePipelineStore } from "../store/pipelineStore";
import { parsePipeline } from "../api/pipelineApi";

export const SubmitButton = () => {
  const nodes = usePipelineStore((state) => state.nodes);
  const edges = usePipelineStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const result = await parsePipeline({ nodes, edges });

      alert(
        `Pipeline Summary\n\n` +
          `Total Nodes: ${result.num_nodes}\n` +
          `Total Edges: ${result.num_edges}\n` +
          `Is Valid DAG: ${result.is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      alert("Failed to submit pipeline. Please check backend server.");
    }
  };

  return (
   <button
  onClick={handleSubmit}
  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700"
>
  Submit Pipeline
</button>
  );
};