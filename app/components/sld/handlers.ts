import type { Node, Edge } from "reactflow";
import { addEdge } from "reactflow";

// Handle node click
export const createNodeClickHandler = (
  setSelectedNode: (node: Node | null) => void,
  setSelectedEdge: (edge: Edge | null) => void,
  setNodes: (fn: (nds: Node[]) => Node[]) => void,
  setEdges: (fn: (eds: Edge[]) => Edge[]) => void
) => {
  return (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);

    // Highlight the selected node
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: {
          ...n.style,
          outline: n.id === node.id ? "3px solid #3b82f6" : "none",
          outlineOffset: n.id === node.id ? "2px" : "0px",
        },
      }))
    );

    // Highlight connected edges
    setEdges((eds) =>
      eds.map((edge) => {
        const isConnected = edge.source === node.id || edge.target === node.id;

        if (isConnected) {
          // Highlight connected edges
          return {
            ...edge,
            style: {
              ...edge.style,
              stroke: "#3b82f6",
              strokeWidth: 3,
              strokeDasharray: "0",
            },
            animated: true,
          };
        } else {
          // Reset to original state based on isActive
          if (edge.data?.isActive === true) {
            return {
              ...edge,
              style: {
                ...edge.style,
                stroke: "#22c55e",
                strokeWidth: 3,
                strokeDasharray: "5,5",
              },
              animated: true,
            };
          } else if (edge.data?.isActive === false) {
            return {
              ...edge,
              style: {
                ...edge.style,
                stroke: "#ffffff",
                strokeWidth: 2,
                strokeDasharray: "0",
              },
              animated: false,
            };
          } else {
            // Default for non-electrical edges
            return edge;
          }
        }
      })
    );
  };
};

// Handle edge click
export const createEdgeClickHandler = (
  setSelectedEdge: (edge: Edge | null) => void,
  setSelectedNode: (node: Node | null) => void,
  setNodes: (fn: (nds: Node[]) => Node[]) => void,
  setEdges: (fn: (eds: Edge[]) => Edge[]) => void
) => {
  return (event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);

    // Reset node highlights
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: {
          ...n.style,
          outline: "none",
          outlineOffset: "0px",
        },
      }))
    );

    // Highlight the selected edge
    setEdges((eds) =>
      eds.map((e) => {
        if (e.id === edge.id) {
          // Highlight selected edge
          return {
            ...e,
            style: {
              ...e.style,
              stroke: "#3b82f6",
              strokeWidth: 4,
              strokeDasharray: "0",
            },
            animated: true,
          };
        } else {
          // Reset to original state based on isActive
          if (e.data?.isActive === true) {
            return {
              ...e,
              style: {
                ...e.style,
                stroke: "#22c55e",
                strokeWidth: 3,
                strokeDasharray: "5,5",
              },
              animated: true,
            };
          } else if (e.data?.isActive === false) {
            return {
              ...e,
              style: {
                ...e.style,
                stroke: "#ffffff",
                strokeWidth: 2,
                strokeDasharray: "0",
              },
              animated: false,
            };
          } else {
            // Default for non-electrical edges
            return e;
          }
        }
      })
    );
  };
};

// Reset highlights helper
const resetHighlights = (
  setNodes: (fn: (nds: Node[]) => Node[]) => void,
  setEdges: (fn: (eds: Edge[]) => Edge[]) => void
) => {
  // Reset node highlights
  setNodes((nds) =>
    nds.map((n) => ({
      ...n,
      style: {
        ...n.style,
        outline: "none",
        outlineOffset: "0px",
      },
    }))
  );

  // Reset edge highlights
  setEdges((eds) =>
    eds.map((edge) => {
      // Reset to original state based on isActive
      if (edge.data?.isActive === true) {
        return {
          ...edge,
          style: {
            ...edge.style,
            stroke: "#22c55e",
            strokeWidth: 3,
            strokeDasharray: "5,5",
          },
          animated: true,
        };
      } else if (edge.data?.isActive === false) {
        return {
          ...edge,
          style: {
            ...edge.style,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeDasharray: "0",
          },
          animated: false,
        };
      } else {
        // Default for non-electrical edges
        return edge;
      }
    })
  );
};

