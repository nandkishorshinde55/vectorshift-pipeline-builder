export const TOOLBAR_NODE_GROUPS = {
  Core: [
    { type: "customInput", label: "Input", icon: "📥" },
    { type: "text", label: "Text", icon: "📝" },
    { type: "customOutput", label: "Output", icon: "📤" },
  ],
  AI: [
    { type: "llm", label: "LLM", icon: "🤖" }
  ],
  Knowledge: [
    { type: "dataLoader", label: "Data Loader", icon: "📄" },
    { type: "vectorQuery", label: "Vector Query", icon: "🔍" },
  ],
  Logic: [
    { type: "condition", label: "Condition", icon: "⚖️" },
    { type: "merge", label: "Merge", icon: "🔗" },
    { type: "splitText", label: "Split Text", icon: "✂️" },
  ],
};