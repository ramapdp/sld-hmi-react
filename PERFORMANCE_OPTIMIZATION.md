# Performance Optimization Guide

## Overview
Aplikasi SLD (Single Line Diagram) dioptimasi untuk menangani banyak node dan data yang mengalir secara real-time dengan menerapkan teknik rendering selektif.

## Teknik Optimasi yang Diterapkan

### 1. React.memo dengan Custom Comparison
Semua komponen node dan properties menggunakan `React.memo` dengan fungsi perbandingan kustom yang hanya membandingkan properti penting.

**Contoh:**
```typescript
export const PembangkitNode = memo(({ data, selected, id }) => {
  // Component logic
}, (prevProps, nextProps) => {
  // Hanya re-render jika property penting berubah
  return (
    prevProps.id === nextProps.id &&
    prevProps.selected === nextProps.selected &&
    prevProps.data.status === nextProps.data.status &&
    prevProps.data.power === nextProps.data.power
  );
});
```

**Manfaat:**
- Node yang tidak berubah tidak akan di-render ulang
- Saat 1 dari 100 node berubah, hanya 1 node yang di-render

### 2. useMemo untuk Computed Values
Nilai yang dihitung (seperti warna, ukuran) di-cache dengan `useMemo`.

**Contoh:**
```typescript
const currentColor = useMemo(
  () => status === "active" ? colorConfig.active : colorConfig.inactive,
  [status, colorConfig.active, colorConfig.inactive]
);
```

**Manfaat:**
- Menghindari perhitungan ulang yang tidak perlu
- Mengurangi CPU usage

### 3. useCallback untuk Event Handlers
Semua event handler menggunakan `useCallback` untuk menjaga reference stability.

**Contoh:**
```typescript
const handleResize = useCallback((e, params) => {
  setNodes((nds) =>
    nds.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, size: params } } : node
    )
  );
}, [id, setNodes]);
```

**Manfaat:**
- Child components tidak re-render karena function reference berubah
- Mengurangi reconciliation overhead

### 4. Memoized Rendering di PropertiesPanel
Properties dan Commands di-render menggunakan `useMemo` untuk menghindari re-render.

**Contoh:**
```typescript
const renderSpecificProperties = useMemo(() => {
  switch (nodeType) {
    case "pembangkit":
      return <PembangkitProperties ... />;
    // ...
  }
}, [nodeType, nodeData, isEditMode]);
```

**Manfaat:**
- Panel properties hanya update saat data yang relevan berubah
- Mengurangi re-render cascade

## Performance Benchmarks

### Sebelum Optimasi:
- 100 nodes + 1 update = **semua 100 nodes** re-render
- Command execution = full properties panel re-render
- Status change = cascade re-render (node + panel + toolbar)

### Setelah Optimasi:
- 100 nodes + 1 update = **hanya 1 node** re-render
- Command execution = hanya affected node + command component
- Status change = targeted re-render

## Monitoring Performance

### React DevTools Profiler
1. Install React DevTools extension
2. Buka Profiler tab
3. Record saat melakukan perubahan
4. Lihat mana komponen yang re-render

### Console Logging (Development)
Tambahkan di node component untuk debug:
```typescript
useEffect(() => {
  console.log(`${id} rendered at`, new Date().toISOString());
});
```

## Best Practices untuk Developer

### ✅ DO:
1. **Selalu gunakan React.memo** untuk komponen node baru
2. **Implementasikan custom comparison** untuk memo
3. **Gunakan useMemo** untuk computed values
4. **Gunakan useCallback** untuk event handlers
5. **Batasi dependencies** di useMemo/useCallback

### ❌ DON'T:
1. **Jangan inline function** di render
   ```typescript
   // ❌ Bad
   <button onClick={() => handleClick(id)}>
   
   // ✅ Good
   const onClick = useCallback(() => handleClick(id), [id]);
   <button onClick={onClick}>
   ```

2. **Jangan inline object/array** di props
   ```typescript
   // ❌ Bad
   <Component data={{ name: 'test' }} />
   
   // ✅ Good
   const data = useMemo(() => ({ name: 'test' }), []);
   <Component data={data} />
   ```

3. **Jangan include semua props** di comparison
   ```typescript
   // ❌ Bad - terlalu strict
   (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
   
   // ✅ Good - hanya yang penting
   (prev, next) => prev.status === next.status && prev.label === next.label
   ```

## Adding New Optimized Node

Template untuk node baru:
```typescript
import { memo, useCallback, useMemo } from "react";

const arePropsEqual = (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.selected === nextProps.selected &&
    prevProps.data.status === nextProps.data.status
    // Tambahkan property penting lainnya
  );
};

export const NewNode = memo(({ data, selected, id }) => {
  const { setNodes } = useReactFlow();
  
  // Memoize computed values
  const computedValue = useMemo(() => {
    return data.someValue * 2;
  }, [data.someValue]);
  
  // Memoize callbacks
  const handleClick = useCallback(() => {
    // Handle logic
  }, [id]);
  
  return (
    <div onClick={handleClick}>
      {/* JSX */}
    </div>
  );
}, arePropsEqual);

NewNode.displayName = 'NewNode';
```

## Troubleshooting

### Komponen masih re-render terus
1. Check dependencies di useMemo/useCallback
2. Pastikan comparison function benar
3. Gunakan React DevTools Profiler
4. Log prevProps vs nextProps di comparison

### Data tidak update
1. Check apakah property ada di comparison function
2. Pastikan dependencies di useMemo lengkap
3. Verify onUpdateNode dipanggil dengan benar

## Future Optimizations

1. **Virtualization**: Render hanya node yang visible di viewport
2. **Web Workers**: Offload computasi berat ke background thread
3. **Debouncing**: Batch multiple updates
4. **Lazy Loading**: Load node components on demand
5. **Canvas Rendering**: Gunakan Canvas API untuk static nodes
