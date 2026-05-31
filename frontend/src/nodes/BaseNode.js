import { useState } from "react";
import { Handle, Position } from "reactflow";
import { NodeField } from "./NodeField";
import { usePipelineStore } from "../store/pipelineStore";

export const BaseNode = ({ id, data, selected, config }) => {
  const initialValues = {};

  config.fields?.forEach((field) => {
    initialValues[field.name] = data?.[field.name] || field.defaultValue || "";
  });

  const [values, setValues] = useState(initialValues);
  const updateNodeField = usePipelineStore((state) => state.updateNodeField);

  const handleChange = (name, value) => {
  setValues((prev) => ({
    ...prev,
    [name]: value,
  }));

  updateNodeField(id, name, value);
};

  return (
    <div
      className={`min-w-[280px] rounded-2xl border bg-white shadow-lg transition-all ${
        selected
          ? "border-indigo-500 ring-4 ring-indigo-100"
          : "border-slate-200 hover:border-indigo-300"
      }`}
    >
      <div className="rounded-t-2xl border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            {config.icon}
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">{config.title}</h3>
            <p className="text-xs text-slate-500">{config.description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-4 py-4">
        {config.fields?.map((field) => (
          <NodeField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handleChange}
          />
        ))}
      </div>

      {config.inputs?.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="!h-3 !w-3 !border-2 !border-white !bg-indigo-600"
          style={{
            top: `${((index + 1) / (config.inputs.length + 1)) * 100}%`,
          }}
        />
      ))}

      {config.outputs?.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className="!h-3 !w-3 !border-2 !border-white !bg-emerald-500"
          style={{
            top: `${((index + 1) / (config.outputs.length + 1)) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};