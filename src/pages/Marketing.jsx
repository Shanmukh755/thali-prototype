import { useState } from "react";
import {
  MessageSquare,
  Send,
  BarChart3,
  Plus,
  Zap,
  CheckCircle,
  X,
  Star,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";
import { CUSTOMERS } from "../data/mockData";

// ─── Shared helpers ───
const TIER_CFG = {
  Platinum: { icon: "💎", label: "Platinum" },
  Gold: { icon: "🥇", label: "Gold" },
  Silver: { icon: "🥈", label: "Silver" },
  Bronze: { icon: "🥉", label: "Bronze" },
};

const SEGMENTS = [
  { id: "all", label: "All Customers", count: CUSTOMERS.length },
  {
    id: "platinum",
    label: "💎 Platinum",
    count: CUSTOMERS.filter((c) => c.tier === "Platinum").length,
  },
  {
    id: "gold",
    label: "🥇 Gold",
    count: CUSTOMERS.filter((c) => c.tier === "Gold").length,
  },
  {
    id: "lapsed",
    label: "😴 Lapsed (30d)",
    count: CUSTOMERS.filter(
      (c) => c.lastVisit.includes("month") || c.lastVisit.includes("weeks"),
    ).length,
  },
  {
    id: "new",
    label: "🆕 New (1-3 visits)",
    count: CUSTOMERS.filter((c) => c.visits <= 3).length,
  },
  {
    id: "highspend",
    label: "💰 High Spenders",
    count: CUSTOMERS.filter((c) => c.totalSpent > 15000).length,
  },
];

const TEMPLATES = [
  {
    id: 1,
    name: "Lapsed Win-back",
    icon: "😴",
    msg: "Hi {name}! We miss you at Spice Garden 🍽️ It's been a while — come back and enjoy 20% off your next meal. Use code COMEBACK20. Valid this weekend only!",
  },
  {
    id: 2,
    name: "Birthday Offer",
    icon: "🎂",
    msg: "Happy Birthday {name}! 🎉 Celebrate with us at Spice Garden. Enjoy a complimentary dessert on your special day. Show this message to your waiter. Wishing you a wonderful day!",
  },
  {
    id: 3,
    name: "Weekend Special",
    icon: "🌟",
    msg: "Hey {name}! This weekend at Spice Garden — our Chef's Special Biryani is back! 🍛 Order before Sunday and get a free Mango Lassi. See you soon!",
  },
  {
    id: 4,
    name: "New Item Launch",
    icon: "🆕",
    msg: "Hi {name}! Exciting news — we've added new items to our menu! 🎊 Try our new Mutton Seekh Platter and Mango Shrikhand. First 50 orders get 15% off. Order now!",
  },
  {
    id: 5,
    name: "Loyalty Reward",
    icon: "⭐",
    msg: "Congratulations {name}! 🏆 You've earned enough points to redeem a FREE Butter Chicken. Visit us this week to claim your reward. Thank you for being a loyal customer!",
  },
  {
    id: 6,
    name: "Rainy Day Promo",
    icon: "🌧️",
    msg: "Rainy day? Stay cozy with Spice Garden! ☔ Order our hot Dal Makhani + Garlic Naan combo for just ₹199 (save ₹71). Free delivery on orders above ₹300. Order now!",
  },
];

// ─── Past campaigns data ───
const PAST_CAMPAIGNS = [
  {
    id: 1,
    name: "Lapsed Win-back — March",
    segment: "Lapsed (30d)",
    sent: 312,
    opened: 248,
    visited: 47,
    revenue: 38400,
    cost: 620,
    date: "28 Mar 2026",
    channel: "WhatsApp",
    status: "completed",
  },
  {
    id: 2,
    name: "Birthday April",
    segment: "Birthday",
    sent: 18,
    opened: 16,
    visited: 12,
    revenue: 9600,
    cost: 90,
    date: "1 Apr 2026",
    channel: "WhatsApp",
    status: "active",
  },
  {
    id: 3,
    name: "Weekend Biryani Special",
    segment: "All",
    sent: 847,
    opened: 612,
    visited: 94,
    revenue: 76800,
    cost: 1694,
    date: "12 Apr 2026",
    channel: "WhatsApp",
    status: "completed",
  },
  {
    id: 4,
    name: "Gold Member Exclusive",
    segment: "Gold",
    sent: 48,
    opened: 42,
    visited: 28,
    revenue: 22400,
    cost: 240,
    date: "15 Apr 2026",
    channel: "WhatsApp",
    status: "completed",
  },
];

// ─── Campaign builder modal ───
function CampaignBuilder({ onClose }) {
  const [step, setStep] = useState(1); // 1=segment, 2=message, 3=review
  const [segment, setSegment] = useState(SEGMENTS[0]);
  const [template, setTemplate] = useState(null);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const preview = msg.replace("{name}", "Ananya");

  if (sent)
    return (
      <div
        className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-modal w-full max-w-[400px] p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircle size={52} className="text-success mx-auto mb-4" />
          <p className="text-[17px] font-bold text-text-primary mb-1">
            Campaign Launched!
          </p>
          <p className="text-sm text-text-muted mb-1">
            Sending to {segment.count} customers via WhatsApp
          </p>
          <p className="text-xs text-[#25D366] font-semibold mb-6">
            Results will appear in Campaign Analytics within 24 hours
          </p>
          <button
            className="btn-primary w-full justify-center"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    );

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-[560px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#F0F0F0]">
          <div>
            <p className="text-[16px] font-semibold text-text-primary">
              New Campaign
            </p>
            <div className="flex items-center gap-2 mt-1">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-1">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= s ? "bg-primary text-white" : "bg-[#F0F0F0] text-text-muted"}`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-8 h-[2px] ${step > s ? "bg-primary" : "bg-[#F0F0F0]"}`}
                    />
                  )}
                </div>
              ))}
              <span className="text-[11px] text-text-muted ml-1">
                {step === 1
                  ? "Select Audience"
                  : step === 2
                    ? "Write Message"
                    : "Review & Send"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-4">
          {/* Step 1 — Segment */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-[13px] font-semibold text-text-primary mb-3">
                Who should receive this campaign?
              </p>
              {SEGMENTS.map((seg) => (
                <button
                  key={seg.id}
                  onClick={() => setSegment(seg)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${segment.id === seg.id ? "border-primary bg-[#FFF5F5]" : "border-[#EEEEEE] bg-white hover:border-[#CCC]"}`}
                >
                  <span
                    className={`text-[13px] font-medium ${segment.id === seg.id ? "text-primary" : "text-text-primary"}`}
                  >
                    {seg.label}
                  </span>
                  <span
                    className={`text-[12px] font-bold ${segment.id === seg.id ? "text-primary" : "text-text-muted"}`}
                  >
                    {seg.count} customers
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2 — Message */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <p className="text-[13px] font-semibold text-text-primary mb-2">
                  Choose a template (optional)
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTemplate(t);
                        setMsg(t.msg);
                      }}
                      className={`rounded-lg border p-2 text-left transition-all ${template?.id === t.id ? "border-primary bg-[#FFF5F5]" : "border-[#EEEEEE] hover:border-[#CCC]"}`}
                    >
                      <span className="text-lg">{t.icon}</span>
                      <p className="text-[10px] font-semibold text-text-primary mt-1 leading-tight">
                        {t.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="form-label">
                  Message{" "}
                  <span className="text-text-muted font-normal">
                    (use {"{name}"} to personalise)
                  </span>
                </label>
                <textarea
                  className="form-input resize-none"
                  rows={5}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Type your message..."
                />
                <p className="text-[10px] text-text-muted mt-1">
                  {msg.length} characters
                </p>
              </div>
              {msg && (
                <div>
                  <p className="form-label mb-2">Preview</p>
                  <div className="bg-[#DCF8C6] rounded-xl p-3 text-[12px] leading-relaxed">
                    {preview}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-surface rounded-xl p-4 space-y-3">
                {[
                  {
                    label: "Audience",
                    value: `${segment.label} (${segment.count} customers)`,
                  },
                  { label: "Channel", value: "WhatsApp Business API" },
                  { label: "Message", value: `${msg.slice(0, 60)}...` },
                  {
                    label: "Est. Cost",
                    value: `₹${segment.count * 2} (₹2/message)`,
                  },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex justify-between text-[13px]"
                  >
                    <span className="text-text-muted">{r.label}</span>
                    <span className="font-medium text-text-primary">
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-[#E6F9EE] rounded-lg px-3 py-2 flex items-center gap-2">
                <span>💬</span>
                <p className="text-[11px] text-[#1A6B3C] font-medium">
                  Messages sent only to opted-in customers (DPDP compliant)
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 px-6 pb-5 pt-3 border-t border-[#F0F0F0]">
          {step > 1 && (
            <button
              className="btn-ghost flex-shrink-0"
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              className="btn-primary flex-1 justify-center"
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 2 && !msg}
            >
              Next →
            </button>
          ) : (
            <button
              className="btn-primary flex-1 justify-center"
              onClick={() => setSent(true)}
            >
              <Zap size={14} /> Send to {segment.count} Customers
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Campaign analytics card ───
function CampaignCard({ campaign }) {
  const roi = Math.round((campaign.revenue - campaign.cost) / campaign.cost);
  const openPct = Math.round((campaign.opened / campaign.sent) * 100);
  const convPct = Math.round((campaign.visited / campaign.sent) * 100);

  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[13px] font-semibold text-text-primary">
            {campaign.name}
          </p>
          <p className="text-[11px] text-text-muted mt-[1px]">
            {campaign.segment} · {campaign.date}
          </p>
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${campaign.status === "active" ? "bg-[#E8F8F0] text-success" : "bg-[#F5F5F5] text-[#888]"}`}
        >
          {campaign.status === "active" ? "🟢 Active" : "Completed"}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-3">
        {[
          { label: "Sent", value: campaign.sent, color: "text-text-primary" },
          { label: "Opened", value: `${openPct}%`, color: "text-info" },
          { label: "Visited", value: `${convPct}%`, color: "text-success" },
          {
            label: "Revenue",
            value: `₹${(campaign.revenue / 1000).toFixed(0)}k`,
            color: "text-primary",
          },
        ].map((s) => (
          <div key={s.label} className="bg-surface rounded-lg p-2 text-center">
            <p className={`text-[15px] font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[9px] text-text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F5]">
        <div className="flex items-center gap-1 text-[11px]">
          <TrendingUp size={11} className="text-success" />
          <span className="font-semibold text-success">ROI: {roi}×</span>
          <span className="text-text-muted ml-1">· Cost ₹{campaign.cost}</span>
        </div>
        <span className="text-[10px] font-semibold text-info bg-[#EBF5FB] px-2 py-[2px] rounded-full">
          💬 {campaign.channel}
        </span>
      </div>
    </div>
  );
}

// ─── Offers & Promotions tab ───
const OFFERS = [
  {
    id: 1,
    name: "Happy Hours",
    desc: "20% off all beverages 3-6 PM",
    days: "Mon–Fri",
    active: true,
    type: "Time-based",
  },
  {
    id: 2,
    name: "Biryani Combo",
    desc: "Biryani + Raita + Lassi for ₹399",
    days: "All days",
    active: true,
    type: "Combo",
  },
  {
    id: 3,
    name: "Weekend Thali",
    desc: "Special Thali for ₹249 on weekends",
    days: "Sat–Sun",
    active: false,
    type: "Weekend",
  },
  {
    id: 4,
    name: "First Order 15%",
    desc: "15% off for new customers (first order)",
    days: "All days",
    active: true,
    type: "New customer",
  },
];

function OffersTab() {
  const [offers, setOffers] = useState(OFFERS);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-text-muted">
          Offers auto-apply at billing when conditions are met
        </p>
        <button className="btn-primary">
          <Plus size={14} /> New Offer
        </button>
      </div>
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="bg-white rounded-xl border border-[#EEEEEE] p-4 flex items-center gap-4"
        >
          <button
            onClick={() =>
              setOffers((prev) =>
                prev.map((o) =>
                  o.id === offer.id ? { ...o, active: !o.active } : o,
                ),
              )
            }
            className={`w-9 h-5 rounded-full transition-colors flex-shrink-0 ${offer.active ? "bg-primary" : "bg-[#CCC]"}`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow transition-all mt-[2px] ${offer.active ? "ml-[18px]" : "ml-[2px]"}`}
            />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-text-primary">
              {offer.name}
            </p>
            <p className="text-[11px] text-text-muted mt-[1px]">{offer.desc}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] bg-surface border border-[#EEEEEE] rounded px-2 py-[2px] text-text-muted">
              {offer.days}
            </span>
            <span className="text-[10px] bg-[#EBF5FB] text-info rounded px-2 py-[2px] font-semibold">
              {offer.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Marketing page ───
const TABS = [
  { id: "campaigns", label: "WhatsApp Campaigns" },
  { id: "offers", label: "Offers & Promotions" },
];

export default function Marketing() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [showBuilder, setShowBuilder] = useState(false);

  const totalRevenue = PAST_CAMPAIGNS.reduce((s, c) => s + c.revenue, 0);
  const totalSent = PAST_CAMPAIGNS.reduce((s, c) => s + c.sent, 0);
  const avgROI = Math.round(
    PAST_CAMPAIGNS.reduce((s, c) => s + (c.revenue - c.cost) / c.cost, 0) /
      PAST_CAMPAIGNS.length,
  );

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] font-semibold text-text-primary">
            Marketing
          </h1>
          <p className="text-[13px] text-text-muted mt-[2px]">
            WhatsApp campaigns · Offers · Promotions
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowBuilder(true)}>
          <Plus size={14} /> New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4 flex-shrink-0">
        {[
          {
            label: "Campaigns Run",
            value: PAST_CAMPAIGNS.length,
            color: "text-text-primary",
          },
          {
            label: "Messages Sent",
            value: totalSent.toLocaleString("en-IN"),
            color: "text-info",
          },
          {
            label: "Revenue Generated",
            value: `₹${(totalRevenue / 1000).toFixed(0)}k`,
            color: "text-primary",
          },
          { label: "Avg ROI", value: `${avgROI}×`, color: "text-success" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-[#EEEEEE] px-4 py-3"
          >
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
              {s.label}
            </p>
            <p className={`text-[22px] font-bold leading-tight ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-[5px] mb-4 flex-shrink-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-[7px] rounded-lg text-xs font-semibold border transition-all ${activeTab === t.id ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-[#E0E0E0] hover:bg-surface"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "campaigns" && (
          <div className="grid grid-cols-2 gap-3">
            {PAST_CAMPAIGNS.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        )}
        {activeTab === "offers" && <OffersTab />}
      </div>

      {showBuilder && <CampaignBuilder onClose={() => setShowBuilder(false)} />}
    </div>
  );
}
