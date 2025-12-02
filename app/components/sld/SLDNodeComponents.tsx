import React, { memo, useState } from "react";
import { Handle, Position, NodeResizer } from "reactflow";

// Helper function untuk mendapatkan warna berdasarkan voltage level
const getVoltageLevelColor = (voltageLevel: string) => {
  switch (voltageLevel) {
    case "HV":
      return "#ef4444"; // Red
    case "MV":
      return "#eab308"; // Yellow
    case "LV":
      return "#22c55e"; // Green
    case "HV-MV":
    case "MV-LV":
      return "#8b5cf6"; // Purple (untuk transformer)
    default:
      return "#6b7280"; // Gray
  }
};

// 1. Simbol Breaker (Kotak)
export const BreakerNode = memo(({ data }) => {
  const statusColor =
    data.status === "CLOSE"
      ? "#ef4444"
      : data.status === "OPEN"
        ? "#22c55e"
        : "#ccc";

  const voltageLevelColor = getVoltageLevelColor(data.voltageLevel);

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        minWidth: 80,
        textAlign: "center",
        backgroundColor: "#1f2937",
        border: `2px solid ${voltageLevelColor}`,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: voltageLevelColor }}
      />

      <div
        style={{
          fontSize: "10px",
          fontWeight: "bold",
          marginBottom: 4,
          color: voltageLevelColor,
        }}
      >
        {data.label}
      </div>

      <div
        style={{
          width: 24,
          height: 24,
          backgroundColor: statusColor,
          border: "2px solid #333",
          margin: "0 auto",
        }}
      />

      <div style={{ fontSize: "9px", marginTop: 4 }}>
        {data.voltage || "-"} kV
      </div>
      <div style={{ fontSize: "8px", color: voltageLevelColor }}>
        {data.voltageLevel}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: voltageLevelColor }}
      />
    </div>
  );
});

// 2. Simbol Trafo
export const TrafoNode = memo(({ data }) => {
  const voltageLevelColor = getVoltageLevelColor(data.voltageLevel);

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        border: `2px solid ${voltageLevelColor}`,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: voltageLevelColor }}
      />

      <svg
        width="40"
        height="50"
        viewBox="0 0 40 50"
        style={{ display: "block", margin: "0 auto" }}
      >
        <circle
          cx="20"
          cy="12"
          r="10"
          stroke={voltageLevelColor}
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="20"
          cy="32"
          r="10"
          stroke={voltageLevelColor}
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div
        style={{
          textAlign: "center",
          fontSize: "10px",
          marginTop: 5,
          color: voltageLevelColor,
        }}
      >
        {data.label}
      </div>
      <div style={{ textAlign: "center", fontSize: "8px", color: "#9ca3af" }}>
        {data.ratio || ""}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: voltageLevelColor }}
      />
    </div>
  );
});

// 3. Bus Bar
export const BusNode = memo(({ data }) => {
  const voltageLevelColor = getVoltageLevelColor(data.voltageLevel);

  return (
    <div
      style={{
        padding: "8px 16px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        border: `3px solid ${voltageLevelColor}`,
        minWidth: 120,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: voltageLevelColor }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: voltageLevelColor }}
      />

      <div
        style={{
          textAlign: "center",
          fontSize: "10px",
          fontWeight: "bold",
          color: voltageLevelColor,
        }}
      >
        {data.label}
      </div>
      <div style={{ textAlign: "center", fontSize: "8px", color: "#9ca3af" }}>
        {data.voltage} kV
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "7px",
          color: voltageLevelColor,
        }}
      >
        {data.voltageLevel}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: voltageLevelColor }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: voltageLevelColor }}
      />
    </div>
  );
});

// 4. Generator
export const GeneratorNode = memo(({ data }) => {
  const voltageLevelColor = getVoltageLevelColor(data.voltageLevel);

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: `2px solid ${voltageLevelColor}`,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: voltageLevelColor }}
      />

      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={voltageLevelColor}
          strokeWidth="2"
          fill="none"
        />
        <text
          x="25"
          y="30"
          fontSize="16"
          fill={voltageLevelColor}
          textAnchor="middle"
          fontWeight="bold"
        >
          G
        </text>
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>{data.power} MW</div>
      <div style={{ fontSize: "7px", color: voltageLevelColor }}>
        {data.voltageLevel}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: voltageLevelColor }}
      />
    </div>
  );
});

