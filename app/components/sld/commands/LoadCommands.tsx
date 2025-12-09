import React from "react";
import type { Node } from "reactflow";
import type { LoadNodeData } from "~/types/node-data.types";

interface LoadCommandsProps {
  nodeData: Node<LoadNodeData>;
  nodeId: string;
  onUpdateNode: (nodeId: string, newData: any) => void;
  mode: "edit" | "command";
}

export const LoadCommands: React.FC<LoadCommandsProps> = ({
  nodeData,
  nodeId,
  onUpdateNode,
  mode,
}) => {
  const data = nodeData.data;
  
  return (
    <div className="space-y-2">
      <button
        onClick={() => {
          onUpdateNode(nodeId, {
            ...data,
            status: "active",
          });
        }}
        disabled={data.status === "active" || mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          data.status === "active"
            ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
            : mode === "command"
            ? "border-green-500 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 cursor-pointer"
            : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        🔌 CONNECT Load
      </button>
      <button
        onClick={() => {
          onUpdateNode(nodeId, {
            ...data,
            status: "inactive",
          });
        }}
        disabled={
          data.status === "inactive" ||
          !data.status ||
          mode !== "command"
        }
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          data.status === "inactive" || !data.status
            ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
            : mode === "command"
            ? "border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer"
            : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        ⚡ DISCONNECT Load
      </button>
      <button
        onClick={() => {
          if (data.status === "active") {
            onUpdateNode(nodeId, {
              ...data,
              status: "inactive",
            });
            alert("Load shedding executed - Load disconnected");
          } else {
            alert("Load must be connected to perform shedding");
          }
        }}
        disabled={data.status !== "active" || mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          data.status !== "active" || mode !== "command"
            ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
            : "border-orange-500 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 cursor-pointer"
        }`}
      >
        ⚠️ LOAD Shedding
        {data.status !== "active" && (
          <span className="ml-2 text-[10px]">(Requires Active)</span>
        )}
      </button>
    </div>
  );
};
