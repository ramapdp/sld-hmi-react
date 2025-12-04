import { memo } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "reactflow";
import Ground from "~/assets/icons/grounding-elements/Frame 478(1).svg";

export const GroundNode = memo(({ data, selected, id }) => {
  const { setNodes } = useReactFlow();
  const size = data.size || { width: 60, height: 60 };

  const handleResize = (e: any, params: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                size: { width: params.width, height: params.height },
              },
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
      <img
        src={Ground}
        alt="Ground"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});
