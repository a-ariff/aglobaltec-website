/**
 * Lighthouse CI Configuration for Performance Budgets
 * 
 * This configuration file defines comprehensive performance budgets for:
 * - Core Web Vitals (LCP, CLS, FCP, TBT)
 * - Lighthouse categories (Performance, Accessibility, SEO, Best Practices)
 * - Resource timing and loading performance
 */

module.exports = {
  ci: {
    // Build and collect settings
    collect: {
      // Number of runs to perform for each URL
      numberOfRuns: 3,
      
      // URLs to audit
      url: [
        'http://localhost:4321',
        'http://localhost:4321/blog',
        'http://localhost:4321/about'
      ],
      
      // Server settings for local development
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
    },

    // Upload settings for Lighthouse CI server or GitHub Action
    upload: {
      target: 'temporary-public-storage',
    },

    // Assertion settings for performance budgets
    assert: {
      // Global assertions for all audited pages
      assertions: {
        // === CORE WEB VITALS BUDGETS ===
        
        // Largest Contentful Paint (LCP) - should be < 2.5s
        'largest-contentful-paint': ['error', {maxNumericValue: 2500}],
        
        // Cumulative Layout Shift (CLS) - should be < 0.1
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
        
        // First Contentful Paint (FCP) - should be < 1.8s
        'first-contentful-paint': ['error', {maxNumericValue: 1800}],
        
        // Total Blocking Time (TBT) - should be < 300ms
        'total-blocking-time': ['error', {maxNumericValue: 300}],
        
        // First Input Delay (FID) simulation through TBT
        'max-potential-fid': ['error', {maxNumericValue: 130}],
        
        // === LIGHTHOUSE CATEGORY SCORES ===
        
        // Performance score - minimum 90%
        'categories:performance': ['error', {minScore: 0.90}],
        
        // Accessibility score - minimum 95%
        'categories:accessibility': ['error', {minScore: 0.95}],
        
        // SEO score - minimum 95%
        'categories:seo': ['error', {minScore: 0.95}],
        
        // Best Practices score - minimum 92%
        'categories:best-practices': ['error', {minScore: 0.92}],
        
        // === PERFORMANCE METRICS ===
        
        // Speed Index - should be < 3.4s
        'speed-index': ['error', {maxNumericValue: 3400}],
        
        // Time to Interactive - should be < 3.8s
        'interactive': ['error', {maxNumericValue: 3800}],
        
        // === RESOURCE BUDGETS ===
        
        // Total byte weight - should be < 1.6MB
        'total-byte-weight': ['error', {maxNumericValue: 1600000}],
        
        // Main thread work - should be < 2s
        'mainthread-work-breakdown': ['error', {maxNumericValue: 2000}],
        
        // Bootstrap time - should be < 1s
        'bootup-time': ['error', {maxNumericValue: 1000}],
        
        // === SPECIFIC AUDITS ===
        
        // Images should be optimized
        'uses-optimized-images': 'error',
        'uses-webp-images': 'warn',
        'uses-responsive-images': 'error',
        
        // Modern formats and compression
        'modern-image-formats': 'warn',
        'uses-text-compression': 'error',
        
        // Critical rendering path
        'render-blocking-resources': 'error',
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn',
        
        // Network efficiency
        'uses-http2': 'warn',
        'uses-long-cache-ttl': 'warn',
        
        // === ACCESSIBILITY REQUIREMENTS ===
        
        // Color contrast
        'color-contrast': 'error',
        
        // ARIA and semantic HTML
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'aria-valid-attr': 'error',
        'aria-valid-attr-value': 'error',
        'button-name': 'error',
        'link-name': 'error',
        
        // Keyboard navigation
        'focus-traps': 'error',
        'focusable-controls': 'error',
        'interactive-element-affordance': 'error',
        
        // Images and media
        'image-alt': 'error',
        'video-caption': 'error',
        
        // === SEO REQUIREMENTS ===
        
        // Meta tags
        'document-title': 'error',
        'meta-description': 'error',
        'html-has-lang': 'error',
        'html-lang-valid': 'error',
        
        // Structured data and crawlability
        'is-crawlable': 'error',
        'robots-txt': 'warn',
        'canonical': 'error',
        
        // Mobile friendliness
        'viewport': 'error',
        'font-size': 'error',
        'tap-targets': 'error',
      },
    },

    // Server configuration (if using LHCI server)
    server: {},

    // Wizard configuration for setup
    wizard: {}
  },

  // Additional performance budgets using resource timing
  budgets: [
    {
      path: '/*',
      resourceSizes: [
        {
          resourceType: 'document',
          budget: 50 // 50KB for HTML documents
        },
        {
          resourceType: 'stylesheet',
          budget: 100 // 100KB for CSS
        },
        {
          resourceType: 'script',
          budget: 300 // 300KB for JavaScript
        },
        {
          resourceType: 'image',
          budget: 800 // 800KB for images
        },
        {
          resourceType: 'font',
          budget: 200 // 200KB for fonts
        },
        {
          resourceType: 'total',
          budget: 1600 // 1.6MB total page weight
        }
      ],
      resourceCounts: [
        {
          resourceType: 'third-party',
          budget: 10 // Maximum 10 third-party requests
        },
        {
          resourceType: 'total',
          budget: 50 // Maximum 50 total requests
        }
      ],
      timings: [
        {
          metric: 'first-contentful-paint',
          budget: 1800 // 1.8s for FCP
        },
        {
          metric: 'largest-contentful-paint', 
          budget: 2500 // 2.5s for LCP
        },
        {
          metric: 'speed-index',
          budget: 3400 // 3.4s for Speed Index
        },
        {
          metric: 'interactive',
          budget: 3800 // 3.8s for TTI
        }
      ]
    }
  ]
};
