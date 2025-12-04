import type { Edge, Node } from "reactflow";

// Dummy data untuk jaringan elektrikal - Dual Generator Redundancy System
export const initialNodes: Node[] = [
  // ========== TITLE ==========
  {
    id: "title",
    type: "text",
    position: { x: 300, y: 30 },
    data: {
      label: "DUAL GENERATOR REDUNDANCY - 20kV DISTRIBUTION NETWORK",
      fontSize: 18,
      color: "#3b82f6",
      bold: true,
    },
  },

  // ========== GENERATOR 1 SYSTEM (LEFT) ==========
  {
    id: "gen1-title",
    type: "text",
    position: { x: 200, y: 120 },
    data: { label: "GENERATOR 1 - ACTIVE", fontSize: 12, color: "#22c55e" },
  },
  {
    id: "generator1",
    type: "pembangkit",
    position: { x: 250, y: 200 },
    data: { label: "Generator 1", power: "15000", type: "type3" },
  },
  {
    id: "gen1-trafo",
    type: "trafoDaya",
    position: { x: 250, y: 330 },
    data: { label: "Trafo Gen1", capacity: "15000", voltageLevel: "HV-MV" },
  },
  {
    id: "gen1-breaker",
    type: "RecloserSwitchClosed",
    position: { x: 250, y: 460 },
    data: { label: "Gen1 Breaker", status: "CLOSE", voltage: "20" },
  },
  {
    id: "gen1-cb",
    type: "RecloserSwitchClosed",
    position: { x: 400, y: 460 },
    data: { label: "CB Gen1", status: "CLOSE", voltage: "20" },
  },

  // ========== GENERATOR 2 SYSTEM (RIGHT) ==========
  {
    id: "gen2-title",
    type: "text",
    position: { x: 850, y: 120 },
    data: { label: "GENERATOR 2 - STANDBY", fontSize: 12, color: "#f59e0b" },
  },
  {
    id: "generator2",
    type: "generator4",
    position: { x: 900, y: 200 },
    data: { label: "Generator 2", power: "15000", type: "type4" },
  },
  {
    id: "gen2-trafo",
    type: "trafoDaya",
    position: { x: 900, y: 330 },
    data: { label: "Trafo Gen2", capacity: "15000", voltageLevel: "HV-MV" },
  },
  {
    id: "gen2-breaker",
    type: "RecloserSwitchOpen",
    position: { x: 900, y: 460 },
    data: { label: "Gen2 Breaker", status: "OPEN", voltage: "20" },
  },
  {
    id: "gen2-cb",
    type: "RecloserSwitchOpen",
    position: { x: 750, y: 460 },
    data: { label: "CB Gen2", status: "OPEN", voltage: "20" },
  },

  // ========== 20kV MAIN BUS ==========
  {
    id: "main-bus",
    type: "square",
    position: { x: 575, y: 600 },
    data: { label: "20kV Main Bus" },
  },
  {
    id: "bus-ground",
    type: "ground",
    position: { x: 650, y: 700 },
    data: { label: "Ground", resistance: "5" },
  },

  // ========== FEEDER 1 - FROM GEN1 (LEFT SIDE) ==========
  {
    id: "f1-title",
    type: "text",
    position: { x: 80, y: 720 },
    data: { label: "FEEDER 1 - FROM GEN1", fontSize: 11, color: "#ffffff" },
  },
  {
    id: "f1-lbs",
    type: "LbsClosed",
    position: { x: 150, y: 800 },
    data: { label: "LBS F1", status: "CLOSE", voltage: "20" },
  },
  {
    id: "f1-trafo",
    type: "trafoTM",
    position: { x: 150, y: 930 },
    data: { label: "Trafo 20/0.4kV", capacity: "2500", voltageLevel: "MV-LV" },
  },
  {
    id: "f1-load",
    type: "home",
    position: { x: 150, y: 1060 },
    data: { label: "Industrial Load 1" },
  },

  // ========== FEEDER 2 - FROM GEN1 (LEFT-CENTER) ==========
  {
    id: "f2-title",
    type: "text",
    position: { x: 310, y: 720 },
    data: { label: "FEEDER 2 - FROM GEN1", fontSize: 11, color: "#ffffff" },
  },
  {
    id: "f2-switch",
    type: "switchClosed",
    position: { x: 370, y: 800 },
    data: { label: "Switch F2", status: "CLOSE", voltage: "20" },
  },
  {
    id: "f2-trafo",
    type: "trafoTT",
    position: { x: 370, y: 930 },
    data: { label: "Trafo 20/0.4kV", capacity: "1600", voltageLevel: "MV-LV" },
  },
  {
    id: "f2-shunt",
    type: "shunt1",
    position: { x: 370, y: 1060 },
    data: { label: "Capacitor Bank", capacitance: "300", type: "Capacitor" },
  },
  {
    id: "f2-load",
    type: "home",
    position: { x: 370, y: 1190 },
    data: { label: "Commercial Load" },
  },

  // ========== FEEDER 3 - FROM GEN2 (RIGHT-CENTER) ==========
  {
    id: "f3-title",
    type: "text",
    position: { x: 740, y: 720 },
    data: { label: "FEEDER 3 - FROM GEN2", fontSize: 11, color: "#ffffff" },
  },
  {
    id: "f3-lbs",
    type: "LbsClosed",
    position: { x: 800, y: 800 },
    data: { label: "LBS F3", status: "CLOSE", voltage: "20" },
  },
  {
    id: "f3-trafo",
    type: "trafo3Belitan",
    position: { x: 800, y: 930 },
    data: {
      label: "Trafo 3W 20/0.4kV",
      capacity: "1000",
      voltageLevel: "HV-LV",
    },
  },
  {
    id: "f3-filter",
    type: "shunt2",
    position: { x: 800, y: 1060 },
    data: { label: "Harmonic Filter", inductance: "50", type: "Inductor" },
  },
  {
    id: "f3-load",
    type: "home",
    position: { x: 800, y: 1190 },
    data: { label: "Residential Load" },
  },

  // ========== FEEDER 4 - FROM GEN2 (RIGHT SIDE) ==========
  {
    id: "f4-title",
    type: "text",
    position: { x: 970, y: 720 },
    data: { label: "FEEDER 4 - FROM GEN2", fontSize: 11, color: "#ffffff" },
  },
  {
    id: "f4-recloser",
    type: "RecloserSwitchClosed",
    position: { x: 1020, y: 800 },
    data: { label: "Recloser F4", status: "CLOSE", voltage: "20" },
  },
  {
    id: "f4-trafo",
    type: "trafoAuto",
    position: { x: 1020, y: 930 },
    data: { label: "Auto Trafo", capacity: "2000", voltageLevel: "HV-MV" },
  },
  {
    id: "f4-inverter",
    type: "circuitBreaker",
    position: { x: 1020, y: 1060 },
    data: { label: "CB F4", rating: "1800", type: "CB" },
  },
  {
    id: "f4-load",
    type: "home",
    position: { x: 1020, y: 1190 },
    data: { label: "Industrial Load 2" },
  },

  // ========== RENEWABLE ENERGY (SOLAR) - CENTER ==========
  {
    id: "solar-title",
    type: "text",
    position: { x: 530, y: 720 },
    data: { label: "SOLAR FARM", fontSize: 11, color: "#22c55e" },
  },
  {
    id: "solar-lbs",
    type: "LbsClosed",
    position: { x: 575, y: 800 },
    data: { label: "Solar LBS", status: "CLOSE", voltage: "20" },
  },
  {
    id: "solar-gen",
    type: "generator2",
    position: { x: 575, y: 930 },
    data: { label: "Solar Array", power: "5000", type: "type2" },
  },
  {
    id: "solar-inverter",
    type: "powerElectronic7",
    position: { x: 575, y: 1060 },
    data: { label: "Solar Inverter", rating: "5000", type: "STATCOM" },
  },
  {
    id: "solar-storage",
    type: "powerElectronic11",
    position: { x: 575, y: 1190 },
    data: { label: "Battery Storage", rating: "3000", type: "HVDC Converter" },
  },
];

