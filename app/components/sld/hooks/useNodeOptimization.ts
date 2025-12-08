import { useCallback, useMemo } from "react";
import type { Node } from "reactflow";

/**
 * Hook untuk optimasi rendering node
 * Menggunakan shallow comparison untuk deteksi perubahan
 */
export const useNodeOptimization = () => {
  // Fungsi untuk membandingkan node secara shallow
  const areNodesEqual = useCallback((prevNode: Node, nextNode: Node): boolean => {
    // Quick reference check
    if (prevNode === nextNode) return true;
    
    // Check basic properties
    if (
      prevNode.id !== nextNode.id ||
      prevNode.type !== nextNode.type ||
      prevNode.selected !== nextNode.selected ||
      prevNode.position.x !== nextNode.position.x ||
      prevNode.position.y !== nextNode.position.y
    ) {
      return false;
    }

    // Check data properties (shallow comparison untuk performa)
    const prevData = prevNode.data || {};
    const nextData = nextNode.data || {};
    
    const dataKeys = new Set([...Object.keys(prevData), ...Object.keys(nextData)]);
    
    for (const key of dataKeys) {
      // Skip functions dan objects kompleks
      if (typeof prevData[key] === 'function' || typeof nextData[key] === 'function') {
        continue;
      }
      
      // Untuk nested objects seperti colorConfig, size
      if (typeof prevData[key] === 'object' && typeof nextData[key] === 'object') {
        if (JSON.stringify(prevData[key]) !== JSON.stringify(nextData[key])) {
          return false;
        }
      } else if (prevData[key] !== nextData[key]) {
        return false;
      }
    }

    return true;
  }, []);

  // Fungsi untuk filter node yang berubah
  const getChangedNodes = useCallback(
    (prevNodes: Node[], nextNodes: Node[]): Set<string> => {
      const changedIds = new Set<string>();

      // Buat map untuk quick lookup
      const prevNodesMap = new Map(prevNodes.map(n => [n.id, n]));
      const nextNodesMap = new Map(nextNodes.map(n => [n.id, n]));

      // Check untuk node yang berubah atau baru
      nextNodes.forEach(nextNode => {
        const prevNode = prevNodesMap.get(nextNode.id);
        if (!prevNode || !areNodesEqual(prevNode, nextNode)) {
          changedIds.add(nextNode.id);
        }
      });

      // Check untuk node yang dihapus
      prevNodes.forEach(prevNode => {
        if (!nextNodesMap.has(prevNode.id)) {
          changedIds.add(prevNode.id);
        }
      });

      return changedIds;
    },
    [areNodesEqual]
  );

  return {
    areNodesEqual,
    getChangedNodes,
  };
};

/**
 * Hook untuk memoize node berdasarkan dependencies spesifik
 */
export const useNodeMemo = <T extends any>(
  nodeData: any,
  dependencies: string[] = ['status', 'label', 'power', 'voltage']
) => {
  return useMemo(() => {
    const relevantData: any = {};
    dependencies.forEach(dep => {
      if (nodeData[dep] !== undefined) {
        relevantData[dep] = nodeData[dep];
      }
    });
    return relevantData;
  }, dependencies.map(dep => nodeData[dep]));
};
