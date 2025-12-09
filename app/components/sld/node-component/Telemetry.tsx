import { memo } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "reactflow";
import TapChanger from "~/assets/icons/telemetry/draw-tele-01.svg";
import Frequency from "~/assets/icons/telemetry/draw-tele-02.svg";
import Voltage from "~/assets/icons/telemetry/draw-tele-03.svg";
import PowerActive from "~/assets/icons/telemetry/draw-tele-04.svg";
import PowerReactive from "~/assets/icons/telemetry/draw-tele-05.svg";
import CurrentR from "~/assets/icons/telemetry/draw-tele-06.svg";
import CurrentS from "~/assets/icons/telemetry/draw-tele-07.svg";
import CurrentT from "~/assets/icons/telemetry/draw-tele-08.svg";
import CustomTelemetry from "~/assets/icons/telemetry/draw-tele-09.svg";

export const TapChangerNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 60, height: 60 };

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
      <img
        src={TapChanger}
        alt="Tap Changer"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const FrequencyNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 60, height: 60 };

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
      <img
        src={Frequency}
        alt="Frequency"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const VoltageNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 60, height: 60 };

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
      <img
        src={Voltage}
        alt="Voltage"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const PowerActiveNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 60, height: 60 };

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
      <img
        src={PowerActive}
        alt="Power Active"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const PowerReactiveNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 60, height: 60 };

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
      <img
        src={PowerReactive}
        alt="Power Reactive"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const CurrentRNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 60, height: 60 };

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
      <img
        src={CurrentR}
        alt="Current R"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const CurrentSNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 60, height: 60 };

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
      <img
        src={CurrentS}
        alt="Current S"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const CurrentTNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 60, height: 60 };

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
      <img
        src={CurrentT}
        alt="Current T"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});

export const CustomTelemetryNode = memo(({ data, selected, id }) => {
  const { setNodes, getNode } = useReactFlow();
  const node = getNode(id);
  const size = node?.width && node?.height 
    ? { width: node.width, height: node.height }
    : { width: 60, height: 60 };

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
      <img
        src={CustomTelemetry}
        alt="Custom Telemetry"
        style={{ width: size.width, height: size.height }}
      />
      <Handle position={Position.Bottom} id="bottom" />
      <Handle position={Position.Left} id="left" />
      <Handle position={Position.Right} id="right" />
    </div>
  );
});
