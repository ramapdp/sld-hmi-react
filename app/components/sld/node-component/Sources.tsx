import { memo } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "reactflow";
import Pembangkit from "~/assets/icons/generator-loads/Frame 480.svg";
import Source2 from "~/assets/icons/sources/Frame 479.svg";

export const PembangkitNode = memo(({ data, selected, id }) => {
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
        src={Pembangkit}
        alt="Pembangkit"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const Source2Node = memo(({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <img src={Source2} alt="Source 2" style={{ width: 60, height: "auto" }} />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});
