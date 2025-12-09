import React, { memo } from "react";
import type { Node } from "reactflow";
import type { LoadNodeData } from "~/types/node-data.types";

interface LoadPropertiesProps {
  nodeData: Node<LoadNodeData>;
  nodeId: string;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export const LoadProperties: React.FC<LoadPropertiesProps> = memo(
  ({ nodeData, nodeId, isEditMode, onUpdateNode }) => {
    return (
      <>
        {/* Power */}
        {nodeData.data.power !== undefined && (
          <div>
            <label className="block text-[12px] font-medium mb-1">
              Power (MW)
            </label>
            <input
              type="text"
              value={nodeData.data.power || ""}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData.data,
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
      {nodeData.data.voltage !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-1">
            Voltage (kV)
          </label>
          <input
            type="text"
            value={nodeData.data.voltage || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData.data,
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
  },
  (prevProps, nextProps) => {
    return (
      prevProps.nodeId === nextProps.nodeId &&
      prevProps.isEditMode === nextProps.isEditMode &&
      prevProps.nodeData.data.power === nextProps.nodeData.data.power &&
      prevProps.nodeData.data.voltage === nextProps.nodeData.data.voltage
    );
  }
);

LoadProperties.displayName = "LoadProperties";
