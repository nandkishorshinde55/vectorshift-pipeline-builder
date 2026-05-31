export const nodeConfigs = {
  customInput: {
    title: "Input",
    icon: "📥",
    description: "Accept pipeline input",
    inputs: [],
    outputs: [{ id: "value" }],
    fields: [
      {
        name: "inputName",
        label: "Input Name",
        type: "text",
        defaultValue: "input",
      },
      {
        name: "inputType",
        label: "Input Type",
        type: "select",
        defaultValue: "Text",
        options: ["Text", "File", "Number"],
      },
    ],
  },

  customOutput: {
    title: "Output",
    icon: "📤",
    description: "Return final pipeline output",
    inputs: [{ id: "value" }],
    outputs: [],
    fields: [
      {
        name: "outputName",
        label: "Output Name",
        type: "text",
        defaultValue: "output",
      },
      {
        name: "outputType",
        label: "Output Type",
        type: "select",
        defaultValue: "Text",
        options: ["Text", "Image", "JSON"],
      },
    ],
  },

  llm: {
    title: "LLM",
    icon: "🤖",
    description: "Generate AI response",
    inputs: [{ id: "system" }, { id: "prompt" }],
    outputs: [{ id: "response" }],
    fields: [
      {
        name: "model",
        label: "Model",
        type: "select",
        defaultValue: "GPT-4",
        options: ["GPT-4", "GPT-3.5", "Claude"],
      },
      {
        name: "temperature",
        label: "Temperature",
        type: "text",
        defaultValue: "0.7",
      },
    ],
  },

  vectorQuery: {
    title: "Vector Query",
    icon: "🔍",
    description: "Search knowledge base",
    inputs: [{ id: "query" }],
    outputs: [{ id: "documents" }],
    fields: [
      {
        name: "topK",
        label: "Top K",
        type: "text",
        defaultValue: "5",
      },
      {
        name: "namespace",
        label: "Namespace",
        type: "text",
        defaultValue: "default",
      },
    ],
  },

  dataLoader: {
    title: "Data Loader",
    icon: "📄",
    description: "Load documents",
    inputs: [],
    outputs: [{ id: "document" }],
    fields: [
      {
        name: "source",
        label: "Source",
        type: "select",
        defaultValue: "PDF",
        options: ["PDF", "CSV", "Website", "Google Drive"],
      },
    ],
  },

  condition: {
    title: "Condition",
    icon: "⚖️",
    description: "Branch workflow",
    inputs: [{ id: "input" }],
    outputs: [{ id: "true" }, { id: "false" }],
    fields: [
      {
        name: "condition",
        label: "Condition",
        type: "text",
        defaultValue: "score > 0.8",
      },
    ],
  },

  merge: {
    title: "Merge",
    icon: "🔗",
    description: "Merge two branches",
    inputs: [{ id: "inputA" }, { id: "inputB" }],
    outputs: [{ id: "merged" }],
    fields: [],
  },

  splitText: {
    title: "Split Text",
    icon: "✂️",
    description: "Chunk long text",
    inputs: [{ id: "text" }],
    outputs: [{ id: "chunks" }],
    fields: [
      {
        name: "chunkSize",
        label: "Chunk Size",
        type: "text",
        defaultValue: "1000",
      },
      {
        name: "overlap",
        label: "Overlap",
        type: "text",
        defaultValue: "100",
      },
    ],
  },
};