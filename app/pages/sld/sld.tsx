import React, { useCallback, useState, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  addEdge,
  MarkerType,
} from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { initialEdges, initialNodes } from "~/components/sld/dummyData";
import { ComponentSidebar } from "~/components/sld/SidebarComponent";
import { PropertiesPanel } from "~/components/sld/PropertiesPanel";
import {
  BreakerNode,
  TrafoNode,
  BusNode,
  GeneratorNode,
  LoadNode,
  CapacitorNode,
  RelayNode,
  MeterNode,
  LineNode,
  CustomSVGNode,
  TextNode,
  RectangleNode,
  CircleNode,
  DisconnectorNode,
  LoadSwitchNode,
  EarthSwitchNode,
  MotorNode,
  FuseNode,
  CurrentTransformerNode,
  VoltageTransformerNode,
  GroundNode,
} from "~/components/sld/SLDNodeComponents";

const nodeTypes = {
  breaker: BreakerNode,
  trafo: TrafoNode,
  bus: BusNode,
  generator: GeneratorNode,
  load: LoadNode,
  capacitor: CapacitorNode,
  relay: RelayNode,
  meter: MeterNode,
  line: LineNode,
  customSVG: CustomSVGNode,
  text: TextNode,
  rectangle: RectangleNode,
  circle: CircleNode,
  disconnector: DisconnectorNode,
  loadSwitch: LoadSwitchNode,
  earthSwitch: EarthSwitchNode,
  motor: MotorNode,
  fuse: FuseNode,
  currentTransformer: CurrentTransformerNode,
  voltageTransformer: VoltageTransformerNode,
  ground: GroundNode,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  animated: false,
  style: { stroke: "#ffffff", strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#ffffff",
  },
};

