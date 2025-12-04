import React, { useState } from "react";
import type { Node, Edge } from "reactflow";

interface PropertiesPanelProps {
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  onUpdateNode: (nodeId: string, newData: any) => void;
  onUpdateEdge: (edgeId: string, newStyle: any) => void;
  onClose: () => void;
  edges?: Edge[];
  nodes?: Node[];
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedNode,
  selectedEdge,
  onUpdateNode,
  onUpdateEdge,
  onClose,
  edges = [],
  nodes = [],
}) => {
  const [activeTab, setActiveTab] = useState<"properties" | "command">(
    "properties"
  );
  if (!selectedNode && !selectedEdge) return null;

  // Node Properties
  if (selectedNode) {
    const nodeData = selectedNode.data;

    return (
      <aside className="w-80 my-2 border border-gray-200 dark:border-gray-700 p-4 overflow-auto rounded-md">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab("properties")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "properties"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab("command")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "command"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Command
          </button>
        </div>

        {activeTab === "properties" && (
          <div className="space-y-4">
            {/* Node Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <input
                type="text"
                value={selectedNode.type || "unknown"}
                disabled
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800"
              />
            </div>

            {/* Node ID */}
            <div>
              <label className="block text-sm font-medium mb-1">ID</label>
              <input
                type="text"
                value={selectedNode.id}
                disabled
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800"
              />
            </div>

            {/* Label */}
            {nodeData.label !== undefined && (
              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <input
                  type="text"
                  value={nodeData.label}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      ...nodeData,
                      label: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {/* Status (for switches/breakers) */}
            {nodeData.status !== undefined && (
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={nodeData.status}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      ...nodeData,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                >
                  <option value="CLOSE">CLOSE</option>
                  <option value="OPEN">OPEN</option>
                </select>
              </div>
            )}

            {/* Voltage */}
            {nodeData.voltage !== undefined && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Voltage (kV)
                </label>
                <input
                  type="text"
                  value={nodeData.voltage}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      ...nodeData,
                      voltage: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {/* Voltage Level */}
            {nodeData.voltageLevel !== undefined && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Voltage Level
                </label>
                <select
                  value={nodeData.voltageLevel}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      ...nodeData,
                      voltageLevel: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                >
                  <option value="HV">HV (High Voltage)</option>
                  <option value="MV">MV (Medium Voltage)</option>
                  <option value="LV">LV (Low Voltage)</option>
                  <option value="HV-MV">HV-MV (Transformer)</option>
                  <option value="MV-LV">MV-LV (Transformer)</option>
                </select>
              </div>
            )}

            {/* Power */}
            {nodeData.power !== undefined && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Power (MW/kW)
                </label>
                <input
                  type="text"
                  value={nodeData.power}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      ...nodeData,
                      power: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {/* Ratio (for transformers) */}
            {nodeData.ratio !== undefined && (
              <div>
                <label className="block text-sm font-medium mb-1">Ratio</label>
                <input
                  type="text"
                  value={nodeData.ratio}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      ...nodeData,
                      ratio: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {/* Capacity */}
            {nodeData.capacity !== undefined && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Capacity (MVA/kVA)
                </label>
                <input
                  type="text"
                  value={nodeData.capacity}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      ...nodeData,
                      capacity: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {/* Text Properties */}
            {nodeData.fontSize !== undefined && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Font Size
                  </label>
                  <input
                    type="number"
                    value={nodeData.fontSize}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        fontSize: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Color
                  </label>
                  <input
                    type="color"
                    value={nodeData.color}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        color: e.target.value,
                      })
                    }
                    className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={nodeData.bold || false}
                      onChange={(e) =>
                        onUpdateNode(selectedNode.id, {
                          ...nodeData,
                          bold: e.target.checked,
                        })
                      }
                    />
                    <span className="text-sm">Bold</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={nodeData.italic || false}
                      onChange={(e) =>
                        onUpdateNode(selectedNode.id, {
                          ...nodeData,
                          italic: e.target.checked,
                        })
                      }
                    />
                    <span className="text-sm">Italic</span>
                  </label>
                </div>
              </>
            )}

            {/* Shape Properties (Rectangle/Circle) */}
            {nodeData.fill !== undefined && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Fill Color
                  </label>
                  <input
                    type="color"
                    value={nodeData.fill}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        fill: e.target.value,
                      })
                    }
                    className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Stroke Color
                  </label>
                  <input
                    type="color"
                    value={nodeData.stroke}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        stroke: e.target.value,
                      })
                    }
                    className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>
              </>
            )}

            {/* Rectangle specific */}
            {nodeData.width !== undefined && nodeData.height !== undefined && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    value={nodeData.width}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        width: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Height
                  </label>
                  <input
                    type="number"
                    value={nodeData.height}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        height: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  />
                </div>
              </>
            )}

            {/* Circle specific */}
            {nodeData.radius !== undefined && (
              <div>
                <label className="block text-sm font-medium mb-1">Radius</label>
                <input
                  type="number"
                  value={nodeData.radius}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      ...nodeData,
                      radius: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {/* Position */}
            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs mb-1">X</label>
                  <input
                    type="number"
                    value={Math.round(selectedNode.position.x)}
                    disabled
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Y</label>
                  <input
                    type="number"
                    value={Math.round(selectedNode.position.y)}
                    disabled
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Connections */}
            <div>
              <label className="block text-sm font-medium mb-2">Connections</label>
              <div className="space-y-2">
                {edges.filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id).length === 0 ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">No connections</p>
                ) : (
                  <div className="space-y-1">
                    {edges
                      .filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id)
                      .map((edge, index) => {
                        const isSource = edge.source === selectedNode.id;
                        const connectedNodeId = isSource ? edge.target : edge.source;
                        const connectedNode = nodes.find(n => n.id === connectedNodeId);
                        const direction = isSource ? '→' : '←';
                        
                        return (
                          <div key={edge.id} className="text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-blue-600 dark:text-blue-400">{direction}</span>
                              <span className="font-medium">{connectedNode?.data?.label || connectedNodeId}</span>
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                              {isSource ? 'Output to' : 'Input from'} • ID: {connectedNodeId}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "command" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Commands</label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Configure commands for this node
              </p>

              {/* Add your command-related UI here */}
              <div className="space-y-2">
                <button className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-left">
                  Add Command
                </button>
              </div>
            </div>
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
      <aside className="w-80 my-2 border border-gray-200 dark:border-gray-700 p-4 overflow-auto rounded-md">
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
            <label className="block text-sm font-medium mb-1">ID</label>
            <input
              type="text"
              value={selectedEdge.id}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800"
            />
          </div>

          {/* Connection */}
          <div>
            <label className="block text-sm font-medium mb-1">Connection</label>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedEdge.source} → {selectedEdge.target}
            </div>
          </div>

          {/* Electrical Line Status */}
          {edgeData.isElectrical && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Electrical Status
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="electricalStatus"
                    checked={!edgeData.isActive}
                    onChange={() => {
                      const newData = { ...edgeData, isActive: false };
                      const newStyle = {
                        ...edgeStyle,
                        stroke: "#ffffff",
                        strokeDasharray: "0",
                      };
                      onUpdateEdge(selectedEdge.id, {
                        ...newStyle,
                        data: newData,
                        animated: false,
                      });
                    }}
                  />
                  <span className="text-sm">Off (Putih)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="electricalStatus"
                    checked={edgeData.isActive}
                    onChange={() => {
                      const newData = { ...edgeData, isActive: true };
                      const newStyle = {
                        ...edgeStyle,
                        stroke: "#10b981",
                        strokeDasharray: "5,5",
                      };
                      onUpdateEdge(selectedEdge.id, {
                        ...newStyle,
                        data: newData,
                        animated: true,
                      });
                    }}
                  />
                  <span className="text-sm">On (Hijau Animated)</span>
                </label>
              </div>
            </div>
          )}

          {/* Stroke Color - hanya tampil jika bukan electrical atau sedang aktif */}
          {(!edgeData.isElectrical || edgeData.isActive) && (
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
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
            <label className="block text-sm font-medium mb-1">Width (px)</label>
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
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
            />
          </div>
        </div>
      </aside>
    );
  }

  return null;
};
