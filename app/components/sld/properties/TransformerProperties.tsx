import React from "react";
import type { TransformerNodeData } from "~/types/node-data.types";

interface TransformerPropertiesProps {
  nodeData: TransformerNodeData;
  nodeId: string;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export const TransformerProperties: React.FC<TransformerPropertiesProps> = ({
  nodeData,
  nodeId,
  isEditMode,
  onUpdateNode,
}) => {
  return (
    <>
      {/* Ratio */}
      <div>
        <label className="block text-[12px] font-medium mb-1">
          Ratio (kV/kV)
        </label>
        <input
          type="text"
          value={nodeData.ratio || ""}
          disabled={!isEditMode}
          onChange={(e) =>
            onUpdateNode(nodeId, {
              ...nodeData,
              ratio: e.target.value,
            })
          }
          className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
            isEditMode
              ? "bg-white dark:bg-gray-800"
              : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
          }`}
        />
      </div>

      {/* Voltage Level */}
      {nodeData.voltageLevel !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-1">
            Voltage Level
          </label>
          <select
            value={nodeData.voltageLevel}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData,
                voltageLevel: e.target.value,
              })
            }
            className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
              isEditMode
                ? "bg-white dark:bg-gray-800"
                : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            }`}
          >
            <option value="20kV">20 kV</option>
            <option value="150kV">150 kV</option>
          </select>
        </div>
      )}

      {/* Capacity */}
      {nodeData.capacity !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-1">
            Capacity (MVA)
          </label>
          <input
            type="text"
            value={nodeData.capacity || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData,
                capacity: e.target.value,
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
