import { memo } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "reactflow";
import ManualSet1 from "~/assets/icons/manual-set/Frame 478.svg";
import ManualSet2 from "~/assets/icons/manual-set/Frame 486.svg";

export const ManualSet1Node = memo(({ data, selected, id }) => {
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
        src={ManualSet1}
        alt="Manual Set 1"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const ManualSet2Node = memo(({ data, selected, id }) => {
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
        src={ManualSet2}
        alt="Manual Set 2"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});
