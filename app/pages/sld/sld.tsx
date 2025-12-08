import React, { useCallback, useState, useRef, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ConnectionMode,
  SelectionMode
} from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { initialEdges, initialNodes } from "~/components/sld/dummyData";
import { ComponentSidebar } from "~/components/sld/SidebarComponent";
import { PropertiesPanel } from "~/components/sld/PropertiesPanel";
import Footer from "~/components/sld/Footer";
import Toolbar from "~/components/sld/Toolbar";
import { ContextMenu } from "~/components/sld/ContextMenu";
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
} as const;

const defaultEdgeOptions = {
  type: "smoothstep" as const,
  animated: false,
  style: { stroke: "#ffffff", strokeWidth: 2 },
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
  const [selectionMode, setSelectionMode] = useState<boolean>(false);

  // Properties Panel State
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  
  console.log("Selected Node:", selectedNode);
  // Clipboard State for multi-select
  const [clipboard, setClipboard] = useState<{
    nodes: Node[];
    edges: Edge[];
  } | null>(null);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

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

  // Keyboard shortcuts for undo/redo and rotate
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle selection mode with 's' or Space key
      if (mode === "edit" && event.key === "s" && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setSelectionMode(true);
      } else if (mode === "edit" && event.key === " " && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setSelectionMode(false);
      }
      
      // Only allow these shortcuts in edit mode
      if (mode === "edit") {
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
        } else if (event.key === "r" || event.key === "R") {
          // Rotate shortcut
          if (selectedNode) {
            event.preventDefault();
            handleRotateNode();
          }
        } else if (event.key === "Delete" || event.key === "Backspace") {
          // Delete shortcut
          const hasSelectedNodes = nodes.some((n) => n.selected);
          if (hasSelectedNodes || selectedNode || selectedEdge) {
            event.preventDefault();
            handleDelete();
          }
        } else if ((event.ctrlKey || event.metaKey) && event.key === "c") {
          // Copy shortcut
          const hasSelectedNodes = nodes.some((n) => n.selected);
          if (hasSelectedNodes || selectedNode) {
            event.preventDefault();
            handleCopy();
          }
        } else if ((event.ctrlKey || event.metaKey) && event.key === "v") {
          // Paste shortcut
          if (clipboard) {
            event.preventDefault();
            handlePaste();
          }
        } else if ((event.ctrlKey || event.metaKey) && event.key === "d") {
          // Duplicate shortcut
          const hasSelectedNodes = nodes.some((n) => n.selected);
          if (hasSelectedNodes || selectedNode) {
            event.preventDefault();
            handleDuplicate();
          }
        } else if ((event.ctrlKey || event.metaKey) && event.key === "x") {
          // Cut shortcut
          const hasSelectedNodes = nodes.some((n) => n.selected);
          if (hasSelectedNodes || selectedNode) {
            event.preventDefault();
            handleCut();
          }
        } else if ((event.ctrlKey || event.metaKey) && event.key === "g" && !event.shiftKey) {
          // Group shortcut
          const hasSelectedNodes = nodes.some((n) => n.selected);
          if (hasSelectedNodes) {
            event.preventDefault();
            handleGroup();
          }
        } else if ((event.ctrlKey || event.metaKey) && event.key === "g" && event.shiftKey) {
          // Ungroup shortcut
          const hasSelectedNodes = nodes.some((n) => n.selected);
          if (hasSelectedNodes) {
            event.preventDefault();
            handleUngroup();
          }
        } else if ((event.ctrlKey || event.metaKey) && event.key === "l" && !event.shiftKey) {
          // Lock position shortcut
          const hasSelectedNodes = nodes.some((n) => n.selected);
          if (hasSelectedNodes || selectedNode) {
            event.preventDefault();
            handleLockPosition();
          }
        } else if ((event.ctrlKey || event.metaKey) && event.key === "l" && event.shiftKey) {
          // Unlock position shortcut
          const hasSelectedNodes = nodes.some((n) => n.selected);
          if (hasSelectedNodes || selectedNode) {
            event.preventDefault();
            handleUnlockPosition();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo, selectedNode, selectedEdge, clipboard, mode, nodes]);

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

  const handleRotateNode = useCallback(() => {
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          const currentRotation = node.data.rotation || 0;
          const newRotation = (currentRotation + 90) % 360;
          
          return {
            ...node,
            data: {
              ...node.data,
              rotation: newRotation,
            },
          };
        }
        return node;
      })
    );

    // Update selectedNode to reflect the new rotation
    setSelectedNode((prevNode) => {
      if (!prevNode) return null;
      const currentRotation = prevNode.data.rotation || 0;
      const newRotation = (currentRotation + 90) % 360;
      
      return {
        ...prevNode,
        data: {
          ...prevNode.data,
          rotation: newRotation,
        },
      };
    });
  }, [selectedNode, setNodes]);

  const handleDelete = useCallback(() => {
    // Get all selected nodes
    const selectedNodes = nodes.filter((node) => node.selected);
    
    if (selectedNodes.length > 0) {
      // Delete all selected nodes and their connected edges
      const selectedNodeIds = selectedNodes.map((n) => n.id);
      
      setNodes((nds) => nds.filter((node) => !selectedNodeIds.includes(node.id)));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !selectedNodeIds.includes(edge.source) &&
            !selectedNodeIds.includes(edge.target)
        )
      );
      setSelectedNode(null);
    } else if (selectedNode) {
      // Delete single selected node from properties panel
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    } else if (selectedEdge) {
      // Delete selected edge
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  }, [nodes, selectedNode, selectedEdge, setNodes, setEdges]);

  const handleCut = useCallback(() => {
    // Copy first
    const selectedNodes = nodes.filter((node) => node.selected);
    
    if (selectedNodes.length === 0 && selectedNode) {
      selectedNodes.push(selectedNode);
    }
    
    if (selectedNodes.length > 0) {
      const selectedNodeIds = selectedNodes.map((n) => n.id);
      const connectedEdges = edges.filter(
        (edge) =>
          selectedNodeIds.includes(edge.source) &&
          selectedNodeIds.includes(edge.target)
      );
      
      setClipboard({
        nodes: selectedNodes,
        edges: connectedEdges,
      });
      
      // Then delete - inline implementation to avoid circular dependency
      setNodes((nds) => nds.filter((node) => !selectedNodeIds.includes(node.id)));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !selectedNodeIds.includes(edge.source) &&
            !selectedNodeIds.includes(edge.target)
        )
      );
      setSelectedNode(null);
    }
  }, [nodes, edges, selectedNode, setNodes, setEdges]);

  const handleCopy = useCallback(() => {
    // Get all selected nodes
    const selectedNodes = nodes.filter((node) => node.selected);
    
    if (selectedNodes.length === 0 && selectedNode) {
      // Fallback to single selected node from properties panel
      selectedNodes.push(selectedNode);
    }
    
    if (selectedNodes.length > 0) {
      // Get node IDs
      const selectedNodeIds = selectedNodes.map((n) => n.id);
      
      // Get edges that connect between selected nodes
      const connectedEdges = edges.filter(
        (edge) =>
          selectedNodeIds.includes(edge.source) &&
          selectedNodeIds.includes(edge.target)
      );
      
      setClipboard({
        nodes: selectedNodes,
        edges: connectedEdges,
      });
    }
  }, [nodes, edges, selectedNode]);

  const handlePaste = useCallback(() => {
    if (!clipboard || clipboard.nodes.length === 0) return;

    const timestamp = Date.now();
    const idMapping: { [key: string]: string } = {};
    
    // Create new nodes with new IDs
    const newNodes: Node[] = clipboard.nodes.map((node, index) => {
      const newId = `${node.type}-${timestamp}-${index}`;
      idMapping[node.id] = newId;
      
      return {
        ...node,
        id: newId,
        position: {
          x: node.position.x + 50,
          y: node.position.y + 50,
        },
        selected: true,
        data: {
          ...node.data,
        },
      };
    });
    
    // Create new edges with updated source/target IDs
    const newEdges: Edge[] = clipboard.edges.map((edge, index) => {
      const newId = `edge-${timestamp}-${index}`;
      
      return {
        ...edge,
        id: newId,
        source: idMapping[edge.source],
        target: idMapping[edge.target],
        selected: false,
      };
    });

    // Deselect all existing nodes
    setNodes((nds) =>
      nds.map((n) => ({ ...n, selected: false })).concat(newNodes)
    );
    
    // Add new edges
    setEdges((eds) => eds.concat(newEdges));
    
    // Clear single selection
    setSelectedNode(null);
    setSelectedEdge(null);
  }, [clipboard, setNodes, setEdges]);

  const handleDuplicate = useCallback(() => {
    // Get all selected nodes
    const selectedNodes = nodes.filter((node) => node.selected);
    
    if (selectedNodes.length === 0 && selectedNode) {
      // Fallback to single selected node from properties panel
      selectedNodes.push(selectedNode);
    }
    
    if (selectedNodes.length === 0) return;

    const timestamp = Date.now();
    const idMapping: { [key: string]: string } = {};
    
    // Get node IDs
    const selectedNodeIds = selectedNodes.map((n) => n.id);
    
    // Get edges that connect between selected nodes
    const connectedEdges = edges.filter(
      (edge) =>
        selectedNodeIds.includes(edge.source) &&
        selectedNodeIds.includes(edge.target)
    );
    
    // Create new nodes with new IDs
    const newNodes: Node[] = selectedNodes.map((node, index) => {
      const newId = `${node.type}-${timestamp}-${index}`;
      idMapping[node.id] = newId;
      
      return {
        ...node,
        id: newId,
        position: {
          x: node.position.x + 50,
          y: node.position.y + 50,
        },
        selected: true,
        data: {
          ...node.data,
        },
      };
    });
    
    // Create new edges with updated source/target IDs
    const newEdges: Edge[] = connectedEdges.map((edge, index) => {
      const newId = `edge-${timestamp}-${index}`;
      
      return {
        ...edge,
        id: newId,
        source: idMapping[edge.source],
        target: idMapping[edge.target],
        selected: false,
      };
    });

    // Deselect all existing nodes and add new nodes
    setNodes((nds) =>
      nds.map((n) => ({ ...n, selected: false })).concat(newNodes)
    );
    
    // Add new edges
    setEdges((eds) => eds.concat(newEdges));
    
    // Clear single selection
    setSelectedNode(null);
  }, [nodes, edges, selectedNode, setNodes, setEdges]);

  const handleGroup = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    if (selectedNodes.length < 2) return;

    const groupId = `group-${Date.now()}`;
    setNodes((nds) =>
      nds.map((node) =>
        node.selected
          ? { ...node, data: { ...node.data, groupId } }
          : node
      )
    );
  }, [nodes, setNodes]);

  const handleUngroup = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    if (selectedNodes.length === 0) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.selected && node.data.groupId) {
          const { groupId, ...restData } = node.data;
          return { ...node, data: restData };
        }
        return node;
      })
    );
  }, [nodes, setNodes]);

  const handleLockPosition = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    if (selectedNodes.length === 0 && selectedNode) {
      selectedNodes.push(selectedNode);
    }

    console.log("Locking nodes:", selectedNodes);
    if (selectedNodes.length > 0) {
      const selectedNodeIds = selectedNodes.map((n) => n.id);
      
      setNodes((nds) =>
        nds.map((node) =>
          selectedNodeIds.includes(node.id)
            ? { ...node, draggable: false, data: { ...node.data, locked: true } }
            : node
        )
      );
    }
  }, [nodes, selectedNode, setNodes]);

  const handleUnlockPosition = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    if (selectedNodes.length === 0 && selectedNode) {
      selectedNodes.push(selectedNode);
    }

    if (selectedNodes.length > 0) {
      const selectedNodeIds = selectedNodes.map((n) => n.id);
      
      setNodes((nds) =>
        nds.map((node) => {
          if (selectedNodeIds.includes(node.id)) {
            const { locked, ...restData } = node.data;
            console.log(`Unlocking node ${node.id}`);
            return { ...node, draggable: true, data: restData };
          }
          return node;
        })
      );
    }
  }, [nodes, selectedNode, setNodes]);

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

  // Apply dynamic styles for rotation
  useEffect(() => {
    const styleId = "react-flow-rotation-styles";
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    const rotationStyles = nodes
      .filter((node) => node.data.rotation)
      .map(
        (node) => `
        .react-flow__node[data-id="${node.id}"] > div {
          transform: rotate(${node.data.rotation}deg);
        }
      `
      )
      .join("");
    
    styleElement.textContent = `
      .react-flow__node {
        transform-origin: center center;
      }
      ${rotationStyles}
    `;
    
    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [nodes]);

  // Handle context menu
  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      // Only show context menu if there are selected nodes or a single selected node/edge
      const hasSelectedNodes = nodes.some((n) => n.selected);
      const hasSelection = hasSelectedNodes || selectedNode || selectedEdge;
      
      if (!hasSelection) {
        return; // Don't show context menu if nothing is selected
      }
      
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
      });
    },
    [nodes, selectedNode, selectedEdge]
  );

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Apply command mode styles
  useEffect(() => {
    const styleId = "react-flow-command-mode-styles";
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = mode === "command"
      ? `
        .react-flow__handle {
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `
      : "";
    
    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [mode]);

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
            canUndo={history.currentIndex > 0 && mode === "edit"}
            canRedo={history.currentIndex < history.nodes.length - 1 && mode === "edit"}
            hasSelectedNode={!!selectedNode && mode === "edit"}
            onRotate={handleRotateNode}
            hasSelectedElement={!!(selectedNode || selectedEdge) && mode === "edit"}
            onDelete={handleDelete}
            selectionMode={selectionMode}
            onSelectionModeChange={setSelectionMode}
          />
          <div
            className="flex-1 min-w-0"
            style={{ 
              cursor: selectedTool 
                ? "crosshair" 
                : selectionMode === true 
                  ? "grab" 
                  : "default" 
            }}
            onContextMenu={handleContextMenu}
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
              nodeTypes={nodeTypes}
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
              elementsSelectable={mode === "edit" && selectionMode === true}
              connectOnClick={mode === "edit" && selectionMode === true}
              selectionOnDrag={mode === "edit" && selectionMode === true}
              panOnDrag={selectionMode === false || mode === "command" ? true : [1, 2]}
              selectionMode={SelectionMode.Partial}
              multiSelectionKeyCode="Shift"
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
          mode={mode}
        />
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onCopy={handleCopy}
          onCut={handleCut}
          onPaste={clipboard ? handlePaste : undefined}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onGroup={handleGroup}
          onUngroup={handleUngroup}
          onLockPosition={handleLockPosition}
          onUnlockPosition={handleUnlockPosition}
          hasClipboard={!!clipboard}
          hasSelection={nodes.some((n) => n.selected) || !!selectedNode}
          hasGroup={nodes.some((n) => n.selected && n.data.groupId)}
          hasLockedNodes={nodes.some((n) => n.selected && n.data.locked)}
        />
      )}

      <Footer nodes={nodes} edges={edges} />
    </div>
  );
};

export default SLDPages;
