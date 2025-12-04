import { memo } from "react";
import { Handle, Position } from "reactflow";
import Shunt1 from "~/assets/icons/shunts-filters/Frame 479.svg";
import Shunt2 from "~/assets/icons/shunts-filters/Frame 480.svg";

export const Shunt1Node = memo(({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <img src={Shunt1} alt="Shunt 1" style={{ width: 60, height: "auto" }} />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const Shunt2Node = memo(({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <img src={Shunt2} alt="Shunt 2" style={{ width: 60, height: "auto" }} />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});