export const initialEdges: Edge[] = [
  // ========== GENERATOR 1 TO MAIN BUS (Active) ==========
  // Gen1 → Gen1 Trafo (top to bottom)
  {
    id: "e1",
    source: "generator1",
    sourceHandle: "bottom",
    target: "gen1-trafo",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 3, strokeDasharray: "5,5" },
  },
  // Gen1 Trafo → Gen1 Breaker (bottom to top)
  {
    id: "e2",
    source: "gen1-trafo",
    sourceHandle: "bottom",
    target: "gen1-breaker",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 3, strokeDasharray: "5,5" },
  },
  // Gen1 Breaker → Main Bus (right to left)
  {
    id: "e3",
    source: "gen1-breaker",
    sourceHandle: "right",
    target: "gen1-cb",
    targetHandle: "left",
    type: "customizable",
    data: { isElectrical: true, isActive: true, edgeType: "smoothstep" },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 3, strokeDasharray: "5,5" },
  },
  // Gen1 CB → Main Bus (right to left)
  {
    id: "e3a",
    source: "gen1-cb",
    sourceHandle: "right",
    target: "main-bus",
    targetHandle: "left",
    type: "customizable",
    data: { isElectrical: true, isActive: true, edgeType: "smoothstep" },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 3, strokeDasharray: "5,5" },
  },

  // ========== GENERATOR 2 TO MAIN BUS (Standby/Inactive) ==========
  // Gen2 → Gen2 Trafo (top to bottom)
  {
    id: "e4",
    source: "generator2",
    sourceHandle: "bottom",
    target: "gen2-trafo",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: false },
    animated: false,
    style: { stroke: "#ffffff", strokeWidth: 2, strokeDasharray: "0" },
  },
  // Gen2 Trafo → Gen2 Breaker (bottom to top)
  {
    id: "e5",
    source: "gen2-trafo",
    sourceHandle: "bottom",
    target: "gen2-breaker",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: false },
    animated: false,
    style: { stroke: "#ffffff", strokeWidth: 2, strokeDasharray: "0" },
  },
  // Gen2 Breaker → Main Bus (left to right)
  {
    id: "e6",
    source: "gen2-breaker",
    sourceHandle: "left",
    target: "gen2-cb",
    targetHandle: "right",
    type: "smoothstep",
    data: { isElectrical: true, isActive: false },
    animated: false,
    style: { stroke: "#ffffff", strokeWidth: 2, strokeDasharray: "0" },
  },
  // Gen2 CB → Main Bus (left to right)
  {
    id: "e6a",
    source: "gen2-cb",
    sourceHandle: "left",
    target: "main-bus",
    targetHandle: "right",
    type: "smoothstep",
    data: { isElectrical: true, isActive: false },
    animated: false,
    style: { stroke: "#ffffff", strokeWidth: 2, strokeDasharray: "0" },
  },

  // ========== MAIN BUS GROUNDING ==========
  // Main Bus → Ground (right to left)
  {
    id: "e7",
    source: "main-bus",
    sourceHandle: "right",
    target: "bus-ground",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: false,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },

  // ========== FEEDER 1 - FROM GEN1 (LEFT SIDE) - Active ==========
  // Main Bus → F1 LBS (left to top)
  {
    id: "e8",
    source: "main-bus",
    sourceHandle: "left",
    target: "f1-lbs",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F1 LBS → F1 Trafo (bottom to top)
  {
    id: "e9",
    source: "f1-lbs",
    sourceHandle: "bottom",
    target: "f1-trafo",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F1 Trafo → F1 Load (bottom to top)
  {
    id: "e10",
    source: "f1-trafo",
    sourceHandle: "bottom",
    target: "f1-load",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },

  // ========== FEEDER 2 - FROM GEN1 (LEFT-CENTER) - Active ==========
  // Main Bus → F2 Switch (left to top)
  {
    id: "e11",
    source: "main-bus",
    sourceHandle: "left",
    target: "f2-switch",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F2 Switch → F2 Trafo (bottom to top)
  {
    id: "e12",
    source: "f2-switch",
    sourceHandle: "bottom",
    target: "f2-trafo",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F2 Trafo → F2 Shunt (bottom to top)
  {
    id: "e13",
    source: "f2-trafo",
    sourceHandle: "bottom",
    target: "f2-shunt",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F2 Shunt → F2 Load (bottom to top)
  {
    id: "e14",
    source: "f2-shunt",
    sourceHandle: "bottom",
    target: "f2-load",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },

  // ========== FEEDER 3 - FROM GEN2 (RIGHT-CENTER) - Active ==========
  // Main Bus → F3 LBS (right to top)
  {
    id: "e15",
    source: "main-bus",
    sourceHandle: "right",
    target: "f3-lbs",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F3 LBS → F3 Trafo (bottom to top)
  {
    id: "e16",
    source: "f3-lbs",
    sourceHandle: "bottom",
    target: "f3-trafo",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F3 Trafo → F3 Filter (bottom to top)
  {
    id: "e17",
    source: "f3-trafo",
    sourceHandle: "bottom",
    target: "f3-filter",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F3 Filter → F3 Load (bottom to top)
  {
    id: "e18",
    source: "f3-filter",
    sourceHandle: "bottom",
    target: "f3-load",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },

  // ========== FEEDER 4 - FROM GEN2 (RIGHT SIDE) - Active ==========
  // Main Bus → F4 Recloser (right to top)
  {
    id: "e19",
    source: "main-bus",
    sourceHandle: "right",
    target: "f4-recloser",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F4 Recloser → F4 Trafo (bottom to top)
  {
    id: "e20",
    source: "f4-recloser",
    sourceHandle: "bottom",
    target: "f4-trafo",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F4 Trafo → F4 Inverter (bottom to top)
  {
    id: "e21",
    source: "f4-trafo",
    sourceHandle: "bottom",
    target: "f4-inverter",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // F4 Inverter → F4 Load (bottom to top)
  {
    id: "e22",
    source: "f4-inverter",
    sourceHandle: "bottom",
    target: "f4-load",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
  },

  // ========== SOLAR FARM - CENTER (Active - Green) ==========
  // Main Bus → Solar LBS (bottom to top)
  {
    id: "e23",
    source: "main-bus",
    sourceHandle: "bottom",
    target: "solar-lbs",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#16a34a", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // Solar LBS → Solar Gen (bottom to top)
  {
    id: "e24",
    source: "solar-lbs",
    sourceHandle: "bottom",
    target: "solar-gen",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#16a34a", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // Solar Gen → Solar Inverter (bottom to top)
  {
    id: "e25",
    source: "solar-gen",
    sourceHandle: "bottom",
    target: "solar-inverter",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#16a34a", strokeWidth: 2, strokeDasharray: "5,5" },
  },
  // Solar Inverter → Storage (bottom to top)
  {
    id: "e26",
    source: "solar-inverter",
    sourceHandle: "bottom",
    target: "solar-storage",
    targetHandle: "top",
    type: "smoothstep",
    data: { isElectrical: true, isActive: true },
    animated: true,
    style: { stroke: "#16a34a", strokeWidth: 2, strokeDasharray: "5,5" },
  },
];
