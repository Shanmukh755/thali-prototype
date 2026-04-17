import { createContext, useContext, useState, useEffect } from "react";

// ─── 6 Themes ───
export const THEMES = {
  // 1. Current default — generic red/white (baseline to compare against)
  classic: {
    id: "classic",
    name: "Classic Red",
    description: "Current default — familiar restaurant red",
    preview: ["#CC3333", "#FFFFFF", "#F8F8F8", "#1A1A1A"],
    vars: {
      "--primary": "#CC3333",
      "--primary-dark": "#A93226",
      "--primary-subtle": "rgba(204,51,51,0.06)",
      "--sidebar-bg": "#FFFFFF",
      "--sidebar-border": "#EEEEEE",
      "--sidebar-text": "#555555",
      "--sidebar-active-bg": "rgba(204,51,51,0.08)",
      "--sidebar-active-text": "#CC3333",
      "--sidebar-logo-bg": "#CC3333",
      "--page-bg": "#F8F8F8",
      "--surface": "#F8F8F8",
      "--border": "#E0E0E0",
      "--text-primary": "#1A1A1A",
      "--text-secondary": "#555555",
      "--text-muted": "#999999",
      "--header-bg": "#FFFFFF",
      "--header-border": "#EEEEEE",
      "--card-bg": "#FFFFFF",
    },
  },

  // 2. Warm Intelligence — amber/saffron + warm dark sidebar (recommended)
  amber: {
    id: "amber",
    name: "Saffron Intelligence",
    description: "Warm amber — ownable, Indian, premium",
    preview: ["#D97706", "#1C1917", "#FAFAF8", "#1C1917"],
    vars: {
      "--primary": "#D97706",
      "--primary-dark": "#B45309",
      "--primary-subtle": "rgba(217,119,6,0.07)",
      "--sidebar-bg": "#1C1917",
      "--sidebar-border": "#292524",
      "--sidebar-text": "#A8A29E",
      "--sidebar-active-bg": "rgba(217,119,6,0.15)",
      "--sidebar-active-text": "#FCD34D",
      "--sidebar-logo-bg": "#D97706",
      "--page-bg": "#FAFAF8",
      "--surface": "#F5F4F2",
      "--border": "#E7E5E4",
      "--text-primary": "#1C1917",
      "--text-secondary": "#57534E",
      "--text-muted": "#78716C",
      "--header-bg": "#FFFFFF",
      "--header-border": "#E7E5E4",
      "--card-bg": "#FFFFFF",
    },
  },

  // 3. Deep Navy — serious infrastructure feel (Stripe/Razorpay)
  navy: {
    id: "navy",
    name: "Deep Navy",
    description: "Dark navy sidebar — serious, enterprise, trustworthy",
    preview: ["#6366F1", "#0F172A", "#F8FAFC", "#0F172A"],
    vars: {
      "--primary": "#6366F1",
      "--primary-dark": "#4F46E5",
      "--primary-subtle": "rgba(99,102,241,0.07)",
      "--sidebar-bg": "#0F172A",
      "--sidebar-border": "#1E293B",
      "--sidebar-text": "#94A3B8",
      "--sidebar-active-bg": "rgba(99,102,241,0.15)",
      "--sidebar-active-text": "#A5B4FC",
      "--sidebar-logo-bg": "#6366F1",
      "--page-bg": "#F8FAFC",
      "--surface": "#F1F5F9",
      "--border": "#E2E8F0",
      "--text-primary": "#0F172A",
      "--text-secondary": "#475569",
      "--text-muted": "#94A3B8",
      "--header-bg": "#FFFFFF",
      "--header-border": "#E2E8F0",
      "--card-bg": "#FFFFFF",
    },
  },

  // 4. Forest Green — fresh, sustainable, calm
  forest: {
    id: "forest",
    name: "Forest Green",
    description: "Deep green — fresh, calm, growth-oriented",
    preview: ["#059669", "#064E3B", "#F0FDF4", "#064E3B"],
    vars: {
      "--primary": "#059669",
      "--primary-dark": "#047857",
      "--primary-subtle": "rgba(5,150,105,0.07)",
      "--sidebar-bg": "#064E3B",
      "--sidebar-border": "#065F46",
      "--sidebar-text": "#6EE7B7",
      "--sidebar-active-bg": "rgba(5,150,105,0.2)",
      "--sidebar-active-text": "#A7F3D0",
      "--sidebar-logo-bg": "#059669",
      "--page-bg": "#F0FDF4",
      "--surface": "#ECFDF5",
      "--border": "#D1FAE5",
      "--text-primary": "#064E3B",
      "--text-secondary": "#065F46",
      "--text-muted": "#6B7280",
      "--header-bg": "#FFFFFF",
      "--header-border": "#D1FAE5",
      "--card-bg": "#FFFFFF",
    },
  },

  // 5. Midnight Dark — full dark mode, modern, developer-friendly
  midnight: {
    id: "midnight",
    name: "Midnight Dark",
    description: "Full dark mode — modern, reduces eye strain",
    preview: ["#8B5CF6", "#0D0D0D", "#111111", "#8B5CF6"],
    vars: {
      "--primary": "#8B5CF6",
      "--primary-dark": "#7C3AED",
      "--primary-subtle": "rgba(139,92,246,0.1)",
      "--sidebar-bg": "#0D0D0D",
      "--sidebar-border": "#1A1A1A",
      "--sidebar-text": "#71717A",
      "--sidebar-active-bg": "rgba(139,92,246,0.15)",
      "--sidebar-active-text": "#C4B5FD",
      "--sidebar-logo-bg": "#8B5CF6",
      "--page-bg": "#111111",
      "--surface": "#1A1A1A",
      "--border": "#27272A",
      "--text-primary": "#FAFAFA",
      "--text-secondary": "#A1A1AA",
      "--text-muted": "#52525B",
      "--header-bg": "#0D0D0D",
      "--header-border": "#1A1A1A",
      "--card-bg": "#1A1A1A",
    },
  },

  // 6. Rose Gold — warm, premium, hospitality-forward
  rose: {
    id: "rose",
    name: "Rose Gold",
    description: "Warm rose — premium hospitality, luxury feel",
    preview: ["#E11D48", "#1F1315", "#FFF1F2", "#1F1315"],
    vars: {
      "--primary": "#E11D48",
      "--primary-dark": "#BE123C",
      "--primary-subtle": "rgba(225,29,72,0.06)",
      "--sidebar-bg": "#1F1315",
      "--sidebar-border": "#2D1B20",
      "--sidebar-text": "#9F8A8E",
      "--sidebar-active-bg": "rgba(225,29,72,0.15)",
      "--sidebar-active-text": "#FDA4AF",
      "--sidebar-logo-bg": "#E11D48",
      "--page-bg": "#FFF1F2",
      "--surface": "#FFE4E6",
      "--border": "#FECDD3",
      "--text-primary": "#1F1315",
      "--text-secondary": "#4C1D24",
      "--text-muted": "#9F8A8E",
      "--header-bg": "#FFFFFF",
      "--header-border": "#FECDD3",
      "--card-bg": "#FFFFFF",
    },
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem("thali-theme") || "classic";
  });

  const theme = THEMES[themeId] || THEMES.classic;

  // Apply CSS variables to :root whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    localStorage.setItem("thali-theme", themeId);
  }, [themeId, theme]);

  return (
    <ThemeContext.Provider
      value={{ themeId, setThemeId, theme, themes: THEMES }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
