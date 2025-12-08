import React from "react";
import type {
  SwitchNodeData,
  CircuitBreakerNodeData,
} from "~/types/node-data.types";

interface SwitchPropertiesProps {
  nodeData: (SwitchNodeData | CircuitBreakerNodeData) & { status?: string };
  nodeId: string;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export const SwitchProperties: React.FC<SwitchPropertiesProps> = ({
  nodeData,
  nodeId,
  isEditMode,
  onUpdateNode,
}) => {
  return (
    <>
      {/* Status */}
      <div>
        <label className="block text-[12px] font-medium mb-2">Status</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              onUpdateNode(nodeId, {
                ...nodeData,
                status: "OPEN",
              })
            }
            disabled={!isEditMode}
            className={`flex-1 px-3 py-2 text-[12px] border rounded ${
              nodeData.status === "OPEN"
                ? "border-red-500 bg-red-500/20 text-red-600 dark:text-red-400"
                : "border-gray-300 dark:border-gray-600"
            } ${
              !isEditMode ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            OPEN
          </button>
          <button
            onClick={() =>
              onUpdateNode(nodeId, {
                ...nodeData,
                status: "CLOSE",
              })
            }
            disabled={!isEditMode}
            className={`flex-1 px-3 py-2 text-[12px] border rounded ${
              nodeData.status === "CLOSE"
                ? "border-green-500 bg-green-500/20 text-green-600 dark:text-green-400"
                : "border-gray-300 dark:border-gray-600"
            } ${
              !isEditMode ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            CLOSE
          </button>
        </div>
      </div>

      {/* Voltage */}
      {nodeData.voltage !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-1">
            Voltage (kV)
          </label>
          <input
            type="text"
            value={nodeData.voltage || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData,
                voltage: e.target.value,
              })
            }
            className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
              isEditMode
                ? "bg-white dark:bg-gray-800"
                : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            }`}
          />
        </div>
      )}

      {/* Current (for circuit breaker) */}
      {"current" in nodeData && nodeData.current !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-1">
            Current (A)
          </label>
          <input
            type="text"
            value={nodeData.current || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData,
                current: e.target.value,
              })
            }
            className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
              isEditMode
                ? "bg-white dark:bg-gray-800"
                : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            }`}
          />
        </div>
      )}
    </>
  );
};
