import React from "react";

interface ShapePropertiesProps {
  nodeData: any;
  nodeId: string;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export const ShapeProperties: React.FC<ShapePropertiesProps> = ({
  nodeData,
  nodeId,
  isEditMode,
  onUpdateNode,
}) => {
  return (
    <>
      {/* Text Node Properties */}
      {nodeData.fontSize !== undefined && (
        <>
          <div>
            <label className="block text-[12px] font-medium mb-1">
              Font Size
            </label>
            <input
              type="number"
              value={nodeData.fontSize}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
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
              value={nodeData.color}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
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
                checked={nodeData.bold || false}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData,
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
                checked={nodeData.italic || false}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData,
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
      {nodeData.fill !== undefined && (
        <>
          <div>
            <label className="block text-[12px] font-medium mb-1">
              Fill Color
            </label>
            <input
              type="color"
              value={nodeData.fill}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
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
              value={nodeData.stroke}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
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
      {nodeData.width !== undefined && nodeData.height !== undefined && (
        <>
          <div>
            <label className="block text-[12px] font-medium mb-1">Width</label>
            <input
              type="number"
              value={nodeData.width}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
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
              value={nodeData.height}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData,
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
      {nodeData.radius !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-1">Radius</label>
          <input
            type="number"
            value={nodeData.radius}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData,
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
};
