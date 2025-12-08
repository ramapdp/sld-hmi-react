import { useEffect, useCallback, useRef } from "react";
import type { Node } from "reactflow";

interface RealTimeDataUpdate {
  nodeId: string;
  data: {
    status?: "active" | "inactive";
    power?: string;
    voltage?: string;
    current?: string;
    [key: string]: any;
  };
}

/**
 * Hook untuk handle real-time data streaming dengan optimasi
 * Menghindari re-render yang tidak perlu dengan batching updates
 */
export const useRealTimeData = (
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  options: {
    batchInterval?: number; // ms untuk batch updates (default: 100ms)
    maxBatchSize?: number; // max updates per batch (default: 50)
  } = {}
) => {
  const { batchInterval = 100, maxBatchSize = 50 } = options;
  
  const pendingUpdates = useRef<Map<string, RealTimeDataUpdate>>(new Map());
  const batchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Flush pending updates ke React Flow
   * Menggunakan single setState call untuk batch updates
   */
  const flushUpdates = useCallback(() => {
    if (pendingUpdates.current.size === 0) return;

    const updates = Array.from(pendingUpdates.current.values());
    
    setNodes((nodes) => {
      // Create a map untuk quick lookup
      const nodeMap = new Map(nodes.map(n => [n.id, n]));
      
      // Apply semua updates
      updates.forEach((update) => {
        const node = nodeMap.get(update.nodeId);
        if (node) {
          nodeMap.set(update.nodeId, {
            ...node,
            data: {
              ...node.data,
              ...update.data,
            },
          });
        }
      });
      
      return Array.from(nodeMap.values());
    });

    // Clear pending updates
    pendingUpdates.current.clear();

    if (batchTimeoutRef.current) {
      clearTimeout(batchTimeoutRef.current);
      batchTimeoutRef.current = null;
    }
  }, [setNodes]);

  /**
   * Queue update untuk batching
   */
  const queueUpdate = useCallback((update: RealTimeDataUpdate) => {
    // Merge dengan existing update untuk node yang sama
    const existing = pendingUpdates.current.get(update.nodeId);
    if (existing) {
      pendingUpdates.current.set(update.nodeId, {
        ...existing,
        data: { ...existing.data, ...update.data },
      });
    } else {
      pendingUpdates.current.set(update.nodeId, update);
    }

    // Flush immediately jika batch penuh
    if (pendingUpdates.current.size >= maxBatchSize) {
      flushUpdates();
      return;
    }

    // Schedule flush jika belum ada
    if (!batchTimeoutRef.current) {
      batchTimeoutRef.current = setTimeout(flushUpdates, batchInterval);
    }
  }, [batchInterval, maxBatchSize, flushUpdates]);

  /**
   * Handle single node update
   */
  const updateNode = useCallback((nodeId: string, data: Partial<any>) => {
    queueUpdate({ nodeId, data });
  }, [queueUpdate]);

  /**
   * Handle bulk updates (from WebSocket, MQTT, etc.)
   */
  const updateNodes = useCallback((updates: RealTimeDataUpdate[]) => {
    updates.forEach(queueUpdate);
  }, [queueUpdate]);

  /**
   * Force flush - berguna untuk critical updates
   */
  const forceFlush = useCallback(() => {
    flushUpdates();
  }, [flushUpdates]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (batchTimeoutRef.current) {
        clearTimeout(batchTimeoutRef.current);
      }
      flushUpdates();
    };
  }, [flushUpdates]);

  return {
    updateNode,
    updateNodes,
    forceFlush,
    pendingCount: pendingUpdates.current.size,
  };
};

/**
 * Example: WebSocket integration
 */
export const useWebSocketData = (
  url: string,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
  const { updateNodes } = useRealTimeData(setNodes);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Expect format: { updates: [{ nodeId, data }, ...] }
        if (data.updates && Array.isArray(data.updates)) {
          updateNodes(data.updates);
        }
      } catch (error) {
        console.error("WebSocket message parse error:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [url, updateNodes]);

  return wsRef;
};

/**
 * Example: MQTT integration (pseudo-code, requires mqtt.js)
 */
export const useMQTTData = (
  brokerUrl: string,
  topic: string,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
  const { updateNode } = useRealTimeData(setNodes);

  useEffect(() => {
    // Pseudo-code - actual implementation depends on mqtt library
    // const client = mqtt.connect(brokerUrl);
    // 
    // client.subscribe(topic);
    // 
    // client.on('message', (receivedTopic, message) => {
    //   const data = JSON.parse(message.toString());
    //   updateNode(data.nodeId, data.data);
    // });
    // 
    // return () => {
    //   client.end();
    // };
  }, [brokerUrl, topic, updateNode]);
};

/**
 * Example usage dalam component:
 * 
 * const SLDPage = () => {
 *   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
 *   
 *   // WebSocket streaming
 *   const ws = useWebSocketData("ws://localhost:3000/scada", setNodes);
 *   
 *   // Atau manual updates dengan batching
 *   const { updateNode, updateNodes } = useRealTimeData(setNodes, {
 *     batchInterval: 100,  // 100ms batching
 *     maxBatchSize: 50,    // Max 50 updates per batch
 *   });
 *   
 *   // Simulate SCADA updates
 *   useEffect(() => {
 *     const interval = setInterval(() => {
 *       updateNode("pembangkit-1", { 
 *         power: `${Math.random() * 100}`,
 *         voltage: `${20 + Math.random() * 2}`
 *       });
 *     }, 1000);
 *     
 *     return () => clearInterval(interval);
 *   }, [updateNode]);
 *   
 *   return <ReactFlow nodes={nodes} ... />;
 * };
 */
