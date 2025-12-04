import { memo } from "react";
import { Handle, Position } from "reactflow";
import TrafoTM from "~/assets/icons/transformers/Frame 478.svg";
import Trafo2Belitan from "~/assets/icons/transformers/Frame 478.svg";
import TrafoTT from "~/assets/icons/transformers/Frame 484.svg";
import Trafo3Belitan from "~/assets/icons/transformers/Frame 485.svg";
import TrafoAuto from "~/assets/icons/transformers/Frame 486.svg";
import TrafoDaya from "~/assets/icons/transformers/Frame 487.svg";

export const TrafoTMNode = memo(({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <img src={TrafoTM} alt="Trafo TM" style={{ width: 60, height: "auto" }} />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const Trafo2BelitanNode = memo(({ data }) => {
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
        src={Trafo2Belitan}
        alt="Trafo 2 Belitan"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const TrafoTTNode = memo(({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle position={Position.Top} id="top" />
      <img src={TrafoTT} alt="Trafo TT" style={{ width: 60, height: "auto" }} />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const Trafo3BelitanNode = memo(({ data }) => {
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
        src={Trafo3Belitan}
        alt="Trafo 3 Belitan"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const TrafoAutoNode = memo(({ data }) => {
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
        src={TrafoAuto}
        alt="Auto Trafo"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const TrafoDayaNode = memo(({ data }) => {
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
        src={TrafoDaya}
        alt="Trafo Daya"
        style={{ width: 60, height: "auto" }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});
