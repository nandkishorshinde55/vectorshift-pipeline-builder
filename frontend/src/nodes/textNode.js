import { useMemo, useState, useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import { usePipelineStore } from "../store/pipelineStore";
import { extractVariables } from "../utils/extractVariables";

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || "");
  const updateNodeInternals = useUpdateNodeInternals();
  const syncTextNodeVariableConnections = usePipelineStore(
    (state) => state.syncTextNodeVariableConnections,
  );

  const nodeWidth = Math.min(Math.max(300, currText.length * 7), 560);

  const textareaHeight = Math.min(
    Math.max(90, currText.split("\n").length * 28 + 60),
    260,
  );

  const variables = useMemo(() => {
    return extractVariables(currText);
  }, [currText]);

  useEffect(() => {
    syncTextNodeVariableConnections(id, variables);
    updateNodeInternals(id);
  }, [id, variables, syncTextNodeVariableConnections, updateNodeInternals]);

  return (
    <div
      style={{
        width: nodeWidth,
      }}
      className={`relative rounded-2xl border bg-white shadow-lg transition-all ${
        selected
          ? "border-indigo-500 ring-4 ring-indigo-100"
          : "border-slate-200 hover:border-indigo-300"
      }`}
    >
      <div className="rounded-t-2xl border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            📝
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Text</h3>
            <p className="text-xs text-slate-500">
              Use variables like {"{{ input }}"}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3 px-4 py-4">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-500">
            Template
          </span>
          <textarea
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            placeholder="{{ input }}"
            className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            style={{
              height: textareaHeight,
            }}
          />
        </label>
        {variables.length > 0 && (
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3">
            <p className="mb-2 text-xs font-bold text-indigo-700">
              Dynamic input handles
            </p>
            <div className="flex flex-wrap gap-2">
              {variables.map((variable) => (
                <span
                  key={variable}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm"
                >
                  {variable}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={variable}
          className="!h-3 !w-3 !border-2 !border-white !bg-indigo-600"
          style={{
            top: `${((index + 1) / (variables.length + 1)) * 100}%`,
          }}
        />
      ))}

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!h-3 !w-3 !border-2 !border-white !bg-emerald-500"
      />
    </div>
  );
};
