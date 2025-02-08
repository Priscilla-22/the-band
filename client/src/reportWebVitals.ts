// src/reportWebVitals.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);   // Track CLS (Cumulative Layout Shift)
    onFID(onPerfEntry);   // Track FID (First Input Delay)
    onFCP(onPerfEntry);   // Track FCP (First Contentful Paint)
    onLCP(onPerfEntry);   // Track LCP (Largest Contentful Paint)
    onTTFB(onPerfEntry);  // Track TTFB (Time to First Byte)
  }
};

export default reportWebVitals;
