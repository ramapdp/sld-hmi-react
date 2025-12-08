import React, { useEffect, useState } from "react";
import type { Node, Edge } from "reactflow";

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

  if (!selectedNode && !selectedEdge) return null;

  console.log("mode in PropertiesPanel:", mode);
  // Node Properties
  if (selectedNode) {
    const nodeData = selectedNode.data;
    console.log("Selected Node Data:", selectedNode);

    return (
      <aside className="flex flex-col w-80 my-1 border border-[#494949] p-2 gap-2 overflow-hidden rounded-md">
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

        <div className="h-full overflow-auto">
          {activeTab === "properties" && (
            <div className="space-y-4">
              {/* Node Type - Read Only */}
              <div>
                <label className="block text-[12px] font-medium mb-1">
                  Type
                </label>
                <input
                  type="text"
                  value={selectedNode.type || "unknown"}
                  disabled
                  className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                />
              </div>

              {/* Node ID - Read Only */}
              <div>
                <label className="block text-[12px] font-medium mb-1">ID</label>
                <input
                  type="text"
                  value={selectedNode.id}
                  disabled
                  className="w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                />
              </div>

              {/* Label - Common for all nodes */}
              <div>
                <label className="block text-[12px] font-medium mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={nodeData.label || ""}
                  disabled={!isEditMode}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      ...nodeData,
                      label: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
                    isEditMode
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Position - Read Only */}
              <div>
                <label className="block text-[12px] font-medium mb-2">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs mb-1">X</label>
                    <input
                      type="number"
                      value={Math.round(selectedNode.position.x)}
                      disabled
                      className="w-full px-2 py-1 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">Y</label>
                    <input
                      type="number"
                      value={Math.round(selectedNode.position.y)}
                      disabled
                      className="w-full px-2 py-1 text-[12px] border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-300 dark:border-gray-600" />

              {/* Pembangkit Node Properties */}
              {selectedNode.type === "pembangkit" && (
                <>
                  {/* Status Toggle */}
                  <div>
                    <label className="block text-[12px] font-medium mb-2">
                      Status
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="pembangkit-status"
                          checked={nodeData.status === "active"}
                          disabled={!isEditMode}
                          onChange={() =>
                            onUpdateNode(selectedNode.id, {
                              ...nodeData,
                              status: "active",
                            })
                          }
                        />
                        <span className="text-[12px]">Active</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="pembangkit-status"
                          checked={
                            nodeData.status === "inactive" || !nodeData.status
                          }
                          disabled={!isEditMode}
                          onChange={() =>
                            onUpdateNode(selectedNode.id, {
                              ...nodeData,
                              status: "inactive",
                            })
                          }
                        />
                        <span className="text-[12px]">Inactive</span>
                      </label>
                    </div>
                  </div>

                  {/* Power */}
                  <div>
                    <label className="block text-[12px] font-medium mb-1">
                      Power (MW/kW)
                    </label>
                    <input
                      type="text"
                      value={nodeData.power || ""}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        onUpdateNode(selectedNode.id, {
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
                        onUpdateNode(selectedNode.id, {
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
                      <label className="block text-[12px] font-medium mb-2">
                        Size
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs mb-1">Width</label>
                          <input
                            type="number"
                            min="30"
                            value={nodeData.size.width}
                            disabled={!isEditMode}
                            onChange={(e) =>
                              onUpdateNode(selectedNode.id, {
                                ...nodeData,
                                size: {
                                  ...nodeData.size,
                                  width: parseFloat(e.target.value),
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
                        <div>
                          <label className="block text-xs mb-1">Height</label>
                          <input
                            type="number"
                            min="30"
                            value={nodeData.size.height}
                            disabled={!isEditMode}
                            onChange={(e) =>
                              onUpdateNode(selectedNode.id, {
                                ...nodeData,
                                size: {
                                  ...nodeData.size,
                                  height: parseFloat(e.target.value),
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
                  )}

                  {/* Color Configuration */}
                  <div className="flex flex-col border-t border-gray-300 dark:border-gray-600 gap-2 pt-3">
                    <h4 className="text-[12px] font-semibold">
                      Color Configuration
                    </h4>

                    {/* Active State Color */}
                    <div className="flex flex-col gap-2">
                      <h5 className="text-xs font-semibold text-white">
                        Active State Color
                      </h5>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={nodeData.colorConfig?.active || "#00ff00"}
                          disabled={!isEditMode}
                          onChange={(e) => {
                            const colorConfig = nodeData.colorConfig || {
                              active: "#00ff00",
                              inactive: "#808080",
                            };
                            onUpdateNode(selectedNode.id, {
                              ...nodeData,
                              colorConfig: {
                                ...colorConfig,
                                active: e.target.value,
                              },
                            });
                          }}
                          className={`w-16 h-8 rounded ${
                            isEditMode
                              ? "cursor-pointer"
                              : "cursor-not-allowed opacity-50"
                          }`}
                        />
                        <input
                          type="text"
                          value={nodeData.colorConfig?.active || "#00ff00"}
                          disabled={!isEditMode}
                          onChange={(e) => {
                            const colorConfig = nodeData.colorConfig || {
                              active: "#00ff00",
                              inactive: "#808080",
                            };
                            onUpdateNode(selectedNode.id, {
                              ...nodeData,
                              colorConfig: {
                                ...colorConfig,
                                active: e.target.value,
                              },
                            });
                          }}
                          placeholder="#00ff00"
                          className={`flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded font-mono ${
                            isEditMode
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Inactive State Color */}
                    <div className="flex flex-col gap-2">
                      <h5 className="text-xs font-semibold">
                        Inactive State Color
                      </h5>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={nodeData.colorConfig?.inactive || "#808080"}
                          disabled={!isEditMode}
                          onChange={(e) => {
                            const colorConfig = nodeData.colorConfig || {
                              active: "#00ff00",
                              inactive: "#808080",
                            };
                            onUpdateNode(selectedNode.id, {
                              ...nodeData,
                              colorConfig: {
                                ...colorConfig,
                                inactive: e.target.value,
                              },
                            });
                          }}
                          className={`w-16 h-8 ${
                            isEditMode
                              ? "cursor-pointer"
                              : "cursor-not-allowed opacity-50"
                          }`}
                        />
                        <input
                          type="text"
                          value={nodeData.colorConfig?.inactive || "#808080"}
                          disabled={!isEditMode}
                          onChange={(e) => {
                            const colorConfig = nodeData.colorConfig || {
                              active: "#00ff00",
                              inactive: "#808080",
                            };
                            onUpdateNode(selectedNode.id, {
                              ...nodeData,
                              colorConfig: {
                                ...colorConfig,
                                inactive: e.target.value,
                              },
                            });
                          }}
                          placeholder="#808080"
                          className={`flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded font-mono ${
                            isEditMode
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Switch/Circuit Breaker Node Properties */}
              {(selectedNode.type === "circuitBreaker" ||
                selectedNode.type === "switch" ||
                selectedNode.type === "disconnector") && (
                <>
                  {/* Status */}
                  <div>
                    <label className="block text-[12px] font-medium mb-1">
                      Status
                    </label>
                    <select
                      value={nodeData.status || "OPEN"}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        onUpdateNode(selectedNode.id, {
                          ...nodeData,
                          status: e.target.value,
                        })
                      }
                      className={`w-full px-3 py-2 text-[12px] border border-gray-300 dark:border-gray-600 rounded ${
                        isEditMode
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                      }`}
                    >
                      <option value="CLOSE">CLOSE</option>
                      <option value="OPEN">OPEN</option>
                    </select>
                  </div>

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
                          onUpdateNode(selectedNode.id, {
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

                  {/* Current (for circuit breaker) */}
                  {nodeData.current !== undefined && (
                    <div>
                      <label className="block text-[12px] font-medium mb-1">
                        Current (A)
                      </label>
                      <input
                        type="text"
                        value={nodeData.current || ""}
                        disabled={!isEditMode}
                        onChange={(e) =>
                          onUpdateNode(selectedNode.id, {
                            ...nodeData,
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
                </>
              )}

              {/* Transformer Node Properties */}
              {selectedNode.type === "transformer" && (
                <>
                  {/* Ratio */}
                  <div>
                    <label className="block text-[12px] font-medium mb-1">
                      Ratio
                    </label>
                    <input
                      type="text"
                      value={nodeData.ratio || ""}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        onUpdateNode(selectedNode.id, {
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
                        value={nodeData.voltageLevel || "HV"}
                        disabled={!isEditMode}
                        onChange={(e) =>
                          onUpdateNode(selectedNode.id, {
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
                        <option value="HV">HV (High Voltage)</option>
                        <option value="MV">MV (Medium Voltage)</option>
                        <option value="LV">LV (Low Voltage)</option>
                        <option value="HV-MV">HV-MV (Transformer)</option>
                        <option value="MV-LV">MV-LV (Transformer)</option>
                      </select>
                    </div>
                  )}

                  {/* Capacity */}
                  {nodeData.capacity !== undefined && (
                    <div>
                      <label className="block text-[12px] font-medium mb-1">
                        Capacity (MVA/kVA)
                      </label>
                      <input
                        type="text"
                        value={nodeData.capacity || ""}
                        disabled={!isEditMode}
                        onChange={(e) =>
                          onUpdateNode(selectedNode.id, {
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
              )}

              {/* Load Node Properties */}
              {selectedNode.type === "load" && (
                <>
                  {/* Power */}
                  {nodeData.power !== undefined && (
                    <div>
                      <label className="block text-[12px] font-medium mb-1">
                        Power (MW/kW)
                      </label>
                      <input
                        type="text"
                        value={nodeData.power || ""}
                        disabled={!isEditMode}
                        onChange={(e) =>
                          onUpdateNode(selectedNode.id, {
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
                          onUpdateNode(selectedNode.id, {
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
              )}

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
                        onUpdateNode(selectedNode.id, {
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
                    <label className="block text-[12px] font-medium mb-1">
                      Color
                    </label>
                    <input
                      type="color"
                      value={nodeData.color}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        onUpdateNode(selectedNode.id, {
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
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={nodeData.bold || false}
                        disabled={!isEditMode}
                        onChange={(e) =>
                          onUpdateNode(selectedNode.id, {
                            ...nodeData,
                            bold: e.target.checked,
                          })
                        }
                      />
                      <span className="text-[12px]">Bold</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={nodeData.italic || false}
                        disabled={!isEditMode}
                        onChange={(e) =>
                          onUpdateNode(selectedNode.id, {
                            ...nodeData,
                            italic: e.target.checked,
                          })
                        }
                      />
                      <span className="text-[12px]">Italic</span>
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
                        onUpdateNode(selectedNode.id, {
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
                        onUpdateNode(selectedNode.id, {
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
              {nodeData.width !== undefined &&
                nodeData.height !== undefined && (
                  <>
                    <div>
                      <label className="block text-[12px] font-medium mb-1">
                        Width
                      </label>
                      <input
                        type="number"
                        value={nodeData.width}
                        disabled={!isEditMode}
                        onChange={(e) =>
                          onUpdateNode(selectedNode.id, {
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
                          onUpdateNode(selectedNode.id, {
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
                  <label className="block text-[12px] font-medium mb-1">
                    Radius
                  </label>
                  <input
                    type="number"
                    value={nodeData.radius}
                    disabled={!isEditMode}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
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

              {/* Connections - Always Read Only */}
              <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                <label className="block text-[12px] font-medium mb-2">
                  Connections
                </label>
                <div className="space-y-2">
                  {edges.filter(
                    (edge) =>
                      edge.source === selectedNode.id ||
                      edge.target === selectedNode.id
                  ).length === 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                      No connections
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {edges
                        .filter(
                          (edge) =>
                            edge.source === selectedNode.id ||
                            edge.target === selectedNode.id
                        )
                        .map((edge) => {
                          const isSource = edge.source === selectedNode.id;
                          const connectedNodeId = isSource
                            ? edge.target
                            : edge.source;
                          const connectedNode = nodes.find(
                            (n) => n.id === connectedNodeId
                          );
                          const direction = isSource ? "→" : "←";

                          return (
                            <div
                              key={edge.id}
                              className="text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600"
                            >
                              <div className="flex items-center gap-1">
                                <span className="font-mono text-blue-600 dark:text-blue-400">
                                  {direction}
                                </span>
                                <span className="font-medium">
                                  {connectedNode?.data?.label ||
                                    connectedNodeId}
                                </span>
                              </div>
                              <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                                {isSource ? "Output to" : "Input from"} • ID:{" "}
                                {connectedNodeId}
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Configure SCADA commands for this node
              </p>

              {/* Pembangkit Commands */}
              {selectedNode.type === "pembangkit" && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        status: "active",
                      });
                    }}
                    disabled={nodeData.status === "active" || mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      nodeData.status === "active"
                        ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                        : mode === "command"
                        ? "border-green-500 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ▶ START Generator
                    {nodeData.status === "active" && (
                      <span className="ml-2 text-xs">(Running)</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        status: "inactive",
                      });
                    }}
                    disabled={(nodeData.status === "inactive" || !nodeData.status) || mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      nodeData.status === "inactive" || !nodeData.status
                        ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                        : mode === "command"
                        ? "border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ⏹ STOP Generator
                    {(nodeData.status === "inactive" || !nodeData.status) && (
                      <span className="ml-2 text-xs">(Stopped)</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (nodeData.status === "active") {
                        alert("✓ Generator synchronized to grid!");
                      } else {
                        alert("✗ Cannot sync: Generator is not running. Start the generator first.");
                      }
                    }}
                    disabled={nodeData.status !== "active" || mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      nodeData.status !== "active" || mode !== "command"
                        ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                        : "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 cursor-pointer"
                    }`}
                  >
                    ⚡ SYNC to Grid
                    {nodeData.status !== "active" && (
                      <span className="ml-2 text-xs">(Requires Active)</span>
                    )}
                  </button>
                  
                  {/* Current Status Display */}
                  <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-600">
                    <div className="text-xs font-semibold mb-2 text-gray-400">Current Status</div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          nodeData.status === "active"
                            ? "bg-green-500 animate-pulse"
                            : "bg-gray-500"
                        }`}
                      />
                      <span className={`text-sm font-medium ${
                        nodeData.status === "active"
                          ? "text-green-400"
                          : "text-gray-400"
                      }`}>
                        {nodeData.status === "active" ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>
                    {nodeData.power && (
                      <div className="mt-2 text-xs text-gray-400">
                        Power: <span className="text-white">{nodeData.power} MW</span>
                      </div>
                    )}
                    {nodeData.voltage && (
                      <div className="text-xs text-gray-400">
                        Voltage: <span className="text-white">{nodeData.voltage} kV</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Switch/Circuit Breaker Commands */}
              {(selectedNode.type === "circuitBreaker" ||
                selectedNode.type === "switch" ||
                selectedNode.type === "disconnector") && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        status: "CLOSE",
                      });
                    }}
                    disabled={nodeData.status === "CLOSE" || mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      nodeData.status === "CLOSE"
                        ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                        : mode === "command"
                        ? "border-green-500 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ✓ CLOSE {selectedNode.type}
                    {nodeData.status === "CLOSE" && (
                      <span className="ml-2 text-xs">(Closed)</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        status: "OPEN",
                      });
                    }}
                    disabled={nodeData.status === "OPEN" || mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      nodeData.status === "OPEN"
                        ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                        : mode === "command"
                        ? "border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ✕ OPEN {selectedNode.type}
                    {nodeData.status === "OPEN" && (
                      <span className="ml-2 text-xs">(Opened)</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      alert(`✓ ${selectedNode.type} protection reset!`);
                    }}
                    disabled={mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      mode === "command"
                        ? "border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    🔄 RESET Protection
                  </button>
                  
                  {/* Current Status Display */}
                  <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-600">
                    <div className="text-xs font-semibold mb-2 text-gray-400">Current Status</div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          nodeData.status === "CLOSE"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className={`text-sm font-medium ${
                        nodeData.status === "CLOSE"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}>
                        {nodeData.status || "OPEN"}
                      </span>
                    </div>
                    {nodeData.voltage && (
                      <div className="mt-2 text-xs text-gray-400">
                        Voltage: <span className="text-white">{nodeData.voltage} kV</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Transformer Commands */}
              {selectedNode.type === "transformer" && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        status: "active",
                      });
                    }}
                    disabled={nodeData.status === "active" || mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      nodeData.status === "active"
                        ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                        : mode === "command"
                        ? "border-green-500 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ⚡ ENERGIZE Transformer
                    {nodeData.status === "active" && (
                      <span className="ml-2 text-xs">(Energized)</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        status: "inactive",
                      });
                    }}
                    disabled={(nodeData.status === "inactive" || !nodeData.status) || mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      nodeData.status === "inactive" || !nodeData.status
                        ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                        : mode === "command"
                        ? "border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ⏹ DE-ENERGIZE Transformer
                    {(nodeData.status === "inactive" || !nodeData.status) && (
                      <span className="ml-2 text-xs">(De-energized)</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      alert("✓ TAP position increased by 1");
                    }}
                    disabled={mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      mode === "command"
                        ? "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ⬆ TAP Change Up
                  </button>
                  <button
                    onClick={() => {
                      alert("✓ TAP position decreased by 1");
                    }}
                    disabled={mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      mode === "command"
                        ? "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ⬇ TAP Change Down
                  </button>
                </div>
              )}

              {/* Load Commands */}
              {selectedNode.type === "load" && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        status: "active",
                      });
                    }}
                    disabled={nodeData.status === "active" || mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      nodeData.status === "active"
                        ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                        : mode === "command"
                        ? "border-green-500 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ⚡ CONNECT Load
                    {nodeData.status === "active" && (
                      <span className="ml-2 text-xs">(Connected)</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onUpdateNode(selectedNode.id, {
                        ...nodeData,
                        status: "inactive",
                      });
                    }}
                    disabled={(nodeData.status === "inactive" || !nodeData.status) || mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      nodeData.status === "inactive" || !nodeData.status
                        ? "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                        : mode === "command"
                        ? "border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ⏹ DISCONNECT Load
                    {(nodeData.status === "inactive" || !nodeData.status) && (
                      <span className="ml-2 text-xs">(Disconnected)</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (nodeData.status === "active") {
                        onUpdateNode(selectedNode.id, {
                          ...nodeData,
                          status: "inactive",
                        });
                        alert("⚠ Load shedding executed - Load disconnected");
                      } else {
                        alert("ℹ Load is already disconnected");
                      }
                    }}
                    disabled={mode !== "command"}
                    className={`w-full px-3 py-2 text-[12px] border rounded text-left transition-all ${
                      mode === "command"
                        ? "border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 cursor-pointer"
                        : "border-gray-400 bg-gray-400/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ⚠ LOAD Shedding
                  </button>
                </div>
              )}

              {/* Generic Commands for other nodes */}
              {![
                "pembangkit",
                "circuitBreaker",
                "switch",
                "disconnector",
                "transformer",
                "load",
              ].includes(selectedNode.type || "") && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p className="text-[12px]">
                    No commands available for this node type
                  </p>
                </div>
              )}

              {mode === "edit" && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 p-2 rounded border border-yellow-500/30 mt-4">
                  ⚠️ Switch to command mode to execute
                </p>
              )}
            </div>
          )}
        </div>
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
                  <span className="text-[12px]">Off (Putih)</span>
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
                  <span className="text-[12px]">On (Hijau Animated)</span>
                </label>
              </div>
            </div>
          )}

          {/* Stroke Color - hanya tampil jika bukan electrical atau sedang aktif */}
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
