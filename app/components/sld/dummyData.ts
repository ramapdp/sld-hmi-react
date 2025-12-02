import type { Edge, Node } from "reactflow";

// Dummy data untuk jaringan elektrikal - Simple Topology
export const initialNodes: Node[] = [
  // ========== TITLE ==========
  {
    id: "title",
    type: "text",
    position: { x: 400, y: 30 },
    data: { label: "POWER DISTRIBUTION SYSTEM", fontSize: 18, color: "#3b82f6", bold: true },
  },

  // ========== GRID SOURCE ==========
  {
    id: "grid",
    type: "generator",
    position: { x: 500, y: 120 },
    data: { label: "Grid 150kV", power: "100", voltage: "150", voltageLevel: "HV" },
  },

  // ========== MAIN BREAKER ==========
  {
    id: "main-cb",
    type: "breaker",
    position: { x: 500, y: 280 },
    data: { label: "Main CB", status: "CLOSE", voltage: "150", voltageLevel: "HV" },
  },

  // ========== TRANSFORMER ==========
  {
    id: "transformer",
    type: "trafo",
    position: { x: 500, y: 440 },
    data: { label: "Transformer", ratio: "150/20", voltageLevel: "HV-MV", capacity: "50 MVA" },
  },

  // ========== MV BUS ==========
  {
    id: "mv-bus",
    type: "bus",
    position: { x: 450, y: 600 },
    data: { label: "20kV BUS", voltage: "20", voltageLevel: "MV" },
  },
  {
    id: "ground",
    type: "ground",
    position: { x: 630, y: 620 },
    data: { label: "Earth", type: "earth" },
  },

  // ========== FEEDER 1 - LEFT ==========
  {
    id: "f1-title",
    type: "text",
    position: { x: 150, y: 720 },
    data: { label: "FEEDER 1", fontSize: 12, color: "#ffffff" },
  },
  {
    id: "f1-cb",
    type: "breaker",
    position: { x: 200, y: 780 },
    data: { label: "CB-F1", status: "CLOSE", voltage: "20", voltageLevel: "MV" },
  },
  {
    id: "f1-trafo",
    type: "trafo",
    position: { x: 200, y: 940 },
    data: { label: "T-F1", ratio: "20/0.4", voltageLevel: "MV-LV", capacity: "2 MVA" },
  },
  {
    id: "f1-load",
    type: "motor",
    position: { x: 200, y: 1100 },
    data: { label: "Motor", power: "1500", voltage: "0.4" },
  },

  // ========== FEEDER 2 - CENTER ==========
  {
    id: "f2-title",
    type: "text",
    position: { x: 450, y: 720 },
    data: { label: "FEEDER 2", fontSize: 12, color: "#ffffff" },
  },
  {
    id: "f2-cb",
    type: "breaker",
    position: { x: 500, y: 780 },
    data: { label: "CB-F2", status: "CLOSE", voltage: "20", voltageLevel: "MV" },
  },
  {
    id: "f2-trafo",
    type: "trafo",
    position: { x: 500, y: 940 },
    data: { label: "T-F2", ratio: "20/0.4", voltageLevel: "MV-LV", capacity: "1 MVA" },
  },
  {
    id: "f2-load",
    type: "load",
    position: { x: 500, y: 1100 },
    data: { label: "Building", power: "800", voltageLevel: "LV" },
  },

  // ========== FEEDER 3 - RIGHT ==========
  {
    id: "f3-title",
    type: "text",
    position: { x: 750, y: 720 },
    data: { label: "FEEDER 3", fontSize: 12, color: "#22c55e" },
  },
  {
    id: "f3-cb",
    type: "breaker",
    position: { x: 800, y: 780 },
    data: { label: "CB-F3", status: "CLOSE", voltage: "20", voltageLevel: "MV" },
  },
  {
    id: "solar",
    type: "solarPanel",
    position: { x: 800, y: 940 },
    data: { label: "Solar", power: "1" },
  },
  {
    id: "inverter",
    type: "inverter",
    position: { x: 800, y: 1100 },
    data: { label: "Inverter", capacity: "1" },
  },

  // ========== BACKUP GENERATOR ==========
  {
    id: "gen-title",
    type: "text",
    position: { x: 1065, y: 300 },
    data: { label: "BACKUP", fontSize: 12, color: "#f59e0b" },
  },
  {
    id: "gen-cb",
    type: "breaker",
    position: { x: 1060, y: 540 },
    data: { label: "CB-GEN", status: "OPEN", voltage: "20", voltageLevel: "MV" },
  },
  {
    id: "generator",
    type: "generator",
    position: { x: 1063, y: 350 },
    data: { label: "Genset", power: "5", voltage: "20", voltageLevel: "MV" },
  },
];

export const initialEdges: Edge[] = [
  // Main Power Flow
  { id: "e1", source: "grid", target: "main-cb", type: "smoothstep" },
  { id: "e2", source: "main-cb", target: "transformer", type: "smoothstep" },
  { id: "e3", source: "transformer", target: "mv-bus", type: "smoothstep" },
  { id: "e4", source: "mv-bus", target: "ground", type: "smoothstep", style: { stroke: "#10b981", strokeWidth: 2 } },

  // Feeder 1
  { id: "e5", source: "mv-bus", target: "f1-cb", type: "smoothstep" },
  { id: "e6", source: "f1-cb", target: "f1-trafo", type: "smoothstep" },
  { id: "e7", source: "f1-trafo", target: "f1-load", type: "smoothstep" },

  // Feeder 2
  { id: "e8", source: "mv-bus", target: "f2-cb", type: "smoothstep" },
  { id: "e9", source: "f2-cb", target: "f2-trafo", type: "smoothstep" },
  { id: "e10", source: "f2-trafo", target: "f2-load", type: "smoothstep" },

  // Feeder 3 - Solar (Green)
  { id: "e11", source: "mv-bus", target: "f3-cb", type: "smoothstep" },
  { id: "e12", source: "f3-cb", target: "solar", type: "smoothstep", style: { stroke: "#22c55e", strokeWidth: 2 } },
  { id: "e13", source: "solar", target: "inverter", type: "smoothstep", style: { stroke: "#22c55e", strokeWidth: 2 } },

  // Backup Generator (Dashed - Standby)
  { id: "e14", source: "generator", target: "gen-cb", type: "smoothstep", style: { strokeDasharray: "5,5", stroke: "#f59e0b", strokeWidth: 2 } },
  { id: "e15", source: "gen-cb", target: "mv-bus", type: "smoothstep", style: { strokeDasharray: "5,5", stroke: "#f59e0b", strokeWidth: 2 } },
];