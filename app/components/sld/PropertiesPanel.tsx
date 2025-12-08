import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { Node, Edge } from "reactflow";
import { CommonProperties } from "./properties/CommonProperties";
import { PembangkitProperties } from "./properties/PembangkitProperties";
import { SwitchProperties } from "./properties/SwitchProperties";
import { TransformerProperties } from "./properties/TransformerProperties";
import { LoadProperties } from "./properties/LoadProperties";
import { ShapeProperties } from "./properties/ShapeProperties";
import { PembangkitCommands } from "./commands/PembangkitCommands";
import { SwitchCommands } from "./commands/SwitchCommands";
import { TransformerCommands } from "./commands/TransformerCommands";
import { LoadCommands } from "./commands/LoadCommands";

interface PropertiesPanelProps {
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  onUpdateNode: (nodeId: string, newData: any) => void;
  onUpdateEdge: (edgeId: string, newStyle: any) => void;
  onClose: () => void;
  edges?: Edge[];
  nodes?: Node[];
  mode: "edit" | "command";
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedNode,
  selectedEdge,
  onUpdateNode,
  onUpdateEdge,
  onClose,
  edges = [],
  nodes = [],
  mode,
}) => {
  const [activeTab, setActiveTab] = useState<"properties" | "command">(
    mode === "edit" ? "properties" : "command"
  );
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setIsEditMode(false);
  }, [selectedNode?.id, selectedEdge?.id]);

  // Update active tab when mode changes
  useEffect(() => {
    setActiveTab(mode === "edit" ? "properties" : "command");
  }, [mode]);

  if (!selectedNode && !selectedEdge) return null;

  // Node Properties
  if (selectedNode) {
    const nodeData = selectedNode.data;
    const nodeType = selectedNode.type || "";

    // Memoize node-specific properties rendering untuk avoid re-render
    const renderSpecificProperties = useMemo(() => {
      switch (nodeType) {
        case "pembangkit":
          return (
            <PembangkitProperties
              nodeData={nodeData}
              nodeId={selectedNode.id}
              isEditMode={isEditMode}
              onUpdateNode={onUpdateNode}
            />
          );

        case "circuitBreaker":
        case "switch":
        case "disconnector":
          return (
            <SwitchProperties
              nodeData={nodeData}
              nodeId={selectedNode.id}
              isEditMode={isEditMode}
              onUpdateNode={onUpdateNode}
            />
          );

        case "transformer":
          return (
            <TransformerProperties
              nodeData={nodeData}
              nodeId={selectedNode.id}
              isEditMode={isEditMode}
              onUpdateNode={onUpdateNode}
            />
          );

        case "load":
          return (
            <LoadProperties
              nodeData={nodeData}
              nodeId={selectedNode.id}
              isEditMode={isEditMode}
              onUpdateNode={onUpdateNode}
            />
          );

        default:
          // For shapes (text, rectangle, circle) and other nodes
          if (
            nodeData.fontSize !== undefined ||
            nodeData.fill !== undefined ||
            nodeData.width !== undefined ||
            nodeData.radius !== undefined
          ) {
            return (
              <ShapeProperties
                nodeData={nodeData}
                nodeId={selectedNode.id}
                isEditMode={isEditMode}
                onUpdateNode={onUpdateNode}
              />
            );
          }
          return null;
      }
    }, [nodeType, nodeData, selectedNode.id, isEditMode, onUpdateNode]);

    // Memoize node-specific commands rendering
    const renderSpecificCommands = useMemo(() => {
      switch (nodeType) {
        case "pembangkit":
          return (
            <PembangkitCommands
              nodeData={nodeData}
              nodeId={selectedNode.id}
              onUpdateNode={onUpdateNode}
              mode={mode}
            />
          );

        case "circuitBreaker":
        case "switch":
        case "disconnector":
          return (
            <SwitchCommands
              nodeData={nodeData}
              nodeId={selectedNode.id}
              onUpdateNode={onUpdateNode}
              mode={mode}
            />
          );

        case "transformer":
          return (
            <TransformerCommands
              nodeData={nodeData}
              nodeId={selectedNode.id}
              onUpdateNode={onUpdateNode}
              mode={mode}
            />
          );

        case "load":
          return (
            <LoadCommands
              nodeData={nodeData}
              nodeId={selectedNode.id}
              onUpdateNode={onUpdateNode}
              mode={mode}
            />
          );

        default:
          return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-[12px]">
                No commands available for this node type
              </p>
            </div>
          );
      }
    }, [nodeType, nodeData, selectedNode.id, onUpdateNode, mode]);

    return (
      <aside className="flex flex-col w-80 my-1 border border-[#494949] p-2 gap-2 overflow-hidden rounded-md">
        {/* Tab Navigation */}
        <div className="flex justify-start gap-1 items-center">
          <button
            onClick={() => setActiveTab("properties")}
            className={`px-3 py-1 text-[12px] cursor-pointer rounded text-white transition-colors ${
              activeTab === "properties"
                ? "bg-[#044556] text-white"
                : "bg-transparent hover:bg-[#044556]/50"
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab("command")}
            className={`px-3 py-1 text-[12px] cursor-pointer rounded text-white transition-colors  ${
              activeTab === "command"
                ? "bg-[#044556] text-white"
                : "bg-transparent hover:bg-[#044556]/50"
            }`}
          >
            Command
          </button>
        </div>

        {/* Tab Content */}
        <div className="h-full overflow-auto">
          {activeTab === "properties" && (
            <div className="space-y-4">
              {/* Common Properties for all nodes */}
              <CommonProperties
                node={selectedNode}
                isEditMode={isEditMode}
                onUpdateNode={onUpdateNode}
                edges={edges}
                nodes={nodes}
              />

              {/* Separator */}
              <div className="border-t border-gray-300 dark:border-gray-600" />

              {/* Node-Specific Properties */}
              {renderSpecificProperties}
            </div>
          )}

          {activeTab === "command" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Configure SCADA commands for this node
              </p>

              {/* Node-Specific Commands */}
              {renderSpecificCommands}

              {/* Command Mode Warning */}
              {mode === "edit" && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 p-2 rounded border border-yellow-500/30 mt-4">
                  ⚠️ Switch to command mode to execute
                </p>
              )}
            </div>
          )}
        </div>

        {/* Edit/Save Button */}
        {activeTab === "properties" && (
          <div className="flex justify-start items-center">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-3 py-1 text-[12px] rounded transition-colors bg-[#044556] hover:opacity-70 text-white cursor-pointer`}
            >
              {isEditMode ? "Save" : "Edit Node"}
            </button>
          </div>
        )}
      </aside>
    );
  }

  // Edge Properties
  if (selectedEdge) {
    const edgeStyle = selectedEdge.style || {};
    const edgeData = selectedEdge.data || {};

    return (
      <aside className="w-80 my-1 border border-[#494949] p-4 overflow-auto rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Edge Properties</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Edge ID */}
          <div>
            <label className="block text-[12px] font-medium mb-1">ID</label>
            <input
              type="text"
              value={selectedEdge.id}
              disabled
              className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800"
            />
          </div>

          {/* Connection */}
          <div>
            <label className="block text-[12px] font-medium mb-1">
              Connection
            </label>
            <div className="text-[12px] text-gray-600 dark:text-gray-400">
              {selectedEdge.source} → {selectedEdge.target}
            </div>
          </div>

          {/* Electrical Line Status */}
          {edgeData.isElectrical && (
            <div>
              <label className="block text-[12px] font-medium mb-2">
                Electrical Status
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    onUpdateEdge(selectedEdge.id, {
                      ...edgeStyle,
                      stroke: "#00ff00",
                      data: { ...edgeData, isActive: true },
                    })
                  }
                  className={`flex-1 px-3 py-2 text-[12px] border rounded ${
                    edgeData.isActive
                      ? "border-green-500 bg-green-500/20 text-green-600 dark:text-green-400"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() =>
                    onUpdateEdge(selectedEdge.id, {
                      ...edgeStyle,
                      stroke: "#808080",
                      data: { ...edgeData, isActive: false },
                    })
                  }
                  className={`flex-1 px-3 py-2 text-[12px] border rounded ${
                    !edgeData.isActive
                      ? "border-gray-500 bg-gray-500/20 text-gray-600 dark:text-gray-400"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
          )}

          {/* Stroke Color */}
          {(!edgeData.isElectrical || edgeData.isActive) && (
            <div>
              <label className="block text-[12px] font-medium mb-1">
                Color
              </label>
              <input
                type="color"
                value={edgeStyle.stroke || "#ffffff"}
                onChange={(e) =>
                  onUpdateEdge(selectedEdge.id, {
                    ...edgeStyle,
                    stroke: e.target.value,
                  })
                }
                className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
          )}

          {/* Stroke Width */}
          <div>
            <label className="block text-[12px] font-medium mb-1">
              Width (px)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={edgeStyle.strokeWidth || 2}
              onChange={(e) =>
                onUpdateEdge(selectedEdge.id, {
                  ...edgeStyle,
                  strokeWidth: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
            />
          </div>
        </div>
      </aside>
    );
  }

  return null;
};
