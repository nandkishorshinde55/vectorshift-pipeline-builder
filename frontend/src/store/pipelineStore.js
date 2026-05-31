import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const usePipelineStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const nodeIDs = { ...get().nodeIDs };

    if (!nodeIDs[type]) {
      nodeIDs[type] = 0;
    }

    nodeIDs[type] += 1;

    set({ nodeIDs });

    return `${type}-${nodeIDs[type]}`;
  },

  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  updateNodeField: (nodeId, fieldName, value) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                [fieldName]: value,
              },
            }
          : node
      ),
    }));
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        state.edges
      ),
    }));
  },

  syncTextNodeVariableConnections: (textNodeId, variables) => {
    set((state) => {
      const validVariables = new Set(variables);

      const cleanedEdges = state.edges.filter((edge) => {
        const isAutoTextEdge =
          edge.target === textNodeId && edge.data?.autoCreated === true;

        if (!isAutoTextEdge) return true;

        return validVariables.has(edge.targetHandle);
      });

      const newEdges = [...cleanedEdges];

      variables.forEach((variableName) => {
        const matchingInputNode = state.nodes.find(
          (node) =>
            node.type === "customInput" &&
            node.data?.inputName === variableName
        );

        if (!matchingInputNode) return;

        const edgeExists = newEdges.some(
          (edge) =>
            edge.source === matchingInputNode.id &&
            edge.target === textNodeId &&
            edge.targetHandle === variableName
        );

        if (edgeExists) return;

        newEdges.push({
          id: `${matchingInputNode.id}-${textNodeId}-${variableName}`,
          source: matchingInputNode.id,
          sourceHandle: "value",
          target: textNodeId,
          targetHandle: variableName,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          data: {
            autoCreated: true,
          },
        });
      });

      return {
        edges: newEdges,
      };
    });
  },
}));