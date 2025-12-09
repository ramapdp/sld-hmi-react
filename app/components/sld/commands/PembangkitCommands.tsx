import React, { memo } from "react";
import type { Node } from "reactflow";
import type { PembangkitNodeData } from "~/types/node-data.types";

interface PembangkitCommandsProps {
  nodeData: Node<PembangkitNodeData>;
  nodeId: string;
  onUpdateNode: (nodeId: string, newData: any) => void;
  mode: "edit" | "command";
}

export const PembangkitCommands: React.FC<PembangkitCommandsProps> = memo(({
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
        ▶ START Generator
        {data.status === "active" && (
          <span className="ml-2 text-[10px]">(Running)</span>
        )}
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
        ⏹ STOP Generator
        {(data.status === "inactive" || !data.status) && (
          <span className="ml-2 text-[10px]">(Stopped)</span>
        )}
      </button>
      <button
        onClick={() => {
          if (data.status === "active") {
            alert("Syncing generator to grid...");
          } else {
            alert("Generator must be running to sync to grid");
          }
        }}
        disabled={data.status !== "active" || mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          data.status !== "active" || mode !== "command"
            ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
            : "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 cursor-pointer"
        }`}
      >
        ⚡ SYNC to Grid
        {data.status !== "active" && (
          <span className="ml-2 text-[10px]">(Requires Active)</span>
        )}
      </button>

      {/* Current Status Display */}
      <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-600">
        <div className="text-[10px] text-gray-400 mb-1">Current Status</div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              data.status === "active"
                ? "bg-green-500 animate-pulse"
                : "bg-gray-500"
            }`}
          />
          <span className="text-[12px]">
            {data.status === "active" ? "Running" : "Stopped"}
          </span>
        </div>
        {data.power && (
          <div className="text-[10px] text-gray-400 mt-2">
            Power: {data.power} MW
          </div>
        )}
        {data.voltage && (
          <div className="text-[10px] text-gray-400">
            Voltage: {data.voltage} kV
          </div>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Hanya re-render jika status, mode, atau data penting berubah
  return (
    prevProps.nodeId === nextProps.nodeId &&
    prevProps.mode === nextProps.mode &&
    prevProps.nodeData.data.status === nextProps.nodeData.data.status &&
    prevProps.nodeData.data.power === nextProps.nodeData.data.power &&
    prevProps.nodeData.data.voltage === nextProps.nodeData.data.voltage
  );
});

PembangkitCommands.displayName = 'PembangkitCommands';
