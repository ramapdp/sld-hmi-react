import React, { useState } from "react";
import { HiChevronRight, HiChevronDown, HiOutlineUpload } from "react-icons/hi";
import { TbFileImport, TbFileExport } from "react-icons/tb";
import { AiOutlineClear } from "react-icons/ai";

interface ComponentSidebarProps {
  sidebarWidth: number;
  onClose: () => void;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    data: any
  ) => void;
  selectedTool: string | null;
  setSelectedTool: (tool: string | null) => void;
  onUploadSVG: () => void;
  onClear: () => void;
  onExport: () => void;
  onImport: () => void;
}

const componentsList = [
  {
    category: "Sites and Substations",
    collapsed: false,
    items: [
      {
        type: "substation",
        label: "Substation",
        icon: "🏭",
        defaultData: { label: "Substation", voltage: "150", type: "main" },
      },
      {
        type: "powerPlant",
        label: "Power Plant",
        icon: "⚡",
        defaultData: { label: "Power Plant", capacity: "500" },
      },
      {
        type: "site",
        label: "Site",
        icon: "📍",
        defaultData: { label: "Site", type: "industrial" },
      },
    ],
  },
  {
    category: "Switches",
    collapsed: false,
    items: [
      {
        type: "breaker",
        label: "Circuit Breaker",
        icon: "🔲",
        defaultData: {
          label: "CB",
          status: "CLOSE",
          voltage: "20",
          voltageLevel: "MV",
        },
      },
      {
        type: "disconnector",
        label: "Disconnector",
        icon: "⚡",
        defaultData: { label: "DS", status: "CLOSE", voltage: "20" },
      },
      {
        type: "loadSwitch",
        label: "Load Break Switch",
        icon: "🔧",
        defaultData: { label: "LBS", status: "CLOSE" },
      },
      {
        type: "earthSwitch",
        label: "Earth Switch",
        icon: "⏚",
        defaultData: { label: "ES", status: "OPEN" },
      },
    ],
  },
  {
    category: "Transformers",
    collapsed: false,
    items: [
      {
        type: "trafo",
        label: "Power Transformer",
        icon: "⚡",
        defaultData: {
          label: "Trafo",
          ratio: "150/20",
          voltageLevel: "HV-MV",
          capacity: "100",
        },
      },
      {
        type: "trafo",
        label: "Distribution Transformer",
        icon: "⚡",
        defaultData: {
          label: "Trafo Dist",
          ratio: "20/0.4",
          voltageLevel: "MV-LV",
          capacity: "1",
        },
      },
      {
        type: "currentTransformer",
        label: "Current Transformer (CT)",
        icon: "🔄",
        defaultData: { label: "CT", ratio: "100/5" },
      },
      {
        type: "voltageTransformer",
        label: "Voltage Transformer (VT)",
        icon: "📊",
        defaultData: { label: "VT", ratio: "20000/110" },
      },
    ],
  },
  {
    category: "Generators and Loads",
    collapsed: false,
    items: [
      {
        type: "generator",
        label: "Generator",
        icon: "⚙️",
        defaultData: {
          label: "Gen",
          power: "100",
          voltage: "20",
          voltageLevel: "MV",
        },
      },
      {
        type: "motor",
        label: "Motor",
        icon: "🔄",
        defaultData: { label: "Motor", power: "50", voltage: "0.4" },
      },
      {
        type: "load",
        label: "Load",
        icon: "💡",
        defaultData: { label: "Load", power: "50", voltageLevel: "LV" },
      },
    ],
  },
  {
    category: "Sources",
    collapsed: false,
    items: [
      {
        type: "gridSource",
        label: "Grid Source",
        icon: "🔌",
        defaultData: { label: "Grid", voltage: "150", voltageLevel: "HV" },
      },
      {
        type: "solarPanel",
        label: "Solar Panel",
        icon: "☀️",
        defaultData: { label: "Solar", power: "10" },
      },
      {
        type: "windTurbine",
        label: "Wind Turbine",
        icon: "🌀",
        defaultData: { label: "Wind", power: "20" },
      },
    ],
  },
  {
    category: "Shunts and Filters",
    collapsed: false,
    items: [
      {
        type: "capacitor",
        label: "Capacitor Bank",
        icon: "⚡",
        defaultData: { label: "Cap", kvar: "10", voltageLevel: "MV" },
      },
      {
        type: "reactor",
        label: "Reactor",
        icon: "🔵",
        defaultData: { label: "Reactor", mvar: "5" },
      },
      {
        type: "filter",
        label: "Harmonic Filter",
        icon: "📡",
        defaultData: { label: "Filter", order: "5th" },
      },
    ],
  },
  {
    category: "Power Electronic Devices",
    collapsed: false,
    items: [
      {
        type: "inverter",
        label: "Inverter",
        icon: "🔄",
        defaultData: { label: "Inverter", capacity: "100" },
      },
      {
        type: "rectifier",
        label: "Rectifier",
        icon: "⚡",
        defaultData: { label: "Rectifier", capacity: "50" },
      },
      {
        type: "vfd",
        label: "Variable Frequency Drive",
        icon: "📊",
        defaultData: { label: "VFD", power: "50" },
      },
      {
        type: "ups",
        label: "UPS",
        icon: "🔋",
        defaultData: { label: "UPS", capacity: "100" },
      },
    ],
  },
  {
    category: "Grounding Elements",
    collapsed: false,
    items: [
      {
        type: "ground",
        label: "Ground",
        icon: "⏚",
        defaultData: { label: "Ground", type: "earth" },
      },
      {
        type: "groundingResistor",
        label: "Grounding Resistor",
        icon: "⚡",
        defaultData: { label: "NGR", resistance: "40" },
      },
    ],
  },
  {
    category: "General",
    collapsed: false,
    items: [
      {
        type: "bus",
        label: "Bus Bar",
        icon: "━",
        defaultData: { label: "Bus", voltage: "20", voltageLevel: "MV" },
      },
      {
        type: "relay",
        label: "Protection Relay",
        icon: "🔄",
        defaultData: { label: "Relay", status: "Normal" },
      },
      {
        type: "meter",
        label: "Energy Meter",
        icon: "📊",
        defaultData: { label: "Meter", reading: "0" },
      },
      {
        type: "fuse",
        label: "Fuse",
        icon: "🔥",
        defaultData: { label: "Fuse", rating: "100A" },
      },
      {
        type: "line",
        label: "Line",
        icon: "📏",
        defaultData: { length: 100, angle: 0, color: "#ffffff", thickness: 2 },
      },
      {
        type: "rectangle",
        label: "Rectangle",
        icon: "▭",
        defaultData: {
          width: 100,
          height: 60,
          fill: "#3b82f6",
          stroke: "#1e40af",
        },
      },
      {
        type: "circle",
        label: "Circle",
        icon: "⭕",
        defaultData: { radius: 30, fill: "#3b82f6", stroke: "#1e40af" },
      },
      {
        type: "text",
        label: "Text",
        icon: "T",
        defaultData: { label: "Text", fontSize: 14, color: "#ffffff" },
      },
    ],
  },
];

