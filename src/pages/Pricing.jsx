import { useState } from "react";
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Zap,
  ArrowRight,
} from "lucide-react";

// ─── Plan definitions ───
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Get started for free",
    monthlyPrice: 0,
    annualPrice: 0,
    priceNote: "Forever free",
    color: "text-[#555]",
    bg: "bg-white",
    border: "border-[#E0E0E0]",
    cta: "Get Started Free",
    ctaClass: "btn-outline w-full justify-center",
    popular: false,
    target: "New restaurants trying Thali",
    outcomes: [
      "Unlimited billing & KOT",
      "Zomato + Swiggy orders",
      "Basic WhatsApp briefing",
      "Basic reports",
      "Up to 1 cloud kitchen brand",
    ],
  },
  {
    id: "smart",
    name: "Smart",
    tagline: "For growing restaurants",
    monthlyPrice: 1499,
    annualPrice: 1249,
    priceNote: "/month",
    color: "text-info",
    bg: "bg-white",
    border: "border-[#E0E0E0]",
    cta: "Start 7-day Free Trial",
    ctaClass: "btn-outline w-full justify-center",
    popular: false,
    target: "Single outlet, serious operators",
    outcomes: [
      "Everything in Starter",
      "AI insights on WhatsApp (8 AM briefing)",
      "Aggregator reconciliation",
      "Recipe costing & margins",
      "Full CRM + loyalty program",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "The complete restaurant OS",
    monthlyPrice: 2499,
    annualPrice: 2082,
    priceNote: "/month",
    color: "text-white",
    bg: "bg-primary",
    border: "border-primary",
    cta: "Start 7-day Free Trial",
    ctaClass:
      "bg-white text-primary font-bold w-full py-[10px] rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2",
    popular: true,
    target: "Cloud kitchens & serious operators",
    outcomes: [
      "Everything in Smart",
      "Up to 5 cloud kitchen brands",
      "ONDC + WhatsApp ordering",
      "WhatsApp campaigns",
      "Menu engineering AI + fraud detection",
    ],
  },
  {
    id: "chain",
    name: "Chain",
    tagline: "For multi-outlet businesses",
    monthlyPrice: 1999,
    annualPrice: 1666,
    priceNote: "/outlet/month",
    color: "text-text-primary",
    bg: "bg-white",
    border: "border-[#1A1A1A]",
    cta: "Talk to Sales",
    ctaClass:
      "btn-outline w-full justify-center border-[#1A1A1A] text-text-primary hover:bg-surface",
    popular: false,
    target: "3+ outlets, chains, franchises",
    minNote: "Minimum 3 outlets",
    outcomes: [
      "Everything in Pro",
      "Central dashboard + benchmarking",
      "Named account manager",
      "30-min SLA (contractual)",
      "Franchise management",
    ],
  },
];

// ─── Add-ons ───
const ADDONS = [
  {
    name: "Extra Cloud Kitchen Brand",
    price: "₹799/brand/month",
    icon: "🏭",
    desc: "Add more virtual brands beyond your plan limit",
  },
  {
    name: "ONDC Integration",
    price: "₹399/month",
    icon: "🌐",
    desc: "List once, appear on all ONDC buyer apps",
  },
  {
    name: "WhatsApp Ordering Channel",
    price: "₹599/month",
    icon: "💬",
    desc: "Zero-commission direct ordering via WhatsApp",
  },
  {
    name: "CA / Accountant Dashboard",
    price: "₹299/month",
    icon: "📊",
    desc: "GSTR-1/3B auto-format, Tally sync, P&L export",
  },
];

