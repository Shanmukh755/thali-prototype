/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CC3333",
        "primary-dark": "#A93226",
        "primary-subtle": "rgba(204,51,51,0.06)",
        surface: "#F8F8F8",
        "color-border": "#E0E0E0",
        "border-dashed": "#CCCCCC",
        "text-primary": "#1A1A1A",
        "text-secondary": "#555555",
        "text-muted": "#999999",
        // Table states — exact from design guide
        "table-blank-bg": "#F5F5F5",
        "table-blank-border": "#CCCCCC",
        "table-running-bg": "#AED6F1",
        "table-running-border": "#5DADE2",
        "table-printed-bg": "#A9DFBF",
        "table-printed-border": "#27AE60",
        "table-paid-bg": "#F9E79F",
        "table-paid-border": "#F0C040",
        "table-kot-bg": "#F5CBA7",
        "table-kot-border": "#E67E22",
        // Status colors
        success: "#27AE60",
        warning: "#E67E22",
        danger: "#E74C3C",
        info: "#5DADE2",
      },
      fontFamily: {
        sans: ["Poppins", "Nunito", "sans-serif"],
      },
      fontSize: {
        xs: "10px",
        sm: "12px",
        base: "13px",
        md: "14px",
        lg: "16px",
        xl: "18px",
        "2xl": "20px",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        18: "72px",
        60: "240px",
        15: "60px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        modal: "0 4px 24px rgba(0,0,0,0.14)",
        header: "0 1px 0 #EEEEEE",
      },
      width: {
        sidebar: "240px",
        "sidebar-collapsed": "60px",
      },
      height: {
        header: "60px",
      },
      minWidth: {
        "table-card": "90px",
      },
      minHeight: {
        "table-card": "80px",
      },
    },
  },
  plugins: [],
};
