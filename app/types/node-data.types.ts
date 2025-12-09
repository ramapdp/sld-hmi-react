/**
 * Type definitions for node data structures
 * Each node type has its own data interface
 */

export interface ColorConfig {
  active: string;   // Hex color for active state
  inactive: string; // Hex color for inactive state
}

// ========== GENERATOR/SOURCE NODES ==========
export interface PembangkitNodeData {
  label?: string;
  power?: string;
  voltage?: string;
  type?: string;
  status?: "active" | "inactive";
  colorConfig?: ColorConfig;
}

export interface Source2NodeData {
  label?: string;
  status?: "active" | "inactive";
  colorConfig?: ColorConfig;
}

// ========== SWITCH NODES ==========
export interface SwitchNodeData {
  label?: string;
  position?: "OPEN" | "CLOSE";
  voltage?: string;
  rotation?: number;
  colorConfig?: {
    open: string;   // Hex color when open
    close: string;  // Hex color when close
  };
}

export interface CircuitBreakerNodeData {
  label?: string;
  status?: "OPEN" | "CLOSE";
  voltage?: string;
  current?: string;
  rotation?: number;
  colorConfig?: {
    open: string;   // Hex color when open
    close: string;  // Hex color when close
  };
}

// ========== TRANSFORMER NODES ==========
export interface TransformerNodeData {
  label?: string;
  ratio?: string;
  voltageLevel?: string;
  capacity?: string;
  status?: "active" | "inactive";
  colorConfig?: ColorConfig;
}

// ========== LOAD NODES ==========
export interface LoadNodeData {
  label?: string;
  power?: string;
  voltage?: string;
  status?: "active" | "inactive";
  colorConfig?: ColorConfig;
}

// ========== BUSBAR NODES ==========
export interface BusbarNodeData {
  label?: string;
  voltage?: string;
  fill?: string;
  stroke?: string;
}

// ========== SHAPE NODES ==========
export interface RectangleNodeData {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export interface CircleNodeData {
  radius?: number;
  fill?: string;
  stroke?: string;
}

// ========== TEXT NODE ==========
export interface TextNodeData {
  label?: string;
  fontSize?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
}

// ========== DEFAULT NODE CONFIGS ==========
export const DEFAULT_COLOR_CONFIGS = {
  pembangkit: {
    active: "#00ff00",    // Green
    inactive: "#808080",  // Gray
  },
  transformer: {
    active: "#0066ff",    // Blue
    inactive: "#808080",  // Gray
  },
  load: {
    active: "#ffaa00",    // Orange
    inactive: "#808080",  // Gray
  },
  switch: {
    open: "#ff0000",      // Red
    close: "#00ff00",     // Green
  },
} as const;
