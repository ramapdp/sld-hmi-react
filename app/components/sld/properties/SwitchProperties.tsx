import React, { memo } from "react";
import type { Node } from "reactflow";
import type {
  SwitchNodeData,
  CircuitBreakerNodeData,
} from "~/types/node-data.types";

interface SwitchPropertiesProps {
  nodeData: Node<SwitchNodeData | CircuitBreakerNodeData>;
  nodeId: string;
  isEditMode: boolean;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export const SwitchProperties: React.FC<SwitchPropertiesProps> = memo(
  ({ nodeData, nodeId, isEditMode, onUpdateNode }) => {
    // Handle both status (CircuitBreaker) and position (Switch) fields
    const statusValue = (nodeData.data as any).status || (nodeData.data as any).position || "OPEN";
    const statusField = (nodeData.data as any).status !== undefined ? "status" : "position";
    const isCircuitBreaker = (nodeData.data as any).status !== undefined;
    
    return (
      <>
        {/* Status (Read-only) */}
        <div>
          <label className="block text-[12px] font-medium mb-1">Status</label>
          <input
            type="text"
            value={statusValue}
            disabled
            className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
          />
        </div>

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

      {/* Current (for circuit breaker) */}
      {"current" in nodeData.data && nodeData.data.current !== undefined && (
        <div>
          <label className="block text-[12px] font-medium mb-1">
            Current (A)
          </label>
          <input
            type="text"
            value={nodeData.data.current || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData.data,
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

      {/* Circuit Breaker Color Configuration */}
      {isCircuitBreaker && (
        <>
          <div className="border-t border-gray-300 dark:border-gray-600 my-3" />
          <div className="space-y-3">
            <h3 className="text-[12px] font-semibold">Color Configuration</h3>
            
            {/* Open Color */}
            <div>
              <label className="block text-[10px] font-medium mb-1">
                Open Color (Yellow)
              </label>
              <input
                type="color"
                value={nodeData.data.colorConfig?.open || "#FFFF00"}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData.data,
                    colorConfig: {
                      ...nodeData.data.colorConfig,
                      open: e.target.value,
                    },
                  })
                }
                className={`w-full h-8 border border-gray-300 dark:border-gray-600 rounded ${
                  !isEditMode ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
              />
            </div>

            {/* Close Color */}
            <div>
              <label className="block text-[10px] font-medium mb-1">
                Close Color (Green)
              </label>
              <input
                type="color"
                value={nodeData.data.colorConfig?.close || "#00ff00"}
                disabled={!isEditMode}
                onChange={(e) =>
                  onUpdateNode(nodeId, {
                    ...nodeData.data,
                    colorConfig: {
                      ...nodeData.data.colorConfig,
                      close: e.target.value,
                    },
                  })
                }
                className={`w-full h-8 border border-gray-300 dark:border-gray-600 rounded ${
                  !isEditMode ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
              />
            </div>
          </div>
        </>
      )}

      {/* Size Configuration */}
      <div className="border-t border-gray-300 dark:border-gray-600 my-3" />
      <div className="space-y-3">
        <h3 className="text-[12px] font-semibold">Size</h3>
        
        <div className="grid grid-cols-2 gap-2">
          {/* Width */}
          <div>
            <label className="block text-[10px] font-medium mb-1">
              Width (px)
            </label>
            <input
              type="number"
              min="20"
              max="200"
              value={nodeData.width || 60}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData.data,
                  __nodeSize: {
                    width: parseInt(e.target.value),
                    height: nodeData.height || 60,
                  },
                })
              }
              className={`w-full px-2 py-1 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
                isEditMode
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-[10px] font-medium mb-1">
              Height (px)
            </label>
            <input
              type="number"
              min="20"
              max="200"
              value={nodeData.height || 60}
              disabled={!isEditMode}
              onChange={(e) =>
                onUpdateNode(nodeId, {
                  ...nodeData.data,
                  __nodeSize: {
                    width: nodeData.width || 60,
                    height: parseInt(e.target.value),
                  },
                })
              }
              className={`w-full px-2 py-1 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
                isEditMode
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Rotation */}
      <div>
        <label className="block text-[12px] font-medium mb-1">
          Rotation (degrees)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="360"
            step="15"
            value={nodeData.data.rotation || 0}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData.data,
                rotation: parseInt(e.target.value),
              })
            }
            className={`flex-1 ${
              !isEditMode ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          />
          <input
            type="number"
            min="0"
            max="360"
            value={nodeData.data.rotation || 0}
            disabled={!isEditMode}
            onChange={(e) =>
              onUpdateNode(nodeId, {
                ...nodeData.data,
                rotation: parseInt(e.target.value),
              })
            }
            className={`w-16 px-2 py-1 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
              isEditMode
                ? "bg-white dark:bg-gray-800"
                : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            }`}
          />
        </div>
      </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    const prevData = prevProps.nodeData.data as any;
    const nextData = nextProps.nodeData.data as any;
    
    return (
      prevProps.nodeId === nextProps.nodeId &&
      prevProps.isEditMode === nextProps.isEditMode &&
      (prevData.status || prevData.position) === (nextData.status || nextData.position) &&
      prevData.voltage === nextData.voltage &&
      prevData.current === nextData.current &&
      prevData.rotation === nextData.rotation &&
      prevData.colorConfig?.open === nextData.colorConfig?.open &&
      prevData.colorConfig?.close === nextData.colorConfig?.close &&
      prevProps.nodeData.width === nextProps.nodeData.width &&
      prevProps.nodeData.height === nextProps.nodeData.height
    );
  }
);

SwitchProperties.displayName = "SwitchProperties";
