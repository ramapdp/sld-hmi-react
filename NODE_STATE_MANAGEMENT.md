# Node State Management System

## Arsitektur

Sistem ini memungkinkan setiap node memiliki:
1. **Multiple States** - active/inactive, open/close, dll
2. **State-Specific Colors** - Warna berbeda untuk setiap state
3. **Dynamic SVG Filtering** - CSS filter untuk mengubah warna SVG
4. **Type Safety** - TypeScript interfaces untuk setiap node type

## Struktur Data Node

### 1. Pembangkit Node
```typescript
{
  type: "pembangkit",
  data: {
    status: "active" | "inactive",
    colorConfig: {
      active: { hue: 120, saturation: 150, brightness: 100 },   // Hijau
      inactive: { hue: 0, saturation: 0, brightness: 50 }        // Abu-abu
    },
    power: "200MW",
    voltage: "150kV",
    size: { width: 60, height: 60 }
  }
}
```

### 2. Switch/Circuit Breaker Node
```typescript
{
  type: "circuitBreaker",
  data: {
    status: "OPEN" | "CLOSE",
    colorConfig: {
      open: { hue: 0, saturation: 150, brightness: 100 },      // Merah
      close: { hue: 120, saturation: 150, brightness: 100 }    // Hijau
    },
    voltage: "150kV",
    current: "500A"
  }
}
```

## Cara Menggunakan

### 1. Toggle Status dari UI
```typescript
// Di Properties Panel
<button onClick={() => 
  onUpdateNode(nodeId, { ...data, status: "active" })
}>
  Set Active
</button>
```

### 2. Toggle Status dari Script/Logic
```typescript
// Contoh: Set semua pembangkit menjadi inactive
setNodes((nds) =>
  nds.map((node) =>
    node.type === "pembangkit"
      ? { ...node, data: { ...node.data, status: "inactive" } }
      : node
  )
);
```

### 3. Custom Color per State
Properties Panel menyediakan kontrol untuk:
- **Hue (0-360°)** - Warna dasar (merah, kuning, hijau, biru, dll)
- **Saturation (0-200%)** - Intensitas warna
- **Brightness (0-200%)** - Kecerahan

## Implementasi untuk Node Type Lain

### Template untuk Node Component
```typescript
import { memo } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import IconSVG from "~/assets/icons/your-icon.svg";
import type { YourNodeData } from "~/types/node-data.types";

export const YourNode = memo(({ 
  data, 
  selected, 
  id 
}: { 
  data: YourNodeData; 
  selected: boolean; 
  id: string 
}) => {
  const { setNodes } = useReactFlow();
  
  // Default color config
  const defaultColorConfig = {
    active: { hue: 120, saturation: 150, brightness: 100 },
    inactive: { hue: 0, saturation: 0, brightness: 50 },
  };
  
  const colorConfig = data.colorConfig || defaultColorConfig;
  const status = data.status || "inactive";
  const currentColor = status === "active" 
    ? colorConfig.active 
    : colorConfig.inactive;

  return (
    <div>
      <Handle position={Position.Top} id="top" />
      <img
        src={IconSVG}
        alt="Your Node"
        style={{ 
          width: 60,
          height: 60,
          filter: \`hue-rotate(\${currentColor.hue}deg) saturate(\${currentColor.saturation}%) brightness(\${currentColor.brightness}%)\`,
          transition: 'filter 0.3s ease-in-out'
        }}
      />
      <Handle position={Position.Bottom} id="bottom" />
    </div>
  );
});
```

## Preset Warna yang Direkomendasikan

### Status Active/Inactive
- **Active (Hijau)**: `{ hue: 120, saturation: 150, brightness: 100 }`
- **Inactive (Abu-abu)**: `{ hue: 0, saturation: 0, brightness: 50 }`

### Status Open/Close (Switch)
- **Open (Merah)**: `{ hue: 0, saturation: 150, brightness: 100 }`
- **Close (Hijau)**: `{ hue: 120, saturation: 150, brightness: 100 }`

### Tipe Equipment
- **Generator (Kuning-Hijau)**: `{ hue: 80, saturation: 140, brightness: 110 }`
- **Transformer (Biru)**: `{ hue: 200, saturation: 120, brightness: 100 }`
- **Load (Orange)**: `{ hue: 40, saturation: 150, brightness: 100 }`
- **Warning (Kuning)**: `{ hue: 60, saturation: 150, brightness: 120 }`
- **Error (Merah)**: `{ hue: 0, saturation: 200, brightness: 120 }`

## Fitur Advanced

### 1. Animasi Transisi
Semua perubahan warna memiliki smooth transition (0.3s)

### 2. Kontrol Manual
User bisa override warna default via Properties Panel

### 3. Type Safety
Semua node data ter-type dengan TypeScript untuk menghindari error

### 4. Extensible
Mudah menambahkan node type baru dengan copy-paste template

## Next Steps

1. **Tambahkan Logic ke Switch Nodes** - Sama seperti Pembangkit
2. **Tambahkan ke Transformer Nodes** - Support status active/inactive
3. **Tambahkan ke Load Nodes** - Show active/inactive dengan warna
4. **Integration dengan Backend** - Update status dari SCADA/real-time data