// 5. Load
export const LoadNode = memo(({ data }) => {
  const voltageLevelColor = getVoltageLevelColor(data.voltageLevel);

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: `2px solid ${voltageLevelColor}`,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: voltageLevelColor }}
      />

      <svg width="40" height="40" viewBox="0 0 40 40">
        <path
          d="M10 30 L20 10 L17 20 L30 20 L20 40 L23 30 Z"
          fill={voltageLevelColor}
          stroke={voltageLevelColor}
          strokeWidth="1"
        />
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>{data.power} MW</div>
      <div style={{ fontSize: "7px", color: voltageLevelColor }}>
        {data.voltageLevel}
      </div>
    </div>
  );
});

// 6. Capacitor Bank
export const CapacitorNode = memo(({ data }) => {
  const voltageLevelColor = getVoltageLevelColor(data.voltageLevel);

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: `2px solid ${voltageLevelColor}`,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: voltageLevelColor }}
      />

      <svg width="40" height="40" viewBox="0 0 40 40">
        <line
          x1="12"
          y1="10"
          x2="12"
          y2="30"
          stroke={voltageLevelColor}
          strokeWidth="3"
        />
        <line
          x1="28"
          y1="10"
          x2="28"
          y2="30"
          stroke={voltageLevelColor}
          strokeWidth="3"
        />
        <line
          x1="12"
          y1="20"
          x2="5"
          y2="20"
          stroke={voltageLevelColor}
          strokeWidth="2"
        />
        <line
          x1="28"
          y1="20"
          x2="35"
          y2="20"
          stroke={voltageLevelColor}
          strokeWidth="2"
        />
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>{data.kvar} kVAR</div>
      <div style={{ fontSize: "7px", color: voltageLevelColor }}>
        {data.voltageLevel}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: voltageLevelColor }}
      />
    </div>
  );
});

