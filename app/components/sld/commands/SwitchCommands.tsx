import React from "react";
import type { Node } from "reactflow";
import type { SwitchNodeData, CircuitBreakerNodeData } from "~/types/node-data.types";

interface SwitchCommandsProps {
  nodeData: Node<SwitchNodeData | CircuitBreakerNodeData>;
  nodeId: string;
  onUpdateNode: (nodeId: string, newData: any) => void;
  mode: "edit" | "command";
}

export const SwitchCommands: React.FC<SwitchCommandsProps> = ({
  nodeData,
  nodeId,
  onUpdateNode,
  mode,
}) => {
  const data = nodeData.data;
  // Handle both 'status' and 'position' fields
  const statusField = (data as any).status !== undefined ? "status" : "position";
  const currentStatus = (data as any)[statusField];
  
  return (
    <div className="space-y-2">
      <button
        onClick={() => {
          onUpdateNode(nodeId, {
            ...data,
            [statusField]: "CLOSE",
          });
        }}
        disabled={currentStatus === "CLOSE" || mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          currentStatus === "CLOSE"
            ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
            : mode === "command"
            ? "border-green-500 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 cursor-pointer"
            : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        🔒 CLOSE Switch
        {currentStatus === "CLOSE" && (
          <span className="ml-2 text-[10px]">(Closed)</span>
        )}
      </button>
      <button
        onClick={() => {
          onUpdateNode(nodeId, {
            ...data,
            [statusField]: "OPEN",
          });
        }}
        disabled={currentStatus === "OPEN" || mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          currentStatus === "OPEN"
            ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
            : mode === "command"
            ? "border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer"
            : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        🔓 OPEN Switch
        {currentStatus === "OPEN" && (
          <span className="ml-2 text-[10px]">(Opened)</span>
        )}
      </button>
      <button
        onClick={() => {
          alert("Protection reset command sent");
        }}
        disabled={mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          mode === "command"
            ? "border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 cursor-pointer"
            : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
        }`}
      >
        🔄 RESET Protection
      </button>

      {/* Current Status Display */}
      <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-600">
        <div className="text-[10px] text-gray-400 mb-1">Current Status</div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              currentStatus === "CLOSE" ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
          <span className="text-[12px]">
            {currentStatus === "CLOSE" ? "Closed" : "Open"}
          </span>
        </div>
        {data.voltage && (
          <div className="text-[10px] text-gray-400 mt-2">
            Voltage: {data.voltage} kV
          </div>
        )}
        {(data as CircuitBreakerNodeData).current && (
          <div className="text-[10px] text-gray-400">
            Current: {(data as CircuitBreakerNodeData).current} A
          </div>
        )}
      </div>
    </div>
  );
};
