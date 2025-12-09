import React, { memo } from "react";
import type { Node } from "reactflow";

interface ShapePropertiesProps {
  nodeData: Node<any>;
  nodeId: string;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export const ShapeProperties: React.FC<ShapePropertiesProps> = memo(
  ({ nodeData, nodeId, isEditMode, onUpdateNode }) => {
    return (
      <>
        {/* Text Node Properties */}
        {nodeData.data.fontSize !== undefined && (
          <>
            <div>
              <label className="block text-[12px] font-medium mb-1">
                Font Size
              </label>
              <input
                type="number"
                value={nodeData.data.fontSize}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData.data,
                    fontSize: parseInt(e.target.value),
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
            <label className="block text-[12px] font-medium mb-1">Color</label>
            <input
              type="color"
              value={nodeData.data.color}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData.data,
                  color: e.target.value,
                })
              }
              className={`w-full h-10 border border-gray-300 dark:border-gray-600 rounded ${
                isEditMode
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={nodeData.data.bold || false}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData.data,
                    bold: e.target.checked,
                  })
                }
                className={!isEditMode ? "cursor-not-allowed" : ""}
              />
              Bold
            </label>
            <label className="flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={nodeData.data.italic || false}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData.data,
                    italic: e.target.checked,
                  })
                }
                className={!isEditMode ? "cursor-not-allowed" : ""}
              />
              Italic
            </label>
          </div>
        </>
      )}

      {/* Shape Properties (Rectangle/Circle) */}
      {nodeData.data.fill !== undefined && (
        <>
          <div>
            <label className="block text-[12px] font-medium mb-1">
              Fill Color
            </label>
            <input
              type="color"
              value={nodeData.data.fill}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData.data,
                  fill: e.target.value,
                })
              }
              className={`w-full h-10 border border-gray-300 dark:border-gray-600 rounded ${
                isEditMode
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1">
              Stroke Color
            </label>
            <input
              type="color"
              value={nodeData.data.stroke}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData.data,
                  stroke: e.target.value,
                })
              }
              className={`w-full h-10 border border-gray-300 dark:border-gray-600 rounded ${
                isEditMode
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
            />
          </div>
        </>
      )}

      {/* Rectangle specific */}
      {nodeData.data.width !== undefined && nodeData.data.height !== undefined && (
        <>
          <div>
            <label className="block text-[12px] font-medium mb-1">Width</label>
            <input
              type="number"
              value={nodeData.data.width}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData.data,
                  width: parseInt(e.target.value),
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
            <label className="block text-[12px] font-medium mb-1">
              Height
            </label>
            <input
              type="number"
              value={nodeData.data.height}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData.data,
                  height: parseInt(e.target.value),
                })
              }
              className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
                isEditMode
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
              }`}
            />
          </div>
        </>
      )}

      {/* Circle specific */}
      {nodeData.data.radius !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-1">Radius</label>
          <input
            type="number"
            value={nodeData.data.radius}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData.data,
                radius: parseInt(e.target.value),
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
  }
);

ShapeProperties.displayName = "ShapeProperties";
