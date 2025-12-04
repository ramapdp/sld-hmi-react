import { memo } from "react";
import { Handle, Position } from "reactflow";
import RecloserSwitchClosed from "~/assets/icons/switches/Frame 478.svg";
import RecloserSwitchOpen from "~/assets/icons/switches/Frame 479.svg";
import LbsClosed from "~/assets/icons/switches/Frame 480.svg";
import LbsOpen from "~/assets/icons/switches/Frame 481.svg";
import SwitchClosed from "~/assets/icons/switches/Frame 482.svg";
import SwitchOpen from "~/assets/icons/switches/Frame 483.svg";

export const RecloserSwitchClosedNode = memo(({ data }) => {
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
        src={RecloserSwitchClosed}
        alt="Recloser Switch Closed"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const RecloserSwitchOpenNode = memo(({ data }) => {
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
        src={RecloserSwitchOpen}
        alt="Recloser Switch Open"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const LbsClosedNode = memo(({ data }) => {
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
        src={LbsClosed}
        alt="LBS Closed"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const LbsOpenNode = memo(({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <img src={LbsOpen} alt="LBS Open" style={{ width: 60, height: "auto" }} />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const SwitchClosedNode = memo(({ data }) => {
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
        src={SwitchClosed}
        alt="Switch Closed"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const SwitchOpenNode = memo(({ data }) => {
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
        src={SwitchOpen}
        alt="Switch Open"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});
