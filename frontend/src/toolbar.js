import { TOOLBAR_NODE_GROUPS } from "./constants/nodeTypes";
import { DraggableNode } from "./draggableNode";



export const PipelineToolbar = () => {
  return (
    <aside className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Node Library
        </h2>
      </div>

      <div className="flex flex-wrap gap-6">
        {Object.entries(TOOLBAR_NODE_GROUPS).map(([groupName, nodes]) => (
          <div key={groupName}>
            <p className="mb-2 text-xs font-bold uppercase text-slate-400">
              {groupName}
            </p>

            <div className="flex flex-wrap gap-3">
              {nodes.map((node) => (
                <DraggableNode
                  key={node.type}
                  type={node.type}
                  label={node.label}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
