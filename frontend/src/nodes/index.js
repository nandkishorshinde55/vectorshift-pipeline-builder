import { BaseNode } from "./BaseNode";
import { TextNode } from "./textNode";
import { nodeConfigs } from "./nodeConfigs";

const createConfigNode = (type) => {
  return (props) => <BaseNode {...props} config={nodeConfigs[type]} />;
};

export const nodeTypes = {
  customInput: createConfigNode("customInput"),
  customOutput: createConfigNode("customOutput"),
  llm: createConfigNode("llm"),
  text: TextNode,
  vectorQuery: createConfigNode("vectorQuery"),
  dataLoader: createConfigNode("dataLoader"),
  condition: createConfigNode("condition"),
  merge: createConfigNode("merge"),
  splitText: createConfigNode("splitText"),
};
