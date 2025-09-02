/**
 * Core Web Vitals Monitoring Script
 * Tracks key performance metrics: LCP, CLS, FCP, FID, and TTFB
 * Optimized for modern browsers with fallbacks for legacy support
 */

// Configuration
const CONFIG = {
  // Analytics endpoint (replace with your actual endpoint)
  endpoint: '/api/analytics/web-vitals',
  // Sample rate (0.1 = 10% of sessions)
  sampleRate: 1.0,
  // Debug mode
  debug: false,
  // Maximum number of retries for failed requests
  maxRetries: 3
};

// Utility functions
const utils = {
  // Generate unique session ID
  getSessionId: () => {
    if (!sessionStorage.getItem('webvitals_session_id')) {
      sessionStorage.setItem('webvitals_session_id', 
        'wv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      );
    }
    return sessionStorage.getItem('webvitals_session_id');
  },

  // Get page information
  getPageInfo: () => ({
    url: window.location.href,
    pathname: window.location.pathname,
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    connection: navigator.connection ? {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt
    } : null,
    timestamp: Date.now()
  }),

  // Check if should sample this session
  shouldSample: () => Math.random() < CONFIG.sampleRate,

  // Debug logging
  log: (message, data) => {
    if (CONFIG.debug) {
      console.log(`[Web Vitals] ${message}`, data);
    }
  },

  // Send data to analytics endpoint
  sendToAnalytics: async (data, retryCount = 0) => {
    try {
      const response = await fetch(CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      utils.log('Data sent successfully', data);
    } catch (error) {
      utils.log('Failed to send data', { error: error.message, data });
      
      // Retry logic
      if (retryCount < CONFIG.maxRetries) {
        setTimeout(() => {
          utils.sendToAnalytics(data, retryCount + 1);
        }, Math.pow(2, retryCount) * 1000); // Exponential backoff
      }
    }
  }
};

// Performance observer for tracking metrics
const createPerformanceObserver = (callback, options = {}) => {
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(callback);
    });
    observer.observe(options);
    return observer;
  } catch (error) {
    utils.log('PerformanceObserver not supported', error);
    return null;
  }
};

