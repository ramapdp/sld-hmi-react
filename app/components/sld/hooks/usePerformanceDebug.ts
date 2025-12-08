import { useEffect, useRef } from "react";

/**
 * Hook untuk debug rendering performance
 * Menampilkan di console setiap kali komponen re-render dan alasannya
 */
export const useRenderDebug = (
  componentName: string,
  props: Record<string, any>,
  enabled: boolean = process.env.NODE_ENV === "development"
) => {
  const renderCount = useRef(0);
  const prevProps = useRef(props);

  useEffect(() => {
    if (!enabled) return;

    renderCount.current += 1;

    // Find which props changed
    const changedProps: Record<string, { from: any; to: any }> = {};

    Object.keys(props).forEach((key) => {
      if (prevProps.current[key] !== props[key]) {
        changedProps[key] = {
          from: prevProps.current[key],
          to: props[key],
        };
      }
    });

    if (Object.keys(changedProps).length > 0) {
      console.group(
        `🔄 ${componentName} re-rendered (${renderCount.current} times)`
      );
      console.log("Changed props:", changedProps);
      console.groupEnd();
    }

    prevProps.current = props;
  });
};

/**
 * Hook untuk mengukur render time
 */
export const useRenderTime = (
  componentName: string,
  enabled: boolean = process.env.NODE_ENV === "development"
) => {
  const startTime = useRef(performance.now());

  useEffect(() => {
    if (!enabled) return;

    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (renderTime > 16) {
      // Lebih dari 1 frame (16ms at 60fps)
      console.warn(
        `⚠️ Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`
      );
    }

    startTime.current = performance.now();
  });
};

/**
 * Hook untuk track berapa kali komponen di-mount/unmount
 */
export const useMountDebug = (
  componentName: string,
  enabled: boolean = process.env.NODE_ENV === "development"
) => {
  useEffect(() => {
    if (!enabled) return;

    console.log(`✅ ${componentName} mounted`);

    return () => {
      console.log(`❌ ${componentName} unmounted`);
    };
  }, [componentName, enabled]);
};

/**
 * Wrapper untuk measure performance sebuah function
 */
export const measurePerformance = <T extends (...args: any[]) => any>(
  fn: T,
  label: string
): T => {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();

    console.log(`⏱️ ${label} took ${(end - start).toFixed(2)}ms`);

    return result;
  }) as T;
};

/**
 * Hook untuk track memory usage (Chrome only)
 */
export const useMemoryDebug = (
  interval: number = 5000,
  enabled: boolean = process.env.NODE_ENV === "development"
) => {
  useEffect(() => {
    if (!enabled || !(performance as any).memory) return;

    const logMemory = () => {
      const memory = (performance as any).memory;
      console.log("💾 Memory usage:", {
        used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
      });
    };

    const intervalId = setInterval(logMemory, interval);

    return () => clearInterval(intervalId);
  }, [interval, enabled]);
};

/**
 * Utility untuk compare objects dan find differences
 */
export const findObjectDifferences = (
  obj1: any,
  obj2: any,
  path: string = ""
): string[] => {
  const differences: string[] = [];

  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  allKeys.forEach((key) => {
    const currentPath = path ? `${path}.${key}` : key;

    if (!(key in obj1)) {
      differences.push(`${currentPath} added`);
    } else if (!(key in obj2)) {
      differences.push(`${currentPath} removed`);
    } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (obj1[key] === null || obj2[key] === null) {
        if (obj1[key] !== obj2[key]) {
          differences.push(`${currentPath} changed (null)`);
        }
      } else {
        differences.push(...findObjectDifferences(obj1[key], obj2[key], currentPath));
      }
    } else if (obj1[key] !== obj2[key]) {
      differences.push(
        `${currentPath} changed (${JSON.stringify(obj1[key])} → ${JSON.stringify(obj2[key])})`
      );
    }
  });

  return differences;
};
