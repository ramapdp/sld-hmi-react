import { memo, useState } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "reactflow";

// Line Node
export const LineNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: data.length || 100, height: 10 };

  const handleResize = (e: any, params: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              width: params.width,
              height: params.height,
            }
          : node
      )
    );
  };

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
          minWidth={30}
          minHeight={5}
          isVisible={selected}
          lineClassName="border-blue-500"
          onResize={handleResize}
        />
      )}
      <Handle position={Position.Top} id="top" />
      <div
        style={{
          width: size.width,
          height: size.height || data.thickness || 2,
          backgroundColor: data.color || "#ffffff",
          transform: `rotate(${data.angle || 0}deg)`,
        }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

// Custom SVG Node
export const CustomSVGNode = memo(({ data, selected, id }: any) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: data.width || 100, height: data.height || 100 };

  const handleResize = (e: any, params: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              width: params.width,
              height: params.height,
            }
          : node
      )
    );
  };

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
          minWidth={30}
          minHeight={30}
          isVisible={selected}
          lineClassName="border-blue-500"
          onResize={handleResize}
        />
      )}
      <Handle position={Position.Top} id="top" />
      {data.svgContent && (
        <div
          dangerouslySetInnerHTML={{ __html: data.svgContent }}
          style={{
            width: size.width,
            height: size.height,
          }}
        />
      )}
      {!data.svgContent && (
        <div
          style={{
            width: size.width,
            height: size.height,
            border: "2px dashed #888",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#888",
            fontSize: 12,
          }}
        >
          Upload SVG
        </div>
      )}
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

// Text Node
export const TextNode = memo(({ data, selected }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.label || "Text");

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      style={{
        padding: "4px 8px",
        fontSize: data.fontSize || 14,
        color: data.color || "#ffffff",
        fontWeight: data.bold ? "bold" : "normal",
        cursor: isEditing ? "text" : "pointer",
        border: selected ? "1px solid #3b82f6" : "none",
        backgroundColor: "transparent",
        transform: data.rotation ? `rotate(${data.rotation}deg)` : undefined,
      }}
    >
      {isEditing ? (
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            data.label = text;
          }}
          style={{
            background: "transparent",
            border: "none",
            color: data.color || "#ffffff",
            fontSize: data.fontSize || 14,
            outline: "none",
            width: "100%",
          }}
        />
      ) : (
        text
      )}
    </div>
  );
});

// Rectangle Node
export const RectangleNode = memo(({ data, selected }: any) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <div
        style={{
          width: data.width || 100,
          height: data.height || 60,
          backgroundColor: data.fillColor || "transparent",
          border: `${data.strokeWidth || 2}px solid ${
            data.strokeColor || "#ffffff"
          }`,
          borderRadius: data.borderRadius || 0,
        }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

// Circle Node
export const CircleNode = memo(({ data, selected }: any) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <div
        style={{
          width: data.diameter || 60,
          height: data.diameter || 60,
          backgroundColor: data.fillColor || "transparent",
          border: `${data.strokeWidth || 2}px solid ${
            data.strokeColor || "#ffffff"
          }`,
          borderRadius: "50%",
        }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});
