import React from "react";

interface TransformerCommandsProps {
  nodeData: any;
  nodeId: string;
  onUpdateNode: (nodeId: string, newData: any) => void;
  mode: "edit" | "command";
}

export const TransformerCommands: React.FC<TransformerCommandsProps> = ({
  nodeData,
  nodeId,
  onUpdateNode,
  mode,
}) => {
  return (
    <div className="space-y-2">
      <button
        onClick={() => {
          onUpdateNode(nodeId, {
            ...nodeData,
            status: "active",
          });
        }}
        disabled={nodeData.status === "active" || mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          nodeData.status === "active"
            ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
            : mode === "command"
            ? "border-green-500 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 cursor-pointer"
            : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        ⚡ ENERGIZE Transformer
      </button>
      <button
        onClick={() => {
          onUpdateNode(nodeId, {
            ...nodeData,
            status: "inactive",
          });
        }}
        disabled={
          nodeData.status === "inactive" ||
          !nodeData.status ||
          mode !== "command"
        }
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          nodeData.status === "inactive" || !nodeData.status
            ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
            : mode === "command"
            ? "border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer"
            : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        ⚫ DE-ENERGIZE Transformer
      </button>
      <button
        onClick={() => {
          alert("TAP changed UP");
        }}
        disabled={mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          mode === "command"
            ? "border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 cursor-pointer"
            : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        🔼 TAP Change UP
      </button>
      <button
        onClick={() => {
          alert("TAP changed DOWN");
        }}
        disabled={mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          mode === "command"
            ? "border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 cursor-pointer"
            : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        🔽 TAP Change DOWN
      </button>
    </div>
  );
};
