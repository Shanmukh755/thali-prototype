import { Check, X } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    priceNote: "Forever",
    color: "#888888",
    bg: "#F8F8F8",
    border: "#E0E0E0",
    popular: false,
    features: [
      { text: "1 outlet", included: true },
      { text: "1 cloud kitchen brand", included: true },
      { text: "Unlimited billing", included: true },
      { text: "Zomato + Swiggy orders", included: true },
      { text: "Basic WhatsApp briefing", included: true },
      { text: "Basic reports (in-app)", included: true },
      { text: "Basic customer list", included: true },
      { text: "AI insights on WhatsApp", included: false },
      { text: "Aggregator reconciliation", included: false },
      { text: "Recipe costing", included: false },
      { text: "WhatsApp campaigns", included: false },
      { text: "ONDC integration", included: false },
    ],
  },
  {
    name: "Smart",
    price: "₹1,499",
    priceNote: "/month",
    color: "#5DADE2",
    bg: "#EBF5FB",
    border: "#5DADE2",
    popular: false,
    features: [
      { text: "1 outlet", included: true },
      { text: "1 cloud kitchen brand", included: true },
      { text: "Unlimited billing", included: true },
      { text: "Zomato + Swiggy orders", included: true },
      { text: "AI insights on WhatsApp", included: true },
      { text: "Aggregator reconciliation", included: true },
      { text: "Recipe costing", included: true },
      { text: "Full customer profiles", included: true },
      { text: "Loyalty program", included: true },
      { text: "WhatsApp campaigns", included: false },
      { text: "ONDC integration", included: false },
      { text: "Auto vendor messages", included: false },
    ],
  },
  {
    name: "Pro",
    price: "₹2,499",
    priceNote: "/month",
    color: "#CC3333",
    bg: "#FFF5F5",
    border: "#CC3333",
    popular: true,
    features: [
      { text: "1 outlet", included: true },
      { text: "Up to 5 cloud kitchen brands", included: true },
      { text: "Unlimited billing", included: true },
      { text: "All platforms + ONDC", included: true },
      { text: "Full AI + automation", included: true },
      { text: "Aggregator reconciliation", included: true },
      { text: "WhatsApp campaigns", included: true },
      { text: "Auto vendor messages", included: true },
      { text: "Festival AI predictions", included: true },
      { text: "AI pricing suggestions", included: true },
      { text: "Menu engineering AI", included: true },
      { text: "AI fraud detection", included: true },
    ],
  },
  {
    name: "Chain",
    price: "₹1,999",
    priceNote: "/outlet/month",
    color: "#1A1A1A",
    bg: "#F5F5F5",
    border: "#333333",
    popular: false,
    minOutlets: "3+ outlets",
    features: [
      { text: "3+ outlets", included: true },
      { text: "Unlimited brands", included: true },
      { text: "Central dashboard", included: true },
      { text: "Named account manager", included: true },
      { text: "30-min SLA (contractual)", included: true },
      { text: "Franchise management", included: true },
      { text: "Per-outlet P&L", included: true },
      { text: "Central menu management", included: true },
      { text: "All Pro features", included: true },
      { text: "On-site visits (quarterly)", included: true },
      { text: "Monthly business review", included: true },
      { text: "Custom integrations", included: true },
    ],
  },
];

