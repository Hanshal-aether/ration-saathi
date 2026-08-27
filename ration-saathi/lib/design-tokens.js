// Design tokens for consistent styling across the app
export const tokens = {
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
  },
  transition: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
  },
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
  colors: {
    service: {
      50: "#f1f8f7",
      100: "#dcefeb",
      500: "#168277",
      600: "#116960",
      700: "#0d524c",
    },
    trust: {
      50: "#f1f7fb",
      500: "#2878a8",
      700: "#185272",
    },
  },
  typography: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      normal: 400,
      semibold: 600,
      bold: 700,
    },
  },
};

export const cssVariables = `
  :root {
    /* Colors */
    --service-50: #f1f8f7;
    --service-100: #dcefeb;
    --service-500: #168277;
    --service-600: #116960;
    --service-700: #0d524c;
    --trust-50: #f1f7fb;
    --trust-500: #2878a8;
    --trust-700: #185272;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    
    /* Radius */
    --radius-sm: 0.5rem;
    --radius-md: 0.75rem;
    --radius-lg: 1rem;
    --radius-xl: 1.5rem;
    --radius-2xl: 2rem;
    
    /* Transitions */
    --transition-fast: 150ms ease-in-out;
    --transition-normal: 200ms ease-in-out;
    --transition-slow: 300ms ease-in-out;
  }
`;