// Core Web Vitals metrics tracking
const metrics = {
  // Largest Contentful Paint (LCP)
  trackLCP: () => {
    let lcpValue = 0;
    let lcpEntries = [];

    const observer = createPerformanceObserver((entry) => {
      lcpValue = entry.startTime;
      lcpEntries.push(entry);
    }, { type: 'largest-contentful-paint', buffered: true });

    const sendLCP = () => {
      if (observer) observer.disconnect();
      
      const rating = lcpValue <= 2500 ? 'good' : lcpValue <= 4000 ? 'needs-improvement' : 'poor';
      
      utils.sendToAnalytics({
        metric: 'LCP',
        value: lcpValue,
        rating,
        entries: lcpEntries.length,
        sessionId: utils.getSessionId(),
        ...utils.getPageInfo()
      });

      utils.log('LCP tracked', { value: lcpValue, rating });
    };

    // Send LCP when page becomes hidden or after 5 seconds
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendLCP();
      }
    });

    setTimeout(sendLCP, 5000);
  },

  // Cumulative Layout Shift (CLS)
  trackCLS: () => {
    let clsValue = 0;
    let clsEntries = [];

    const observer = createPerformanceObserver((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }, { type: 'layout-shift', buffered: true });

    const sendCLS = () => {
      if (observer) observer.disconnect();
      
      const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
      
      utils.sendToAnalytics({
        metric: 'CLS',
        value: clsValue,
        rating,
        entries: clsEntries.length,
        sessionId: utils.getSessionId(),
        ...utils.getPageInfo()
      });

      utils.log('CLS tracked', { value: clsValue, rating });
    };

    // Send CLS when page becomes hidden
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendCLS();
      }
    });

    // Also send after 5 seconds for SPA compatibility
    setTimeout(sendCLS, 5000);
  },

  // First Contentful Paint (FCP)
  trackFCP: () => {
    const observer = createPerformanceObserver((entry) => {
      const fcpValue = entry.startTime;
      const rating = fcpValue <= 1800 ? 'good' : fcpValue <= 3000 ? 'needs-improvement' : 'poor';
      
      utils.sendToAnalytics({
        metric: 'FCP',
        value: fcpValue,
        rating,
        sessionId: utils.getSessionId(),
        ...utils.getPageInfo()
      });

      utils.log('FCP tracked', { value: fcpValue, rating });
      observer.disconnect();
    }, { type: 'paint', buffered: true });
  },

  // First Input Delay (FID)
  trackFID: () => {
    const observer = createPerformanceObserver((entry) => {
      const fidValue = entry.processingStart - entry.startTime;
      const rating = fidValue <= 100 ? 'good' : fidValue <= 300 ? 'needs-improvement' : 'poor';
      
      utils.sendToAnalytics({
        metric: 'FID',
        value: fidValue,
        rating,
        inputType: entry.name,
        sessionId: utils.getSessionId(),
        ...utils.getPageInfo()
      });

      utils.log('FID tracked', { value: fidValue, rating, inputType: entry.name });
      observer.disconnect();
    }, { type: 'first-input', buffered: true });
  },

  // Time to First Byte (TTFB)
  trackTTFB: () => {
    // Use Navigation Timing API
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      const ttfbValue = navigation.responseStart - navigation.requestStart;
      const rating = ttfbValue <= 800 ? 'good' : ttfbValue <= 1800 ? 'needs-improvement' : 'poor';
      
      utils.sendToAnalytics({
        metric: 'TTFB',
        value: ttfbValue,
        rating,
        sessionId: utils.getSessionId(),
        ...utils.getPageInfo()
      });

      utils.log('TTFB tracked', { value: ttfbValue, rating });
    } else {
      // Fallback for older browsers
      const ttfbValue = performance.timing.responseStart - performance.timing.requestStart;
      const rating = ttfbValue <= 800 ? 'good' : ttfbValue <= 1800 ? 'needs-improvement' : 'poor';
      
      utils.sendToAnalytics({
        metric: 'TTFB',
        value: ttfbValue,
        rating,
        sessionId: utils.getSessionId(),
        ...utils.getPageInfo()
      });

      utils.log('TTFB tracked (fallback)', { value: ttfbValue, rating });
    }
  },

  // Track additional performance metrics
  trackAdditionalMetrics: () => {
    // DOM Content Loaded
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      const dclValue = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      
      utils.sendToAnalytics({
        metric: 'DCL',
        value: dclValue,
        sessionId: utils.getSessionId(),
        ...utils.getPageInfo()
      });

      // Load Complete
      const loadValue = navigation.loadEventEnd - navigation.loadEventStart;
      
      utils.sendToAnalytics({
        metric: 'LOAD',
        value: loadValue,
        sessionId: utils.getSessionId(),
        ...utils.getPageInfo()
      });

      utils.log('Additional metrics tracked', { dcl: dclValue, load: loadValue });
    }
  }
};

// Initialize Web Vitals tracking
const initWebVitals = () => {
  // Check if sampling allows tracking
  if (!utils.shouldSample()) {
    utils.log('Session not sampled, skipping tracking');
    return;
  }

  utils.log('Initializing Web Vitals tracking');

  // Track all core metrics
  metrics.trackLCP();
  metrics.trackCLS();
  metrics.trackFCP();
  metrics.trackFID();
  metrics.trackTTFB();
  metrics.trackAdditionalMetrics();

  // Track page visibility changes for session context
  document.addEventListener('visibilitychange', () => {
    utils.sendToAnalytics({
      metric: 'VISIBILITY_CHANGE',
      value: document.visibilityState,
      sessionId: utils.getSessionId(),
      ...utils.getPageInfo()
    });
  });

  // Track errors that might affect metrics
  window.addEventListener('error', (event) => {
    utils.sendToAnalytics({
      metric: 'ERROR',
      value: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      sessionId: utils.getSessionId(),
      ...utils.getPageInfo()
    });
  });

  utils.log('Web Vitals tracking initialized successfully');
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWebVitals);
} else {
  initWebVitals();
}

// Export for manual initialization or configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initWebVitals,
    metrics,
    utils,
    CONFIG
  };
}

// Global namespace for browser usage
if (typeof window !== 'undefined') {
  window.WebVitalsTracker = {
    init: initWebVitals,
    metrics,
    utils,
    config: CONFIG
  };
}
