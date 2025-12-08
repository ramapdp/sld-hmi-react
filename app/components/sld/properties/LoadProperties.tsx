import React from "react";
import type { LoadNodeData } from "~/types/node-data.types";

interface LoadPropertiesProps {
  nodeData: LoadNodeData;
  nodeId: string;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export const LoadProperties: React.FC<LoadPropertiesProps> = ({
  nodeData,
  nodeId,
  isEditMode,
  onUpdateNode,
}) => {
  return (
    <>
      {/* Power */}
      {nodeData.power !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-1">
            Power (MW)
          </label>
          <input
            type="text"
            value={nodeData.power || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData,
                power: e.target.value,
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
    </>
  );
};
