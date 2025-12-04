import React, { useState, useCallback } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
  useReactFlow,
} from "reactflow";
import type { EdgeProps } from "reactflow";

export const CustomizableEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  selected,
}) => {
  const { setEdges, screenToFlowPosition } = useReactFlow();
  const [isDragging, setIsDragging] = useState(false);

  // Get control points from edge data or calculate default
  const controlPoints = data?.controlPoints || [];

  // Calculate path based on type
  const edgeType = data?.edgeType || "smoothstep";
  
  let path = "";
  let labelX = 0;
  let labelY = 0;

  if (edgeType === "bezier" && controlPoints.length >= 2) {
    // Custom bezier with control points
    const [cp1, cp2] = controlPoints;
    [path, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      curvature: 0.25,
    });
  } else if (edgeType === "smoothstep") {
    // Smooth step path with optional waypoints
    const centerX = data?.centerX ?? (sourceX + targetX) / 2;
    const centerY = data?.centerY ?? (sourceY + targetY) / 2;
    
    [path, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      centerX,
      centerY,
    });
  } else {
    // Default smooth step
    [path, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  }

  // Handle control point drag
  const handleControlPointDrag = useCallback(
    (index: number, event: React.MouseEvent) => {
      event.stopPropagation();
      
      const startX = event.clientX;
      const startY = event.clientY;
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        setEdges((edges) =>
          edges.map((edge) => {
            if (edge.id === id) {
              const newControlPoints = [...(edge.data?.controlPoints || [])];
              if (newControlPoints[index]) {
                newControlPoints[index] = {
                  x: newControlPoints[index].x + deltaX,
                  y: newControlPoints[index].y + deltaY,
                };
              }
              return {
                ...edge,
                data: {
                  ...edge.data,
                  controlPoints: newControlPoints,
                },
              };
            }
            return edge;
          })
        );
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      setIsDragging(true);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [id, setEdges]
  );

  // Handle center point drag for smoothstep
  const handleCenterDrag = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      setIsDragging(true);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        // Convert screen position to flow position
        const flowPosition = screenToFlowPosition({
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        });

        setEdges((edges) =>
          edges.map((edge) => {
            if (edge.id === id) {
              return {
                ...edge,
                data: {
                  ...edge.data,
                  centerX: flowPosition.x,
                  centerY: flowPosition.y,
                },
              };
            }
            return edge;
          })
        );
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [id, setEdges, screenToFlowPosition]
  );

  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} style={style} />
      
      {/* Render control point for smoothstep edges - only when selected */}
      {edgeType === "smoothstep" && selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
              zIndex: 1000,
            }}
            className="nodrag nopan"
          >
            <div
              onMouseDown={handleCenterDrag}
              style={{
                width: 14,
                height: 14,
                background: "#3b82f6",
                border: "2px solid #fff",
                borderRadius: "50%",
                cursor: isDragging ? "grabbing" : "grab",
                boxShadow: "0 0 8px rgba(59, 130, 246, 0.8)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
        </EdgeLabelRenderer>
      )}

      {/* Render control points for bezier - only when selected */}
      {edgeType === "bezier" && controlPoints.length > 0 && selected && (
        <EdgeLabelRenderer>
          {controlPoints.map((point: any, index: number) => (
            <div
              key={index}
              style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${point.x}px,${point.y}px)`,
                pointerEvents: "all",
                zIndex: 1000,
              }}
              className="nodrag nopan"
            >
              <div
                onMouseDown={(e) => handleControlPointDrag(index, e)}
                style={{
                  width: 12,
                  height: 12,
                  background: "#10b981",
                  border: "2px solid #fff",
                  borderRadius: "50%",
                  cursor: isDragging ? "grabbing" : "grab",
                  boxShadow: "0 0 6px rgba(16, 185, 129, 0.8)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
          ))}
        </EdgeLabelRenderer>
      )}
    </>
  );
};