// ─── Feature comparison table ───
const FEATURE_GROUPS = [
  {
    label: "Billing & POS",
    features: [
      {
        name: "Unlimited billing & KOT",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Table management (6 states)",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Quick Bill (counter)",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Offline billing",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "UPI / Card / Cash payments",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Split bill & partial payment",
        starter: false,
        smart: true,
        pro: true,
        chain: true,
      },
    ],
  },
  {
    label: "Online Orders",
    features: [
      {
        name: "Zomato + Swiggy integration",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "ONDC integration",
        starter: false,
        smart: false,
        pro: true,
        chain: true,
      },
      {
        name: "WhatsApp direct ordering",
        starter: false,
        smart: false,
        pro: "Add-on",
        chain: "Add-on",
      },
      {
        name: "Unified delivery screen",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Real-time margin per order",
        starter: false,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Aggregator reconciliation",
        starter: false,
        smart: true,
        pro: true,
        chain: true,
      },
    ],
  },
  {
    label: "AI & Intelligence",
    features: [
      {
        name: "Daily WhatsApp briefing",
        starter: "Basic",
        smart: "AI",
        pro: "AI",
        chain: "AI",
      },
      {
        name: "Demand forecasting (7-day)",
        starter: false,
        smart: false,
        pro: true,
        chain: true,
      },
      {
        name: "Menu engineering AI",
        starter: false,
        smart: false,
        pro: true,
        chain: true,
      },
      {
        name: "Waste prediction",
        starter: false,
        smart: false,
        pro: true,
        chain: true,
      },
      {
        name: "AI fraud detection",
        starter: false,
        smart: false,
        pro: true,
        chain: true,
      },
      {
        name: "Competitor price intelligence",
        starter: false,
        smart: false,
        pro: true,
        chain: true,
      },
    ],
  },
  {
    label: "Inventory",
    features: [
      {
        name: "Stock tracking & alerts",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Recipe costing",
        starter: false,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "AI purchase orders (WhatsApp)",
        starter: false,
        smart: false,
        pro: true,
        chain: true,
      },
      {
        name: "Waste log & prediction",
        starter: false,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Central kitchen module",
        starter: false,
        smart: false,
        pro: false,
        chain: true,
      },
    ],
  },
  {
    label: "CRM & Marketing",
    features: [
      {
        name: "Customer profiles",
        starter: "Basic",
        smart: "Full",
        pro: "Full",
        chain: "Full",
      },
      {
        name: "Loyalty program",
        starter: false,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "WhatsApp campaigns",
        starter: false,
        smart: false,
        pro: true,
        chain: true,
      },
      {
        name: "Customer segments",
        starter: false,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Feedback + Google review nudge",
        starter: false,
        smart: true,
        pro: true,
        chain: true,
      },
    ],
  },
  {
    label: "Cloud Kitchen",
    features: [
      {
        name: "Cloud kitchen brands",
        starter: "1",
        smart: "1",
        pro: "5",
        chain: "Unlimited",
      },
      {
        name: "Live stage tracking",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
      {
        name: "Per-brand P&L",
        starter: false,
        smart: false,
        pro: true,
        chain: true,
      },
      {
        name: "Multi-brand KDS",
        starter: true,
        smart: true,
        pro: true,
        chain: true,
      },
    ],
  },
  {
    label: "Support & SLA",
    features: [
      {
        name: "Support channels",
        starter: "In-app",
        smart: "WhatsApp + In-app",
        pro: "All channels",
        chain: "All + Video",
      },
      {
        name: "Response SLA",
        starter: "Best effort",
        smart: "4 hours",
        pro: "2 hours",
        chain: "30 minutes",
      },
      {
        name: "Named account manager",
        starter: false,
        smart: false,
        pro: false,
        chain: true,
      },
      {
        name: "On-site visits",
        starter: false,
        smart: false,
        pro: false,
        chain: "Quarterly",
      },
    ],
  },
  {
    label: "Multi-outlet",
    features: [
      {
        name: "Central dashboard",
        starter: false,
        smart: false,
        pro: false,
        chain: true,
      },
      {
        name: "Branch benchmarking",
        starter: false,
        smart: false,
        pro: false,
        chain: true,
      },
      {
        name: "Central menu management",
        starter: false,
        smart: false,
        pro: false,
        chain: true,
      },
      {
        name: "Franchise management",
        starter: false,
        smart: false,
        pro: false,
        chain: true,
      },
    ],
  },
];

// ─── FAQ ───
const FAQS = [
  {
    q: "Do I need to pay in advance?",
    a: "Never. Thali is monthly billing, cancel anytime. No advance payments, no lock-in. This is a direct promise — unlike PetPooja which takes annual advances.",
  },
  {
    q: "What happens after the 7-day free trial?",
    a: "You automatically move to the Starter (free) plan. You won't be charged unless you choose to upgrade. No credit card required to start the trial.",
  },
  {
    q: "Can I switch plans anytime?",
    a: "Yes. Upgrade or downgrade at any time. Changes take effect immediately. If you upgrade mid-month, you're charged the prorated difference.",
  },
  {
    q: "What is the Chain plan minimum?",
    a: "The Chain plan requires a minimum of 3 outlets. Each outlet is billed at ₹1,999/month (or ₹1,666/month on annual). You get a named account manager and 30-minute SLA.",
  },
  {
    q: "Is there a discount for annual billing?",
    a: "Yes — annual billing gives you 2 months free (effectively ~17% off). You pay for 10 months and get 12.",
  },
  {
    q: "What's included in the free Starter plan?",
    a: "Unlimited billing, KOT, table management, Zomato + Swiggy integration, basic WhatsApp briefing, and basic reports. It's a real working POS — not a crippled demo.",
  },
];

// ─── Cell renderer for feature table ───
function FeatureCell({ value }) {
  if (value === true)
    return <Check size={16} className="text-success mx-auto" />;
  if (value === false) return <X size={16} className="text-[#DDD] mx-auto" />;
  return <span className="text-[11px] font-semibold text-info">{value}</span>;
}

// ─── Plan card ───
function PlanCard({ plan, annual }) {
  const price = annual ? plan.annualPrice : plan.monthlyPrice;
  const isPro = plan.popular;

  return (
    <div
      className={`relative rounded-2xl border-2 p-6 flex flex-col ${plan.bg} ${plan.border} ${isPro ? "shadow-[0_8px_32px_rgba(204,51,51,0.18)]" : "shadow-card"}`}
    >
      {isPro && (
        <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-bold px-4 py-[4px] rounded-full">
          ⭐ MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <p
          className={`text-[18px] font-bold mb-1 ${isPro ? "text-white" : "text-text-primary"}`}
        >
          {plan.name}
        </p>
        <p
          className={`text-[12px] ${isPro ? "text-white/70" : "text-text-muted"}`}
        >
          {plan.tagline}
        </p>
        {plan.minNote && (
          <p
            className={`text-[10px] font-semibold mt-1 ${isPro ? "text-white/60" : "text-text-muted"}`}
          >
            {plan.minNote}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="mb-5">
        {price === 0 ? (
          <div>
            <span
              className={`text-[36px] font-extrabold ${isPro ? "text-white" : "text-text-primary"}`}
            >
              Free
            </span>
            <span
              className={`text-[13px] ml-2 ${isPro ? "text-white/70" : "text-text-muted"}`}
            >
              forever
            </span>
          </div>
        ) : (
          <div>
            <span
              className={`text-[13px] ${isPro ? "text-white/70" : "text-text-muted"}`}
            >
              ₹
            </span>
            <span
              className={`text-[36px] font-extrabold ${isPro ? "text-white" : "text-text-primary"}`}
            >
              {price.toLocaleString("en-IN")}
            </span>
            <span
              className={`text-[12px] ml-1 ${isPro ? "text-white/70" : "text-text-muted"}`}
            >
              {plan.priceNote}
            </span>
            {annual && plan.monthlyPrice > 0 && (
              <div
                className={`text-[11px] mt-1 font-semibold ${isPro ? "text-white/60" : "text-success"}`}
              >
                Save ₹
                {((plan.monthlyPrice - plan.annualPrice) * 12).toLocaleString(
                  "en-IN",
                )}
                /year
              </div>
            )}
          </div>
        )}
      </div>

      {/* Outcomes */}
      <div className="flex-1 space-y-[10px] mb-6">
        {plan.outcomes.map((outcome, i) => (
          <div key={i} className="flex items-start gap-2">
            <Check
              size={14}
              className={`flex-shrink-0 mt-[1px] ${isPro ? "text-white/80" : "text-success"}`}
            />
            <span
              className={`text-[12px] leading-tight ${isPro ? "text-white/90" : "text-text-secondary"}`}
            >
              {outcome}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className={plan.ctaClass}>
        {plan.cta} {isPro && <ArrowRight size={14} />}
      </button>

      {/* Target */}
      <p
        className={`text-[10px] text-center mt-3 ${isPro ? "text-white/50" : "text-text-muted"}`}
      >
        {plan.target}
      </p>
    </div>
  );
}

// ─── Feature comparison table ───
function ComparisonTable() {
  const [openGroups, setOpenGroups] = useState(
    Object.fromEntries(FEATURE_GROUPS.map((g) => [g.label, true])),
  );
  const toggle = (label) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  const COLS = ["starter", "smart", "pro", "chain"];
  const COL_LABELS = {
    starter: "Starter",
    smart: "Smart",
    pro: "Pro",
    chain: "Chain",
  };
  const COL_COLORS = {
    starter: "text-[#888]",
    smart: "text-info",
    pro: "text-primary font-bold",
    chain: "text-text-primary",
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EEEEEE] overflow-hidden">
      {/* Header row */}
      <div
        className="grid border-b border-[#EEEEEE]"
        style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}
      >
        <div className="px-5 py-4 text-[13px] font-semibold text-text-primary">
          Features
        </div>
        {COLS.map((col) => (
          <div
            key={col}
            className={`px-3 py-4 text-center text-[13px] font-semibold ${COL_COLORS[col]}`}
          >
            {COL_LABELS[col]}
          </div>
        ))}
      </div>

      {/* Feature groups */}
      {FEATURE_GROUPS.map((group) => (
        <div key={group.label}>
          {/* Group header */}
          <button
            onClick={() => toggle(group.label)}
            className="w-full grid items-center bg-[#FAFAFA] border-b border-[#EEEEEE] hover:bg-[#F5F5F5] transition-colors"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}
          >
            <div className="px-5 py-3 flex items-center gap-2 text-left">
              <span className="text-[12px] font-bold text-text-primary uppercase tracking-wide">
                {group.label}
              </span>
              {openGroups[group.label] ? (
                <ChevronUp size={13} className="text-text-muted" />
              ) : (
                <ChevronDown size={13} className="text-text-muted" />
              )}
            </div>
            {COLS.map((col) => (
              <div key={col} />
            ))}
          </button>

          {/* Feature rows */}
          {openGroups[group.label] &&
            group.features.map((feature, i) => (
              <div
                key={i}
                className="grid border-b border-[#F5F5F5] last:border-b-0 hover:bg-[#FAFAFA] transition-colors"
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}
              >
                <div className="px-5 py-3 text-[12px] text-text-secondary">
                  {feature.name}
                </div>
                {COLS.map((col) => (
                  <div
                    key={col}
                    className="px-3 py-3 flex items-center justify-center"
                  >
                    <FeatureCell value={feature[col]} />
                  </div>
                ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

// ─── ROI Calculator ───
function ROICalculator() {
  const [revenue, setRevenue] = useState(500000);
  const planCost = 2499;
  const commissionSaved = Math.round(revenue * 0.05); // ~5% if 30% orders go direct
  const wasteSaved = Math.round(revenue * 0.02);
  const reconciliationFound = Math.round(revenue * 0.015);
  const totalSaved = commissionSaved + wasteSaved + reconciliationFound;
  const roi = Math.round((totalSaved / planCost) * 10) / 10;

  return (
    <div className="bg-white rounded-2xl border border-[#EEEEEE] p-8">
      <div className="text-center mb-6">
        <h3 className="text-[20px] font-bold text-text-primary mb-2">
          Does Thali pay for itself?
        </h3>
        <p className="text-[13px] text-text-muted">
          Enter your monthly revenue and see the math
        </p>
      </div>

      <div className="max-w-[400px] mx-auto mb-6">
        <label className="form-label text-center block mb-2">
          Monthly Revenue
        </label>
        <div className="flex items-center gap-3">
          <span className="text-[18px] font-bold text-text-muted">₹</span>
          <input
            type="range"
            min={100000}
            max={2000000}
            step={50000}
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-[16px] font-bold text-text-primary min-w-[80px] text-right">
            ₹{(revenue / 100000).toFixed(1)}L
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Commission saved",
            value: commissionSaved,
            desc: "Direct orders via WhatsApp",
          },
          {
            label: "Waste reduction",
            value: wasteSaved,
            desc: "AI pre-waste prediction",
          },
          {
            label: "Reconciliation found",
            value: reconciliationFound,
            desc: "Aggregator discrepancies",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#E8F8F0] rounded-xl p-4 text-center"
          >
            <p className="text-[22px] font-bold text-success">
              ₹{s.value.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] font-semibold text-text-primary mt-1">
              {s.label}
            </p>
            <p className="text-[10px] text-text-muted mt-[2px]">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary rounded-xl p-5 text-center text-white">
        <p className="text-[13px] text-white/70 mb-1">
          Thali Pro costs ₹2,499/month
        </p>
        <p className="text-[28px] font-extrabold mb-1">
          ₹{totalSaved.toLocaleString("en-IN")} saved/month
        </p>
        <p className="text-[14px] font-semibold text-white/90">
          That's a <span className="text-[20px] font-extrabold">{roi}×</span>{" "}
          return on your subscription
        </p>
      </div>
    </div>
  );
}

// ─── FAQ accordion ───
function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-[720px] mx-auto space-y-2">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#FAFAFA] transition-colors"
          >
            <span className="text-[13px] font-semibold text-text-primary">
              {faq.q}
            </span>
            {open === i ? (
              <ChevronUp size={15} className="text-text-muted flex-shrink-0" />
            ) : (
              <ChevronDown
                size={15}
                className="text-text-muted flex-shrink-0"
              />
            )}
          </button>
          {open === i && (
            <div className="px-5 pb-4 border-t border-[#F5F5F5]">
              <p className="text-[12px] text-text-secondary leading-relaxed pt-3">
                {faq.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Pricing page ───
export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="fade-in max-w-[1100px] mx-auto">
      {/* ── Hero ── */}
      <div className="text-center mb-10">
        <h1 className="text-[32px] font-extrabold text-text-primary mb-3">
          Simple pricing. Serious results.
        </h1>
        <p className="text-[15px] text-text-muted mb-6">
          Monthly billing · Cancel anytime · No advance payments · 7-day free
          Pro trial
        </p>

        {/* Monthly / Annual toggle */}
        <div className="inline-flex items-center gap-3 bg-surface rounded-pill px-4 py-2 border border-[#E0E0E0]">
          <span
            className={`text-[13px] font-semibold ${!annual ? "text-text-primary" : "text-text-muted"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-[44px] h-[24px] rounded-pill transition-colors ${annual ? "bg-primary" : "bg-[#CCC]"}`}
          >
            <span
              className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all ${annual ? "left-[23px]" : "left-[3px]"}`}
            />
          </button>
          <span
            className={`text-[13px] font-semibold ${annual ? "text-text-primary" : "text-text-muted"}`}
          >
            Annual
            <span className="ml-2 text-[10px] font-bold bg-[#E8F8F0] text-success px-2 py-[2px] rounded-full">
              2 months free
            </span>
          </span>
        </div>
      </div>

      {/* ── Plan cards ── */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} annual={annual} />
        ))}
      </div>

      {/* ── Trust signals ── */}
      <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
        {[
          "✅ Monthly billing — cancel anytime",
          "🎁 7-day free Pro trial — no credit card",
          "🚫 No advance payments — ever",
          "📞 Support SLA in every contract",
        ].map((t) => (
          <span key={t} className="text-[12px] text-text-muted font-medium">
            {t}
          </span>
        ))}
      </div>

      {/* ── Feature comparison toggle ── */}
      <div className="text-center mb-4">
        <button
          onClick={() => setShowTable(!showTable)}
          className="btn-ghost text-sm py-[8px] px-5"
        >
          {showTable ? "Hide" : "See full"} feature comparison
          {showTable ? (
            <ChevronUp size={14} className="ml-1" />
          ) : (
            <ChevronDown size={14} className="ml-1" />
          )}
        </button>
      </div>

      {showTable && (
        <div className="mb-12">
          <ComparisonTable />
        </div>
      )}

      {/* ── Add-ons ── */}
      <div className="mb-12">
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-text-primary mb-2">
            ⚡ Power Up Any Plan
          </h2>
          <p className="text-[13px] text-text-muted">
            Add-ons available on Smart and above
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {ADDONS.map((addon) => (
            <div
              key={addon.name}
              className="bg-white rounded-xl border border-[#EEEEEE] p-4 hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-2 block">{addon.icon}</span>
              <p className="text-[13px] font-semibold text-text-primary mb-1">
                {addon.name}
              </p>
              <p className="text-[11px] text-text-muted mb-3 leading-relaxed">
                {addon.desc}
              </p>
              <p className="text-[14px] font-bold text-primary">
                {addon.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ROI Calculator ── */}
      <div className="mb-12">
        <ROICalculator />
      </div>

      {/* ── FAQ ── */}
      <div className="mb-12">
        <h2 className="text-[22px] font-bold text-text-primary text-center mb-6">
          Frequently Asked Questions
        </h2>
        <FAQSection />
      </div>

      {/* ── Bottom CTA ── */}
      <div className="text-center bg-primary rounded-2xl p-10 text-white mb-8">
        <h2 className="text-[26px] font-extrabold mb-3">Ready to try Thali?</h2>
        <p className="text-white/80 text-[14px] mb-6">
          Start free. Get 7 days of Pro automatically. No credit card needed.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors text-[14px]">
            Start Free — No Card Needed
          </button>
          <button className="border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-[14px]">
            Talk to Sales
          </button>
        </div>
      </div>
    </div>
  );
}
