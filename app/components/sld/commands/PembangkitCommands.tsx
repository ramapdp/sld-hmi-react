import React, { memo } from "react";

interface PembangkitCommandsProps {
  nodeData: any;
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
        ▶ START Generator
        {nodeData.status === "active" && (
          <span className="ml-2 text-[10px]">(Running)</span>
        )}
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
        ⏹ STOP Generator
        {(nodeData.status === "inactive" || !nodeData.status) && (
          <span className="ml-2 text-[10px]">(Stopped)</span>
        )}
      </button>
      <button
        onClick={() => {
          if (nodeData.status === "active") {
            alert("Syncing generator to grid...");
          } else {
            alert("Generator must be running to sync to grid");
          }
        }}
        disabled={nodeData.status !== "active" || mode !== "command"}
        className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
          nodeData.status !== "active" || mode !== "command"
            ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
            : "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 cursor-pointer"
        }`}
      >
        ⚡ SYNC to Grid
        {nodeData.status !== "active" && (
          <span className="ml-2 text-[10px]">(Requires Active)</span>
        )}
      </button>

      {/* Current Status Display */}
      <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-600">
        <div className="text-[10px] text-gray-400 mb-1">Current Status</div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              nodeData.status === "active"
                ? "bg-green-500 animate-pulse"
                : "bg-gray-500"
            }`}
          />
          <span className="text-[12px]">
            {nodeData.status === "active" ? "Running" : "Stopped"}
          </span>
        </div>
        {nodeData.power && (
          <div className="text-[10px] text-gray-400 mt-2">
            Power: {nodeData.power} MW
          </div>
        )}
        {nodeData.voltage && (
          <div className="text-[10px] text-gray-400">
            Voltage: {nodeData.voltage} kV
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
    prevProps.nodeData.status === nextProps.nodeData.status &&
    prevProps.nodeData.power === nextProps.nodeData.power &&
    prevProps.nodeData.voltage === nextProps.nodeData.voltage
  );
});

PembangkitCommands.displayName = 'PembangkitCommands';