// Handle pane click (deselect)
export const createPaneClickHandler = (
  selectedTool: string | null,
  reactFlowInstance: any,
  snapToGrid: boolean,
  gridSize: number,
  setSelectedNode: (node: Node | null) => void,
  setSelectedEdge: (edge: Edge | null) => void,
  setNodes: (fn: (nds: Node[]) => Node[]) => void,
  setEdges: (fn: (eds: Edge[]) => Edge[]) => void,
  setSelectedTool: (tool: string | null) => void
) => {
  const snapToGridPosition = (position: { x: number; y: number }) => {
    if (!snapToGrid) return position;
    return {
      x: Math.round(position.x / gridSize) * gridSize,
      y: Math.round(position.y / gridSize) * gridSize,
    };
  };

  return (event: React.MouseEvent) => {
    if (!selectedTool) {
      setSelectedNode(null);
      setSelectedEdge(null);
      resetHighlights(setNodes, setEdges);
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
  };
};

// Handle connect
export const createConnectHandler = (
  setEdges: (fn: (eds: Edge[]) => Edge[]) => void
) => {
  return (params: any) => {
    const newEdge = {
      ...params,
      type: "smoothstep",
      data: {
        isElectrical: true,
        isActive: false, // default mati
        edgeType: "smoothstep",
      },
      animated: false,
      style: {
        stroke: "#ffffff",
        strokeWidth: 2,
        strokeDasharray: "0", // solid untuk mati
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  };
};

// Update node data
export const createUpdateNodeHandler = (
  setNodes: (fn: (nds: Node[]) => Node[]) => void,
  setSelectedNode: (fn: (prev: Node | null) => Node | null) => void
) => {
  return (nodeId: string, newData: any) => {
    // Check if newData contains special __nodeSize property
    const { __nodeSize, ...dataWithoutSize } = newData;
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = { ...node, data: dataWithoutSize };
          // If __nodeSize is provided, update node's width and height at root level
          if (__nodeSize) {
            updatedNode.width = __nodeSize.width;
            updatedNode.height = __nodeSize.height;
          }
          return updatedNode;
        }
        return node;
      })
    );
    
    // Update selected node to reflect changes
    setSelectedNode((prev) => {
      if (prev && prev.id === nodeId) {
        const updatedNode = { ...prev, data: dataWithoutSize };
        // If __nodeSize is provided, update node's width and height at root level
        if (__nodeSize) {
          updatedNode.width = __nodeSize.width;
          updatedNode.height = __nodeSize.height;
        }
        return updatedNode;
      }
      return prev;
    });
  };
};

// Update edge style
export const createUpdateEdgeHandler = (
  setEdges: (fn: (eds: Edge[]) => Edge[]) => void,
  setSelectedEdge: (fn: (prev: Edge | null) => Edge | null) => void
) => {
  return (edgeId: string, newStyle: any) => {
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
          // Handle data separately
          if (newStyle.data) {
            updatedEdge.data = { ...edge.data, ...newStyle.data };
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
          animated:
            newStyle.animated !== undefined ? newStyle.animated : prev.animated,
          data: newStyle.data ? { ...prev.data, ...newStyle.data } : prev.data,
        };
      }
      return prev;
    });
  };
};

// Close properties panel and reset highlights
export const createClosePropertiesPanelHandler = (
  setSelectedNode: (node: Node | null) => void,
  setSelectedEdge: (edge: Edge | null) => void,
  setNodes: (fn: (nds: Node[]) => Node[]) => void,
  setEdges: (fn: (eds: Edge[]) => Edge[]) => void
) => {
  return () => {
    setSelectedNode(null);
    setSelectedEdge(null);
    resetHighlights(setNodes, setEdges);
  };
};

// Clear canvas
export const createClearCanvasHandler = (
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
  setSelectedNode: (node: Node | null) => void,
  setSelectedEdge: (edge: Edge | null) => void
) => {
  return () => {
    if (window.confirm("Are you sure you want to clear the canvas?")) {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  };
};

// Export JSON
export const createExportJSONHandler = (nodes: Node[], edges: Edge[]) => {
  return () => {
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
};

// Import JSON
export const createImportJSONHandler = (
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
  setSelectedNode: (node: Node | null) => void,
  setSelectedEdge: (edge: Edge | null) => void
) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
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
};

// Upload SVG
export const createUploadSVGHandler = (
  setNodes: (fn: (nds: Node[]) => Node[]) => void,
  fileInputRef: React.RefObject<HTMLInputElement | null>
) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };
};

// Drag and Drop handlers
export const createDragStartHandler = () => {
  return (event: React.DragEvent<HTMLDivElement>, nodeType: string, data: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/nodedata", JSON.stringify(data));
    event.dataTransfer.effectAllowed = "move";
  };
};

export const createDragOverHandler = () => {
  return (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
};

export const createDropHandler = (
  reactFlowInstance: any,
  snapToGrid: boolean,
  gridSize: number,
  setNodes: (fn: (nds: Node[]) => Node[]) => void
) => {
  const snapToGridPosition = (position: { x: number; y: number }) => {
    if (!snapToGrid) return position;
    return {
      x: Math.round(position.x / gridSize) * gridSize,
      y: Math.round(position.y / gridSize) * gridSize,
    };
  };

  return (event: React.DragEvent<HTMLDivElement>) => {
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
      width: 60,
      height: 60,
    };

    setNodes((nds) => nds.concat(newNode));
  };
};
