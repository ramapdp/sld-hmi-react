import { memo } from "react";
import { Handle, Position } from "reactflow";
import SubstationOff from "~/assets/icons/sites-substations/Frame 479.svg";
import Substation from "~/assets/icons/sites-substations/Frame 480.svg";

export const SubstationOffNode = memo(({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <img
        src={SubstationOff}
        alt="Substation Off"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const SubstationNode = memo(({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <img
        src={Substation}
        alt="Substation"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});
