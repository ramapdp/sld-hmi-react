import { memo } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "reactflow";
import type { Node } from "reactflow";
import type { BusbarNodeData } from "~/types/node-data.types";

interface BusbarNodeProps {
  data: BusbarNodeData;
  selected: boolean;
  id: string;
}

export const BusbarNode = memo(({ data, selected, id }: BusbarNodeProps) => {
  const { setNodes, getNode } = useReactFlow();
  
  // Get size from node root level, not from data
  const node = getNode(id) as Node<BusbarNodeData> | undefined;
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 200, height: 20 };

  const handleResize = (e: any, params: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              // Set size at root level, not in data
              width: params.width,
              height: params.height,
            }
          : node
      )
    );
  };

  // Generate multiple connection points along the busbar
  // Calculate number of handles based on busbar width (excluding the default center ones)
  const numHandles = Math.max(3, Math.floor(size.width / 25));
  
  const topHandles = [];
  const bottomHandles = [];
  
  // Create evenly spaced handles along top and bottom
  for (let i = 0; i < numHandles; i++) {
    const position = (i / (numHandles - 1)) * 100; // Percentage position
    
    // Skip the center position (50%) to avoid overlap with default handles
    if (Math.abs(position - 50) > 5) {
      topHandles.push(
        <Handle
          key={`top-${i}`}
          position={Position.Top}
          id={`top-${i}`}
          style={{
            left: `${position}%`,
            top: 0,
          }}
        />
      );
      
      bottomHandles.push(
        <Handle
          key={`bottom-${i}`}
          position={Position.Bottom}
          id={`bottom-${i}`}
          style={{
            left: `${position}%`,
            bottom: 0,
          }}
        />
      );
    }
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selected && (
        <NodeResizer
          minWidth={50}
          minHeight={10}
          isVisible={selected}
          lineClassName="border-blue-500"
          onResize={handleResize}
        />
      )}
      
      {/* Default center handles for backward compatibility */}
      <Handle position={Position.Top} id="top" style={{ left: "50%" }} />
      <Handle position={Position.Bottom} id="bottom" style={{ left: "50%" }} />
      
      {/* Multiple handles along top */}
      {topHandles}
      
      {/* Multiple handles along bottom */}
      {bottomHandles}
      
      {/* Corner handles for left and right */}
      <Handle position={Position.Left} id="left" style={{ top: "50%" }} />
      <Handle position={Position.Right} id="right" style={{ top: "50%" }} />
      
      <div
        style={{
          width: size.width,
          height: size.height,
          backgroundColor: "#964B00",
         //  border: "2px solid #FF8C00",
        }}
      />
    </div>
  );
});