const SLDPages = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(10);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Properties Panel State
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: "smoothstep",
        animated: selectedTool === "electricalLine",
        style: {
          stroke: selectedTool === "electricalLine" ? "#10b981" : "#ffffff",
          strokeWidth: 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: selectedTool === "electricalLine" ? "#10b981" : "#ffffff",
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, selectedTool]
  );

  // Handle node click
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  // Handle edge click
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  // Handle pane click (deselect)
  const handlePaneClick = useCallback(
    (event: React.MouseEvent) => {
      if (!selectedTool) {
        setSelectedNode(null);
        setSelectedEdge(null);
      }

      // Original pane click logic for tools
      if (!selectedTool || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const snappedPosition = snapToGridPosition(position);

      let newNode: Node | null = null;

      switch (selectedTool) {
        case "text":
          newNode = {
            id: `text-${Date.now()}`,
            type: "text",
            position: snappedPosition,
            data: { label: "Text", fontSize: 14, color: "#ffffff" },
          };
          break;
        case "rectangle":
          newNode = {
            id: `rect-${Date.now()}`,
            type: "rectangle",
            position: snappedPosition,
            data: {
              width: 100,
              height: 60,
              fill: "#3b82f6",
              stroke: "#1e40af",
            },
          };
          break;
        case "circle":
          newNode = {
            id: `circle-${Date.now()}`,
            type: "circle",
            position: snappedPosition,
            data: { radius: 30, fill: "#3b82f6", stroke: "#1e40af" },
          };
          break;
        case "line":
          newNode = {
            id: `line-${Date.now()}`,
            type: "line",
            position: snappedPosition,
            data: { length: 100, angle: 0, color: "#ffffff", thickness: 2 },
          };
          break;
      }

      if (newNode) {
        setNodes((nds) => nds.concat(newNode));
        setSelectedTool(null);
      }
    },
    [selectedTool, reactFlowInstance, setNodes, snapToGrid, gridSize]
  );

  // Update node data
  const handleUpdateNode = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: newData } : node
        )
      );
      // Update selected node to reflect changes
      setSelectedNode((prev) =>
        prev && prev.id === nodeId ? { ...prev, data: newData } : prev
      );
    },
    [setNodes]
  );

  // Update edge style
  const handleUpdateEdge = useCallback(
    (edgeId: string, newStyle: any) => {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === edgeId) {
            const updatedEdge = {
              ...edge,
              style: { ...edge.style, ...newStyle },
            };
            // Handle type change separately
            if (newStyle.type) {
              updatedEdge.type = newStyle.type;
            }
            // Handle animated separately
            if (newStyle.animated !== undefined) {
              updatedEdge.animated = newStyle.animated;
            }
            return updatedEdge;
          }
          return edge;
        })
      );
      // Update selected edge to reflect changes
      setSelectedEdge((prev) => {
        if (prev && prev.id === edgeId) {
          return {
            ...prev,
            style: { ...prev.style, ...newStyle },
            type: newStyle.type || prev.type,
            animated: newStyle.animated !== undefined ? newStyle.animated : prev.animated,
          };
        }
        return prev;
      });
    },
    [setEdges]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth >= 250 && newWidth <= 600) {
        setSidebarWidth(newWidth);
      }
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    data: any
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/nodedata", JSON.stringify(data));
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const snapToGridPosition = (position: { x: number; y: number }) => {
    if (!snapToGrid) return position;
    return {
      x: Math.round(position.x / gridSize) * gridSize,
      y: Math.round(position.y / gridSize) * gridSize,
    };
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const dataStr = event.dataTransfer.getData("application/nodedata");

      if (typeof type === "undefined" || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const snappedPosition = snapToGridPosition(position);

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position: snappedPosition,
        data: JSON.parse(dataStr),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, snapToGrid, gridSize]
  );

  const handleUploadSVG = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const svgContent = e.target?.result as string;
        const newNode: Node = {
          id: `svg-${Date.now()}`,
          type: "customSVG",
          position: { x: 100, y: 100 },
          data: { svgContent, width: 100, height: 100 },
        };
        setNodes((nds) => nds.concat(newNode));
      };
      reader.readAsText(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [setNodes]
  );

  const handleClearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the canvas?")) {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  };

  const handleExportJSON = () => {
    const data = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sld-diagram-${Date.now()}.json`;
    link.click();
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
        setSelectedNode(null);
        setSelectedEdge(null);
      } catch (error) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <input
        ref={fileInputRef}
        type="file"
        accept=".svg"
        style={{ display: "none" }}
        onChange={handleUploadSVG}
      />
      <input
        id="import-json"
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={handleImportJSON}
      />

      <div className="flex flex-row flex-1 min-h-0 relative">
        {isSidebarOpen && (
          <>
            <ComponentSidebar
              sidebarWidth={sidebarWidth}
              onClose={() => setIsSidebarOpen(false)}
              onDragStart={onDragStart}
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
              onUploadSVG={() => fileInputRef.current?.click()}
              onClear={handleClearCanvas}
              onExport={handleExportJSON}
              onImport={() => document.getElementById("import-json")?.click()}
            />
            <div
              className="w-0.5 bg-gray-200 dark:bg-gray-800 cursor-col-resize hover:bg-blue-500 transition-colors"
              onMouseDown={handleMouseDown}
              style={{ userSelect: "none" }}
            />
          </>
        )}

        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-2 top-2 z-10 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Open sidebar"
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
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        <div
          className="flex-1 min-w-0"
          style={{ cursor: selectedTool ? "crosshair" : "default" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onPaneClick={handlePaneClick}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            proOptions={{ hideAttribution: true }}
            snapToGrid={true}
            snapGrid={[10, 10]}
            fitView
          >
            <Controls />
            <Background color="transparent" gap={gridSize} size={1} />
          </ReactFlow>
        </div>

        {/* Properties Panel */}
        <PropertiesPanel
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onUpdateNode={handleUpdateNode}
          onUpdateEdge={handleUpdateEdge}
          onClose={() => {
            setSelectedNode(null);
            setSelectedEdge(null);
          }}
        />
      </div>
      
      <footer>
        <div className="p-2 border-t border-gray-200 dark:border-gray-700 h-fit flex justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 HMI SLD Application
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Nodes: {nodes.length} | Edges: {edges.length}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SLDPages;