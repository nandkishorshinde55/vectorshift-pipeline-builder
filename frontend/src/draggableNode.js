// draggableNode.js

const nodeIconMap = {
  customInput: "📥",
  text: "📝",
  llm: "🤖",
  customOutput: "📤",
  dataLoader: "📄",
  vectorQuery: "🔍",
  condition: "⚖️",
  merge: "🔗",
  splitText: "✂️",
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };

    event.currentTarget.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = "grab";
      }}
      className="
        group flex min-h-[58px] min-w-[110px] max-w-[180px] cursor-grab
        select-none items-center gap-3 rounded-xl border border-slate-200
        bg-white px-3 py-2 shadow-sm transition-all duration-200
        hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50
        hover:shadow-md active:scale-95
      "
    >
      <div
        className="
          flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
          bg-gradient-to-br from-indigo-600 to-violet-600 text-base text-white
          shadow-sm
        "
      >
        {nodeIconMap[type] || "⚙️"}
      </div>

      <span
        className="
          break-words text-left text-sm font-semibold leading-snug
          text-slate-700 group-hover:text-indigo-700
        "
      >
        {label}
      </span>
    </div>
  );
};
