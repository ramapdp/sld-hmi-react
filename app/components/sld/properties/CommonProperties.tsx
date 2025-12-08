import React from "react";
import type { Node, Edge } from "reactflow";

interface CommonPropertiesProps {
  node: Node;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
  edges: Edge[];
  nodes: Node[];
}

export const CommonProperties: React.FC<CommonPropertiesProps> = ({
  node,
  isEditMode,
  onUpdateNode,
  edges,
  nodes,
}) => {
  const nodeData = node.data;

  return (
    <>
      {/* Node Type - Read Only */}
      <div>
        <label className="block text-[12px] font-medium mb-1">Type</label>
        <input
          type="text"
          value={node.type || "unknown"}
          disabled
          className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
        />
      </div>

      {/* Node ID - Read Only */}
      <div>
        <label className="block text-[12px] font-medium mb-1">ID</label>
        <input
          type="text"
          value={node.id}
          disabled
          className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
        />
      </div>

      {/* Label - Common for all nodes */}
      <div>
        <label className="block text-[12px] font-medium mb-1">Label</label>
        <input
          type="text"
          value={nodeData.label || ""}
          disabled={!isEditMode}
          onChange={(e) =>
            onUpdateNode(node.id, {
              ...nodeData,
              label: e.target.value,
            })
          }
          className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
            isEditMode
              ? "bg-white dark:bg-gray-800"
              : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
          }`}
        />
      </div>

      {/* Position - Read Only */}
      <div>
        <label className="block text-[12px] font-medium mb-2">Position</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-gray-500 mb-1">X</label>
            <input
              type="number"
              value={Math.round(node.position.x)}
              disabled
              className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 mb-1">Y</label>
            <input
              type="number"
              value={Math.round(node.position.y)}
              disabled
              className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Connections - Always Read Only */}
      <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
        <label className="block text-[12px] font-medium mb-2">
          Connections
        </label>
        <div className="space-y-2">
          {edges
            .filter((e) => e.source === node.id || e.target === node.id)
            .map((edge) => {
              const isSource = edge.source === node.id;
              const connectedNodeId = isSource ? edge.target : edge.source;
              const connectedNode = nodes.find((n) => n.id === connectedNodeId);

              return (
                <div
                  key={edge.id}
                  className="text-[12px] p-2 bg-gray-100 dark:bg-gray-800 rounded"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      {isSource ? "→" : "←"}
                    </span>
                    <span>{connectedNode?.data?.label || connectedNodeId}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    Type: {connectedNode?.type || "unknown"}
                  </div>
                </div>
              );
            })}
          {edges.filter((e) => e.source === node.id || e.target === node.id)
            .length === 0 && (
            <div className="text-[12px] text-gray-500 dark:text-gray-400">
              No connections
            </div>
          )}
        </div>
      </div>
    </>
  );
};
