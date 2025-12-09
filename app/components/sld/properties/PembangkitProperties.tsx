import React, { memo } from "react";
import type { Node } from "reactflow";
import type { PembangkitNodeData } from "~/types/node-data.types";

interface PembangkitPropertiesProps {
  nodeData: Node<PembangkitNodeData>;
  nodeId: string;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export const PembangkitProperties: React.FC<PembangkitPropertiesProps> = memo(
  ({ nodeData, nodeId, isEditMode, onUpdateNode }) => {
    return (
      <>
        {/* Status - Read Only */}
        <div>
          <label className="block text-[12px] font-medium mb-2">Status</label>
          <input
            type="text"
            value={nodeData.data.status || "inactive"}
            disabled={true}
            className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
          />
        </div>

        {/* Power */}
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

        {/* Voltage */}
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

        {/* Size - from node root level, not from data */}
        {(nodeData.width !== undefined || nodeData.height !== undefined) && (
          <div>
            <label className="block text-[12px] font-medium mb-2">Size</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-gray-500 mb-1">
                  Width
                </label>
                <input
                  type="number"
                  value={nodeData.width || 60}
                  disabled={!isEditMode}
                  onChange={(e) => {
                    const newWidth = parseInt(e.target.value) || 60;
                    // Update node size at root level
                    onUpdateNode(nodeId, {
                      ...nodeData.data,
                      __nodeSize: { width: newWidth, height: nodeData.height || 60 }
                    });
                  }}
                  className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
                    isEditMode
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 mb-1">
                  Height
                </label>
                <input
                  type="number"
                  value={nodeData.height || 60}
                  disabled={!isEditMode}
                  onChange={(e) => {
                    const newHeight = parseInt(e.target.value) || 60;
                    // Update node size at root level
                    onUpdateNode(nodeId, {
                      ...nodeData.data,
                      __nodeSize: { width: nodeData.width || 60, height: newHeight }
                    });
                  }}
                  className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
                    isEditMode
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Color Configuration */}
        <div className="flex flex-col border-t border-gray-300 dark:border-gray-600 gap-2 pt-3">
          <label className="block text-[12px] font-medium">
            Color Configuration
          </label>

          {/* Active Color */}
          <div>
            <label className="block text-[10px] text-gray-500 mb-1">
              Active Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={nodeData.data.colorConfig?.active || "#00ff00"}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData.data,
                    colorConfig: {
                      ...nodeData.data.colorConfig,
                      active: e.target.value,
                      inactive: nodeData.data.colorConfig?.inactive || "#808080",
                    },
                  })
                }
                className={`w-16 h-10 border border-gray-300 dark:border-gray-600 rounded ${
                  isEditMode
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
              />
              <input
                type="text"
                value={nodeData.data.colorConfig?.active || "#00ff00"}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData.data,
                    colorConfig: {
                      ...nodeData.data.colorConfig,
                      active: e.target.value,
                      inactive: nodeData.data.colorConfig?.inactive || "#808080",
                    },
                  })
                }
                className={`flex-1 px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
                  isEditMode
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          {/* Inactive Color */}
          <div>
            <label className="block text-[10px] text-gray-500 mb-1">
              Inactive Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={nodeData.data.colorConfig?.inactive || "#808080"}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData.data,
                    colorConfig: {
                      ...nodeData.data.colorConfig,
                      active: nodeData.data.colorConfig?.active || "#00ff00",
                      inactive: e.target.value,
                    },
                  })
                }
                className={`w-16 h-10 border border-gray-300 dark:border-gray-600 rounded ${
                  isEditMode
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
              />
              <input
                type="text"
                value={nodeData.data.colorConfig?.inactive || "#808080"}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData.data,
                    colorConfig: {
                      ...nodeData.data.colorConfig,
                      active: nodeData.data.colorConfig?.active || "#00ff00",
                      inactive: e.target.value,
                    },
                  })
                }
                className={`flex-1 px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
                  isEditMode
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison untuk optimasi - hanya re-render jika data yang penting berubah
    return (
      prevProps.nodeId === nextProps.nodeId &&
      prevProps.isEditMode === nextProps.isEditMode &&
      prevProps.nodeData.data.status === nextProps.nodeData.data.status &&
      prevProps.nodeData.data.label === nextProps.nodeData.data.label &&
      prevProps.nodeData.data.power === nextProps.nodeData.data.power &&
      prevProps.nodeData.data.voltage === nextProps.nodeData.data.voltage &&
      prevProps.nodeData.width === nextProps.nodeData.width &&
      prevProps.nodeData.height === nextProps.nodeData.height &&
      prevProps.nodeData.data.colorConfig?.active ===
        nextProps.nodeData.data.colorConfig?.active &&
      prevProps.nodeData.data.colorConfig?.inactive ===
        nextProps.nodeData.data.colorConfig?.inactive
    );
  }
);

PembangkitProperties.displayName = "PembangkitProperties";