// 7. Relay - no change needed
export const RelayNode = memo(({ data }) => {
  const color = data.status === "Normal" ? "#10b981" : "#ef4444";

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: `2px solid ${color}`,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="10"
          y="10"
          width="20"
          height="20"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        <circle cx="20" cy="20" r="5" fill={color} />
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>{data.status}</div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// 8. Energy Meter - no change needed
export const MeterNode = memo(({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: "2px solid #06b6d4",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="5"
          y="5"
          width="30"
          height="30"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          rx="3"
        />
        <text
          x="20"
          y="22"
          fontSize="14"
          fill="#06b6d4"
          textAnchor="middle"
          fontWeight="bold"
        >
          kWh
        </text>
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>
        {data.reading} kWh
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// 9. Line Node
export const LineNode = memo(({ data, selected }) => {
  return (
    <div style={{ position: "relative" }}>
      {selected && (
        <NodeResizer
          minWidth={50}
          minHeight={2}
          isVisible={selected}
          lineClassName="border-blue-500"
        />
      )}
      <svg
        width={data.length || 100}
        height="10"
        style={{ overflow: "visible" }}
      >
        <line
          x1="0"
          y1="5"
          x2={data.length || 100}
          y2="5"
          stroke={data.color || "#ffffff"}
          strokeWidth={data.thickness || 2}
        />
      </svg>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

// 10. Custom SVG Node
export const CustomSVGNode = memo(({ data, selected }) => {
  const [size, setSize] = React.useState({
    width: data.width || 100,
    height: data.height || 100,
  });

  return (
    <div style={{ position: "relative" }}>
      {selected && (
        <NodeResizer
          minWidth={50}
          minHeight={50}
          isVisible={selected}
          lineClassName="border-blue-500"
          onResize={(e, params) => {
            setSize({
              width: params.width,
              height: params.height,
            });
            data.width = params.width;
            data.height = params.height;
          }}
        />
      )}
      <div
        style={{
          width: size.width,
          height: size.height,
          border: selected ? "2px solid #3b82f6" : "transparent",
          borderRadius: 4,
          padding: 8,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          dangerouslySetInnerHTML={{
            __html: data.svgContent?.replace(
              /<svg/,
              `<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"`
            ),
          }}
        />
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

// 11. Text Node
export const TextNode = memo(({ data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.label || "Text");

  return (
    <div
      style={{
        padding: "8px",
        background: isEditing ? "#374151" : "transparent",
        border: selected ? "1px solid #3b82f6" : "1px solid transparent",
        borderRadius: 4,
        cursor: "text",
      }}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            data.label = e.target.value;
          }}
          onBlur={() => setIsEditing(false)}
          autoFocus
          style={{
            background: "transparent",
            border: "none",
            color: data.color || "#ffffff",
            fontSize: `${data.fontSize || 14}px`,
            fontWeight: data.bold ? "bold" : "normal",
            fontStyle: data.italic ? "italic" : "normal",
            outline: "none",
          }}
        />
      ) : (
        <div
          style={{
            color: data.color || "#ffffff",
            fontSize: `${data.fontSize || 14}px`,
            fontWeight: data.bold ? "bold" : "normal",
            fontStyle: data.italic ? "italic" : "normal",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
});

// 12. Rectangle Node
export const RectangleNode = memo(({ data, selected }) => {
  return (
    <div style={{ position: "relative" }}>
      {selected && (
        <NodeResizer
          minWidth={50}
          minHeight={30}
          isVisible={selected}
          lineClassName="border-blue-500"
        />
      )}
      <svg
        width={data.width || 100}
        height={data.height || 60}
        style={{ overflow: "visible" }}
      >
        <rect
          x="0"
          y="0"
          width={data.width || 100}
          height={data.height || 60}
          fill={data.fill || "#3b82f6"}
          stroke={data.stroke || "#1e40af"}
          strokeWidth={data.strokeWidth || 2}
          rx={data.rounded ? 8 : 0}
        />
      </svg>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

// 13. Circle Node
export const CircleNode = memo(({ data, selected }) => {
  return (
    <div style={{ position: "relative" }}>
      {selected && (
        <NodeResizer
          minWidth={30}
          minHeight={30}
          isVisible={selected}
          lineClassName="border-blue-500"
          keepAspectRatio
        />
      )}
      <svg
        width={(data.radius || 30) * 2}
        height={(data.radius || 30) * 2}
        style={{ overflow: "visible" }}
      >
        <circle
          cx={data.radius || 30}
          cy={data.radius || 30}
          r={data.radius || 30}
          fill={data.fill || "#3b82f6"}
          stroke={data.stroke || "#1e40af"}
          strokeWidth={data.strokeWidth || 2}
        />
      </svg>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

// 14. Disconnector Node
export const DisconnectorNode = memo(({ data }) => {
  const statusColor = data.status === "CLOSE" ? "#ef4444" : "#22c55e";

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: `2px solid ${statusColor}`,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="40" height="50" viewBox="0 0 40 50">
        {data.status === "CLOSE" ? (
          <>
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="15"
              stroke="#ffffff"
              strokeWidth="3"
            />
            <circle cx="20" cy="20" r="5" fill="#ffffff" />
            <line
              x1="20"
              y1="25"
              x2="20"
              y2="50"
              stroke="#ffffff"
              strokeWidth="3"
            />
          </>
        ) : (
          <>
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="15"
              stroke="#ffffff"
              strokeWidth="3"
            />
            <circle cx="20" cy="20" r="5" fill="#ffffff" />
            <line
              x1="20"
              y1="25"
              x2="30"
              y2="40"
              stroke="#ffffff"
              strokeWidth="3"
            />
          </>
        )}
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>{data.voltage} kV</div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// 15. Load Switch Node
export const LoadSwitchNode = memo(({ data }) => {
  const statusColor = data.status === "CLOSE" ? "#ef4444" : "#22c55e";

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: `2px solid ${statusColor}`,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <line x1="20" y1="8" x2="20" y2="0" stroke="#ffffff" strokeWidth="2" />
        <line
          x1="20"
          y1="32"
          x2="20"
          y2="40"
          stroke="#ffffff"
          strokeWidth="2"
        />
        {data.status === "CLOSE" && (
          <line
            x1="12"
            y1="20"
            x2="28"
            y2="20"
            stroke={statusColor}
            strokeWidth="3"
          />
        )}
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold", marginTop: 4 }}>
        {data.label}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// 16. Earth Switch Node
export const EarthSwitchNode = memo(({ data }) => {
  const statusColor = data.status === "CLOSE" ? "#ef4444" : "#22c55e";

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: `2px solid ${statusColor}`,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="40" height="50" viewBox="0 0 40 50">
        <line x1="20" y1="0" x2="20" y2="20" stroke="#ffffff" strokeWidth="2" />
        {data.status === "CLOSE" && (
          <line
            x1="20"
            y1="20"
            x2="20"
            y2="30"
            stroke={statusColor}
            strokeWidth="3"
          />
        )}
        <line
          x1="10"
          y1="35"
          x2="30"
          y2="35"
          stroke="#10b981"
          strokeWidth="3"
        />
        <line
          x1="12"
          y1="40"
          x2="28"
          y2="40"
          stroke="#10b981"
          strokeWidth="2"
        />
        <line
          x1="14"
          y1="45"
          x2="26"
          y2="45"
          stroke="#10b981"
          strokeWidth="2"
        />
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// 17. Motor Node
export const MotorNode = memo(({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: "2px solid #3b82f6",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="25"
          y="30"
          fontSize="16"
          fill="#3b82f6"
          textAnchor="middle"
          fontWeight="bold"
        >
          M
        </text>
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>{data.power} kW</div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// 18. Fuse Node
export const FuseNode = memo(({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: "2px solid #f59e0b",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="40" height="50" viewBox="0 0 40 50">
        <rect
          x="12"
          y="10"
          width="16"
          height="30"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          rx="3"
        />
        <line x1="20" y1="0" x2="20" y2="10" stroke="#ffffff" strokeWidth="2" />
        <line
          x1="20"
          y1="40"
          x2="20"
          y2="50"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <line
          x1="16"
          y1="20"
          x2="24"
          y2="30"
          stroke="#f59e0b"
          strokeWidth="2"
        />
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>{data.rating}</div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// 19. Current Transformer Node
export const CurrentTransformerNode = memo(({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: "2px solid #06b6d4",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="40" height="50" viewBox="0 0 40 50">
        <circle
          cx="20"
          cy="25"
          r="15"
          stroke="#06b6d4"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="20"
          y="30"
          fontSize="12"
          fill="#06b6d4"
          textAnchor="middle"
          fontWeight="bold"
        >
          CT
        </text>
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>{data.ratio}</div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// 20. Voltage Transformer Node
export const VoltageTransformerNode = memo(({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: "2px solid #8b5cf6",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="40" height="50" viewBox="0 0 40 50">
        <circle
          cx="20"
          cy="25"
          r="15"
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="20"
          y="30"
          fontSize="12"
          fill="#8b5cf6"
          textAnchor="middle"
          fontWeight="bold"
        >
          VT
        </text>
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold" }}>{data.label}</div>
      <div style={{ fontSize: "8px", color: "#9ca3af" }}>{data.ratio}</div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

// 21. Ground Node
export const GroundNode = memo(({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: 4,
        backgroundColor: "#1f2937",
        textAlign: "center",
        border: "2px solid #10b981",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <svg width="40" height="40" viewBox="0 0 40 40">
        <line x1="20" y1="0" x2="20" y2="15" stroke="#ffffff" strokeWidth="2" />
        <line x1="8" y1="20" x2="32" y2="20" stroke="#10b981" strokeWidth="3" />
        <line
          x1="11"
          y1="25"
          x2="29"
          y2="25"
          stroke="#10b981"
          strokeWidth="2"
        />
        <line
          x1="14"
          y1="30"
          x2="26"
          y2="30"
          stroke="#10b981"
          strokeWidth="2"
        />
      </svg>

      <div style={{ fontSize: "10px", fontWeight: "bold", marginTop: 4 }}>
        {data.label}
      </div>
    </div>
  );
});
