import React, { useCallback, useState, useRef, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ConnectionMode,
} from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { initialEdges, initialNodes } from "~/components/sld/dummyData";
import { ComponentSidebar } from "~/components/sld/SidebarComponent";
import { PropertiesPanel } from "~/components/sld/PropertiesPanel";
import Footer from "~/components/sld/Footer";
import Toolbar from "~/components/sld/Toolbar";
import { nodeTypes } from "~/components/sld/nodeType";
import { CustomizableEdge } from "~/components/sld/CustomizableEdge";
import {
  createNodeClickHandler,
  createEdgeClickHandler,
  createPaneClickHandler,
  createConnectHandler,
  createUpdateNodeHandler,
  createUpdateEdgeHandler,
  createClosePropertiesPanelHandler,
  createClearCanvasHandler,
  createExportJSONHandler,
  createImportJSONHandler,
  createUploadSVGHandler,
  createDragStartHandler,
  createDragOverHandler,
  createDropHandler,
} from "~/components/sld/handlers";

const edgeTypes = {
  customizable: CustomizableEdge,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  animated: false,
  style: { stroke: "#ffffff", strokeWidth: 2 },
};

const customNodeTypes = {
  ...nodeTypes,
};

const SLDPages = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const snapToGrid = true;
  const gridSize = 1;

  // Undo/Redo History
  const [history, setHistory] = useState<{
    nodes: Node[][];
    edges: Edge[][];
    currentIndex: number;
  }>({ nodes: [], edges: [], currentIndex: -1 });
  // console.log("History State:", history);

  // Track if this is the initial load
  const isInitialLoad = useRef(true);

  // Mode State
  const [mode, setMode] = useState<"edit" | "command">("edit");

  // Properties Panel State
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  // Normalize nodes - remove style/highlight data for comparison
  const normalizeNodes = useCallback((nodes: Node[]) => {
    return nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    }));
  }, []);

  // Normalize edges - remove style/animated data for comparison
  const normalizeEdges = useCallback((edges: Edge[]) => {
    return edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
      type: edge.type,
      data: edge.data,
    }));
  }, []);

  // Save state to history
  const saveToHistory = useCallback(
    (newNodes: Node[], newEdges: Edge[]) => {
      setHistory((prev) => {
        // Normalize data before saving (exclude styles)
        const normalizedNodes = normalizeNodes(newNodes);
        const normalizedEdges = normalizeEdges(newEdges);

        const newHistory = {
          nodes: [
            ...prev.nodes.slice(0, prev.currentIndex + 1),
            normalizedNodes as Node[],
          ],
          edges: [
            ...prev.edges.slice(0, prev.currentIndex + 1),
            normalizedEdges as Edge[],
          ],
          currentIndex: prev.currentIndex + 1,
        };
        // Limit history to 50 items
        if (newHistory.nodes.length > 50) {
          newHistory.nodes = newHistory.nodes.slice(-50);
          newHistory.edges = newHistory.edges.slice(-50);
          newHistory.currentIndex = 49;
        }
        return newHistory;
      });
    },
    [normalizeNodes, normalizeEdges]
  );

  // Undo function
  const handleUndo = useCallback(() => {
    if (history.currentIndex > 0) {
      const newIndex = history.currentIndex - 1;
      const restoredNodes = history.nodes[newIndex];
      const restoredEdges = history.edges[newIndex];

      // Restore without triggering style updates
      setNodes(restoredNodes);
      setEdges(restoredEdges);
      setHistory((prev) => ({ ...prev, currentIndex: newIndex }));

      // Clear selections to avoid highlight
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  }, [history, setNodes, setEdges]);

  // Redo function
  const handleRedo = useCallback(() => {
    if (history.currentIndex < history.nodes.length - 1) {
      const newIndex = history.currentIndex + 1;
      const restoredNodes = history.nodes[newIndex];
      const restoredEdges = history.edges[newIndex];

      // Restore without triggering style updates
      setNodes(restoredNodes);
      setEdges(restoredEdges);
      setHistory((prev) => ({ ...prev, currentIndex: newIndex }));

      // Clear selections to avoid highlight
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  }, [history, setNodes, setEdges]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "z" &&
        !event.shiftKey
      ) {
        event.preventDefault();
        handleUndo();
      } else if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "y" || (event.key === "z" && event.shiftKey))
      ) {
        event.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Save initial state to history
  useEffect(() => {
    if (isInitialLoad.current && nodes.length > 0) {
      isInitialLoad.current = false;
      // Save initial state as first history entry
      saveToHistory(nodes, edges);
    }
  }, [nodes, edges, saveToHistory]);

  // Track changes to nodes and edges
  useEffect(() => {
    // Skip if still initial load or no history yet
    if (isInitialLoad.current || history.currentIndex === -1) {
      return;
    }

    const timeoutId = setTimeout(() => {
      if (nodes.length >= 0 || edges.length >= 0) {
        const lastNodes = history.nodes[history.currentIndex];
        const lastEdges = history.edges[history.currentIndex];

        // Normalize current state (remove styles/highlights)
        const normalizedCurrentNodes = normalizeNodes(nodes);
        const normalizedCurrentEdges = normalizeEdges(edges);

        // Only save if there are actual meaningful changes (position, data, connections)
        // This excludes style/highlight changes
        const nodesChanged =
          JSON.stringify(lastNodes) !== JSON.stringify(normalizedCurrentNodes);
        const edgesChanged =
          JSON.stringify(lastEdges) !== JSON.stringify(normalizedCurrentEdges);

        if (nodesChanged || edgesChanged) {
          saveToHistory(nodes, edges);
        }
      }
    }, 500); // Debounce 500ms

    return () => clearTimeout(timeoutId);
  }, [
    nodes,
    edges,
    history.nodes,
    history.currentIndex,
    normalizeNodes,
    normalizeEdges,
    saveToHistory,
  ]);

  // Handlers
  const onConnect = useCallback(createConnectHandler(setEdges), [setEdges]);

  const onNodeClick = useCallback(
    createNodeClickHandler(
      setSelectedNode,
      setSelectedEdge,
      setNodes,
      setEdges
    ),
    [setNodes, setEdges]
  );

  const onEdgeClick = useCallback(
    createEdgeClickHandler(
      setSelectedEdge,
      setSelectedNode,
      setNodes,
      setEdges
    ),
    [setNodes, setEdges]
  );

  const handlePaneClick = useCallback(
    createPaneClickHandler(
      selectedTool,
      reactFlowInstance,
      snapToGrid,
      gridSize,
      setSelectedNode,
      setSelectedEdge,
      setNodes,
      setEdges,
      setSelectedTool
    ),
    [selectedTool, reactFlowInstance, snapToGrid, gridSize, setNodes, setEdges]
  );

  const handleUpdateNode = useCallback(
    createUpdateNodeHandler(setNodes, setSelectedNode),
    [setNodes]
  );

  const handleUpdateEdge = useCallback(
    createUpdateEdgeHandler(setEdges, setSelectedEdge),
    [setEdges]
  );

  const handleClosePropertiesPanel = useCallback(
    createClosePropertiesPanelHandler(
      setSelectedNode,
      setSelectedEdge,
      setNodes,
      setEdges
    ),
    [setNodes, setEdges]
  );

  const handleClearCanvas = useCallback(
    createClearCanvasHandler(
      setNodes,
      setEdges,
      setSelectedNode,
      setSelectedEdge
    ),
    [setNodes, setEdges]
  );

  const handleExportJSON = useCallback(createExportJSONHandler(nodes, edges), [
    nodes,
    edges,
  ]);

  const handleImportJSON = useCallback(
    createImportJSONHandler(
      setNodes,
      setEdges,
      setSelectedNode,
      setSelectedEdge
    ),
    [setNodes, setEdges]
  );

  const handleUploadSVG = useCallback(
    createUploadSVGHandler(setNodes, fileInputRef),
    [setNodes]
  );

  const onDragStart = createDragStartHandler();

  const onDragOver = useCallback(createDragOverHandler(), []);

  const onDrop = useCallback(
    createDropHandler(reactFlowInstance, snapToGrid, gridSize, setNodes),
    [reactFlowInstance, snapToGrid, gridSize, setNodes]
  );

  // Sidebar resize handlers
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

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <style>
        {mode === "command"
          ? `
          .react-flow__handle {
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `
          : ""}
      </style>
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
              className="w-0.5 bg-gray-200 dark:bg-[#494949] cursor-col-resize hover:bg-blue-500 transition-colors"
              onMouseDown={handleMouseDown}
              style={{ userSelect: "none" }}
            />
          </>
        )}

        <div className="flex flex-col flex-1 min-w-0">
          <Toolbar
            mode={mode}
            onModeChange={setMode}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={history.currentIndex > 0}
            canRedo={history.currentIndex < history.nodes.length - 1}
          />
          <div
            className="flex-1 min-w-0"
            style={{ cursor: selectedTool ? "crosshair" : "default" }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={mode === "edit" ? onNodesChange : undefined}
              onEdgesChange={mode === "edit" ? onEdgesChange : undefined}
              onConnect={mode === "edit" ? onConnect : undefined}
              onInit={setReactFlowInstance}
              onDrop={mode === "edit" ? onDrop : undefined}
              onDragOver={mode === "edit" ? onDragOver : undefined}
              onPaneClick={handlePaneClick}
              onNodeClick={onNodeClick}
              onEdgeClick={onEdgeClick}
              nodeTypes={customNodeTypes}
              edgeTypes={edgeTypes}
              defaultEdgeOptions={defaultEdgeOptions}
              proOptions={{ hideAttribution: true }}
              snapToGrid={snapToGrid}
              snapGrid={[gridSize, gridSize]}
              fitView
              connectionMode={ConnectionMode.Loose}
              nodesDraggable={mode === "edit"}
              nodesConnectable={mode === "edit"}
              nodesFocusable={mode === "edit"}
              edgesFocusable={mode === "edit"}
              elementsSelectable={true}
              connectOnClick={mode === "edit"}
              minZoom={0.001}
              maxZoom={1000}
            >
              <Controls showInteractive={false} showZoom={false} />
              <Background color="transparent" gap={gridSize} size={1} />
            </ReactFlow>
          </div>
        </div>

        {/* Properties Panel */}
        <PropertiesPanel
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onUpdateNode={handleUpdateNode}
          onUpdateEdge={handleUpdateEdge}
          onClose={handleClosePropertiesPanel}
          edges={edges}
          nodes={nodes}
        />
      </div>

      <Footer nodes={nodes} edges={edges} />
    </div>
  );
};

export default SLDPages;