export const ComponentSidebar: React.FC<ComponentSidebarProps> = ({
  sidebarWidth,
  onClose,
  onDragStart,
  selectedTool,
  setSelectedTool,
  onUploadSVG,
  onClear,
  onExport,
  onImport,
}) => {
  const [collapsedCategories, setCollapsedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <aside
      className="p-4 overflow-auto bg-white dark:bg-[#044556]"
      style={{ width: `${sidebarWidth}px`, flexShrink: 0 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Drawing Tools</h1>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 dark:hover:bg-[#044556] rounded cursor-pointer"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className="cursor-pointer"
          title="Upload SVG"
          onClick={onUploadSVG}
        >
          <HiOutlineUpload className="inline mr-1 text-lg" />
        </button>
        <button
          className="cursor-pointer"
          title="Import File"
          onClick={onImport}
        >
          <TbFileImport className="inline mr-1 text-lg" />
        </button>
        <button
          className="cursor-pointer"
          title="Export File"
          onClick={onExport}
        >
          <TbFileExport className="inline mr-1 text-lg" />
        </button>
        <button className="cursor-pointer" title="Clear" onClick={onClear}>
          <AiOutlineClear className="inline mr-1 text-lg" />
        </button>
      </div>

      {/* Components */}
      <div className="space-y-1">
        {componentsList.map((category) => (
          <div
            key={category.category}
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <button
              onClick={() => toggleCategory(category.category)}
              className="w-full flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  {/* {collapsedCategories[category.category] ? "▶" : "▼"} */}
                  {collapsedCategories[category.category] ? (
                    <HiChevronRight />
                  ) : (
                    <HiChevronDown />
                  )}
                </span>
                <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                  {category.category}
                </h3>
              </div>
            </button>

            {!collapsedCategories[category.category] && (
              <div className="pl-4 pb-2 space-y-1">
                {category.items.map((component, index) => (
                  <div
                    key={`${category.category}-${component.type}-${index}`}
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, component.type, component.defaultData)
                    }
                    onClick={() => {
                      // For General category items, set as selected tool
                      if (
                        category.category === "General" &&
                        ["line", "rectangle", "circle", "text"].includes(
                          component.type
                        )
                      ) {
                        setSelectedTool(
                          selectedTool === component.type
                            ? null
                            : component.type
                        );
                      }
                    }}
                    className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-colors ${
                      selectedTool === component.type
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="text-base">{component.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium truncate">
                        {component.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
