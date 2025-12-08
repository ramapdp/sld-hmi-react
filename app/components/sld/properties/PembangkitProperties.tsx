import React, { memo } from "react";
import type { PembangkitNodeData } from "~/types/node-data.types";

interface PembangkitPropertiesProps {
  nodeData: PembangkitNodeData;
  nodeId: string;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export const PembangkitProperties: React.FC<PembangkitPropertiesProps> = memo(({
  nodeData,
  nodeId,
  isEditMode,
  onUpdateNode,
}) => {
  console.log("PembangkitProperties nodeData:", nodeData);
  return (
    <>
      {/* Status Toggle */}
      <div>
        <label className="block text-[12px] font-medium mb-2">Status</label>
        <input
          type="text"
          value={nodeData.status || ""}
          disabled={true}
          className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded opacity-80"
        />
      </div>

      {/* Power */}
      <div>
        <label className="block text-[12px] font-medium mb-1">Power (MW)</label>
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

      {/* Voltage */}
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

      {/* Size */}
      {nodeData.size !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-2">Size</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-gray-500 mb-1">
                Width
              </label>
              <input
                type="number"
                value={nodeData.size.width}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData,
                    size: {
                      ...nodeData.size,
                      width: parseInt(e.target.value),
                    },
                  })
                }
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
                value={nodeData.size.height}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData,
                    size: {
                      ...nodeData.size,
                      height: parseInt(e.target.value),
                    },
                  })
                }
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
              value={nodeData.colorConfig?.active || "#00ff00"}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
                  colorConfig: {
                    ...nodeData.colorConfig,
                    active: e.target.value,
                  },
                })
              }
              className={`w-16 h-10 border border-gray-300 dark:border-gray-600 rounded ${
                isEditMode ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
            />
            <input
              type="text"
              value={nodeData.colorConfig?.active || "#00ff00"}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
                  colorConfig: {
                    ...nodeData.colorConfig,
                    active: e.target.value,
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
              value={nodeData.colorConfig?.inactive || "#808080"}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
                  colorConfig: {
                    ...nodeData.colorConfig,
                    inactive: e.target.value,
                  },
                })
              }
              className={`w-16 h-10 border border-gray-300 dark:border-gray-600 rounded ${
                isEditMode ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
            />
            <input
              type="text"
              value={nodeData.colorConfig?.inactive || "#808080"}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
                  colorConfig: {
                    ...nodeData.colorConfig,
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
}, (prevProps, nextProps) => {
  // Custom comparison untuk optimasi - hanya re-render jika data yang penting berubah
  return (
    prevProps.nodeId === nextProps.nodeId &&
    prevProps.isEditMode === nextProps.isEditMode &&
    prevProps.nodeData.status === nextProps.nodeData.status &&
    prevProps.nodeData.label === nextProps.nodeData.label &&
    prevProps.nodeData.power === nextProps.nodeData.power &&
    prevProps.nodeData.voltage === nextProps.nodeData.voltage &&
    prevProps.nodeData.size?.width === nextProps.nodeData.size?.width &&
    prevProps.nodeData.size?.height === nextProps.nodeData.size?.height &&
    prevProps.nodeData.colorConfig?.active === nextProps.nodeData.colorConfig?.active &&
    prevProps.nodeData.colorConfig?.inactive === nextProps.nodeData.colorConfig?.inactive
  );
});

PembangkitProperties.displayName = 'PembangkitProperties';
