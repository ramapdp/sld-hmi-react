import { memo, useCallback, useMemo } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "reactflow";
import type { Node } from "reactflow";
import Source2 from "~/assets/icons/sources/Frame 479.svg";
import type { PembangkitNodeData } from "~/types/node-data.types";

interface PembangkitNodeProps {
  data: PembangkitNodeData;
  selected: boolean;
  id: string;
}

// Custom comparison function untuk memo
const arePropsEqual = (
  prevProps: PembangkitNodeProps,
  nextProps: PembangkitNodeProps
) => {
  // Check basic props
  if (prevProps.id !== nextProps.id || prevProps.selected !== nextProps.selected) {
    return false;
  }

  // Check critical data properties only
  const prevData = prevProps.data;
  const nextData = nextProps.data;

  return (
    prevData.status === nextData.status &&
    prevData.label === nextData.label &&
    prevData.power === nextData.power &&
    prevData.voltage === nextData.voltage &&
    prevData.colorConfig?.active === nextData.colorConfig?.active &&
    prevData.colorConfig?.inactive === nextData.colorConfig?.inactive
  );
};

export const PembangkitNode = memo(({ data, selected, id }: PembangkitNodeProps) => {
  const { setNodes, getNode } = useReactFlow();
  
  // Get size from node (not from data)
  const node = getNode(id);
  const size = useMemo(() => {
    if (node && 'width' in node && 'height' in node) {
      return { width: node.width as number, height: node.height as number };
    }
    return { width: 60, height: 60 };
  }, [node]);
  
  // Memoize color config
  const colorConfig = useMemo(() => data.colorConfig || {
    active: "#00ff00",
    inactive: "#808080",
  }, [data.colorConfig?.active, data.colorConfig?.inactive]);
  
  // Memoize current color calculation
  const status = data.status || "inactive";
  const currentColor = useMemo(
    () => status === "active" ? colorConfig.active : colorConfig.inactive,
    [status, colorConfig.active, colorConfig.inactive]
  );

  const handleResize = useCallback((e: any, params: any) => {
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
  }, [id, setNodes]);

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
      <svg
        width={size.width}
        height={size.height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transition: 'all 0.3s ease-in-out' }}
      >
        <circle cx="10" cy="8.5" r="5.5" stroke={currentColor} strokeWidth="0.8" />
        <path
          d="M6 8.875C6.70714 7.46008 8.42786 5.47919 10.125 8.875C11.8221 12.2708 13.3714 10.2899 14 8.875"
          stroke={currentColor}
          strokeWidth="0.8"
        />
        <path d="M10 14.2271V17.4998" stroke={currentColor} strokeWidth="0.8" />
      </svg>
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
}, arePropsEqual);

PembangkitNode.displayName = 'PembangkitNode';

interface Source2NodeData {
  label?: string;
}

export const Source2Node = memo(({ data }: { data: Source2NodeData }) => {
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
}, (prevProps, nextProps) => prevProps.data.label === nextProps.data.label);

Source2Node.displayName = 'Source2Node';