const ADD_ONS = [
  { name: "Extra Cloud Kitchen Brand", price: "₹799/brand/month", icon: "🏭" },
  { name: "ONDC Integration", price: "₹399/month", icon: "🌐" },
  { name: "WhatsApp Ordering Channel", price: "₹599/month", icon: "💬" },
  { name: "CA / Accountant Dashboard", price: "₹299/month", icon: "📊" },
  { name: "Staff Gamification App", price: "₹499/month", icon: "🎮" },
  {
    name: "Thali Pay (Embedded Payments)",
    price: "Free to activate",
    icon: "💳",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <div className="fade-in">
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          className="page-title"
          style={{ fontSize: "28px", marginBottom: "8px" }}
        >
          Simple, Transparent Pricing
        </div>
        <div style={{ fontSize: "14px", color: "#888" }}>
          Start free. Upgrade when you're ready. Cancel anytime.
        </div>
      </div>

      {/* Trial Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #CC3333, #A93226)",
          borderRadius: "12px",
          padding: "16px 24px",
          marginBottom: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "24px" }}>🎁</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>
              Every new signup gets a 7-day free Pro trial
            </div>
            <div style={{ fontSize: "12px", opacity: 0.85 }}>
              No credit card needed. Experience the full AI power before you
              decide.
            </div>
          </div>
        </div>
        <button
          style={{
            background: "white",
            color: "#CC3333",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          Start Free Trial →
        </button>
      </div>

      {/* Plan Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            style={{
              background: plan.bg,
              border: `${plan.popular ? "2px" : "1px"} solid ${plan.border}`,
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              boxShadow: plan.popular
                ? "0 4px 20px rgba(204,51,51,0.15)"
                : "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {plan.popular && (
              <div
                style={{
                  background: "#CC3333",
                  color: "white",
                  textAlign: "center",
                  padding: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                ⭐ MOST POPULAR
              </div>
            )}
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: plan.color,
                  marginBottom: "4px",
                }}
              >
                {plan.name}
              </div>
              {plan.minOutlets && (
                <div
                  style={{
                    fontSize: "11px",
                    color: "#888",
                    marginBottom: "4px",
                  }}
                >
                  {plan.minOutlets}
                </div>
              )}
              <div style={{ marginBottom: "16px" }}>
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#1A1A1A",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{ fontSize: "12px", color: "#888", marginLeft: "4px" }}
                >
                  {plan.priceNote}
                </span>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: plan.popular ? "#CC3333" : "transparent",
                  color: plan.popular ? "white" : plan.color,
                  border: plan.popular ? "none" : `1.5px solid ${plan.color}`,
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  marginBottom: "16px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {plan.price === "Free"
                  ? "Get Started Free"
                  : "Start 7-day Trial"}
              </button>
              <div
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  paddingTop: "14px",
                }}
              >
                {plan.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {f.included ? (
                      <Check
                        size={14}
                        color="#27AE60"
                        style={{ flexShrink: 0 }}
                      />
                    ) : (
                      <X size={14} color="#CCCCCC" style={{ flexShrink: 0 }} />
                    )}
                    <span
                      style={{
                        fontSize: "12px",
                        color: f.included ? "#333" : "#BBBBBB",
                      }}
                    >
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="card">
        <div className="card-header">
          <div style={{ fontWeight: 600, fontSize: "16px" }}>
            ⚡ Power Up Any Plan — Add-ons
          </div>
          <span style={{ fontSize: "12px", color: "#888" }}>
            Available on Smart and above
          </span>
        </div>
        <div className="card-body" style={{ padding: "0" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {ADD_ONS.map((addon, i) => (
              <div
                key={addon.name}
                style={{
                  padding: "16px 20px",
                  borderRight: i % 3 !== 2 ? "1px solid #F0F0F0" : "none",
                  borderBottom: i < 3 ? "1px solid #F0F0F0" : "none",
                  background: addon.highlight ? "#FFF5F5" : "white",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span style={{ fontSize: "24px" }}>{addon.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "13px" }}>
                      {addon.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: addon.highlight ? "#CC3333" : "#888",
                        fontWeight: addon.highlight ? 700 : 400,
                        marginTop: "2px",
                      }}
                    >
                      {addon.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PLG Funnel */}
      <div style={{ marginTop: "28px", textAlign: "center" }}>
        <div
          style={{ fontWeight: 600, fontSize: "16px", marginBottom: "20px" }}
        >
          How Product-Led Growth Works
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            flexWrap: "wrap",
          }}
        >
          {[
            { step: "1", label: "Sign up free", sub: "No credit card" },
            { step: "→", label: "", sub: "" },
            { step: "2", label: "7-day Pro trial", sub: "Auto-activates" },
            { step: "→", label: "", sub: "" },
            { step: "3", label: "Trial ends", sub: "Feel the loss" },
            { step: "→", label: "", sub: "" },
            { step: "4", label: "25-30% upgrade", sub: "Within 30 days" },
            { step: "→", label: "", sub: "" },
            { step: "5", label: "Word of mouth", sub: "Flywheel 🔄" },
          ].map((s, i) =>
            s.step === "→" ? (
              <div
                key={i}
                style={{ fontSize: "20px", color: "#CCCCCC", margin: "0 4px" }}
              >
                →
              </div>
            ) : (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "12px 16px",
                  background: "#F8F8F8",
                  borderRadius: "10px",
                  minWidth: "100px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#CC3333",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 6px",
                  }}
                >
                  {s.step}
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600 }}>
                  {s.label}
                </div>
                <div
                  style={{ fontSize: "10px", color: "#888", marginTop: "2px" }}
                >
                  {s.sub}
                </div>
              </div>
            ),
          )}
        </div>
        <div
          style={{
            marginTop: "16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#CC3333",
          }}
        >
          Free gets them in. Intelligence makes them pay. Scale makes us a
          platform.
        </div>
      </div>
    </div>
  );
}
