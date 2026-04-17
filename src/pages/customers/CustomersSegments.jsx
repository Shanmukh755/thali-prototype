import { useState } from "react";
import { Users, MessageSquare, ChevronRight, Plus, Zap } from "lucide-react";
import { CUSTOMERS } from "../../data/mockData";

// ─── Pre-built segments ───
const SEGMENTS = [
  {
    id: 1,
    name: "High Spenders",
    icon: "💰",
    color: "text-[#F9A825]",
    bg: "bg-[#FFFDE7]",
    desc: "Spent > ₹15,000 lifetime",
    filter: (c) => c.totalSpent > 15000,
    action: "Send VIP offer",
  },
  {
    id: 2,
    name: "Lapsed (30 days)",
    icon: "😴",
    color: "text-danger",
    bg: "bg-[#FDECEA]",
    desc: "Haven't visited in 30+ days",
    filter: (c) =>
      c.lastVisit.includes("month") || c.lastVisit.includes("weeks"),
    action: "Win-back campaign",
  },
  {
    id: 3,
    name: "New Customers",
    icon: "🆕",
    color: "text-info",
    bg: "bg-[#EBF5FB]",
    desc: "Visited 1-3 times",
    filter: (c) => c.visits <= 3,
    action: "Welcome offer",
  },
  {
    id: 4,
    name: "Loyal Regulars",
    icon: "⭐",
    color: "text-success",
    bg: "bg-[#E8F8F0]",
    desc: "10+ visits, Gold or above",
    filter: (c) =>
      c.visits >= 10 && (c.tier === "Gold" || c.tier === "Platinum"),
    action: "Loyalty reward",
  },
  {
    id: 5,
    name: "Zomato-acquired",
    icon: "🔴",
    color: "text-[#E23744]",
    bg: "bg-[#FDE8EA]",
    desc: "First order via Zomato — never dined in",
    filter: (c) => c.acquisitionSource === "Zomato",
    action: "Convert to direct",
  },
  {
    id: 6,
    name: "Birthday This Month",
    icon: "🎂",
    color: "text-[#9C27B0]",
    bg: "bg-[#F3E5F5]",
    desc: "Birthday in April 2026",
    filter: () => false, // demo — no birthday data
    action: "Birthday offer",
  },
];

function SegmentCard({ segment, onLaunch }) {
  const count = CUSTOMERS.filter(segment.filter).length;

  return (
    <div
      className={`rounded-xl border p-4 ${segment.bg} border-transparent hover:shadow-md transition-all cursor-default`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{segment.icon}</span>
          <div>
            <p className={`text-[13px] font-bold ${segment.color}`}>
              {segment.name}
            </p>
            <p className="text-[11px] text-text-muted mt-[1px]">
              {segment.desc}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[22px] font-bold text-text-primary">{count}</p>
          <p className="text-[10px] text-text-muted">customers</p>
        </div>
      </div>
      <button
        onClick={() => onLaunch(segment, count)}
        disabled={count === 0}
        className="w-full btn-primary justify-center text-xs py-[7px] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <MessageSquare size={12} /> {segment.action}
      </button>
    </div>
  );
}

// ─── Campaign launch modal ───
function CampaignModal({ segment, count, onClose }) {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState(
    `Hi {name}! 🎉 Special offer just for you from Spice Garden. Use code THALI20 for 20% off your next order. Valid till Sunday!`,
  );

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
          <div className="text-5xl mb-4">✅</div>
          <p className="text-[17px] font-bold text-text-primary mb-1">
            Campaign Sent!
          </p>
          <p className="text-sm text-text-muted mb-1">
            WhatsApp message sent to {count} customers
          </p>
          <p className="text-xs text-[#25D366] font-semibold mb-6">
            Segment: {segment.name}
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
        className="bg-white rounded-2xl shadow-modal w-full max-w-[480px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#F0F0F0]">
          <div>
            <p className="text-[16px] font-semibold text-text-primary">
              Launch Campaign
            </p>
            <p className="text-xs text-text-muted mt-[2px]">
              {segment.name} · {count} customers
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="form-label">WhatsApp Message</label>
            <textarea
              className="form-input resize-none"
              rows={4}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <p className="text-[10px] text-text-muted mt-1">
              Use {"{name}"} to personalise. {msg.length} chars.
            </p>
          </div>
          <div className="bg-[#DCF8C6] rounded-lg p-3 text-[12px] leading-relaxed">
            <p className="font-semibold text-[#1A6B3C] mb-1">
              Preview for Ananya Krishnan:
            </p>
            {msg.replace("{name}", "Ananya")}
          </div>
          <div className="bg-[#E6F9EE] rounded-lg px-3 py-2 flex items-center gap-2">
            <span>💬</span>
            <p className="text-[11px] text-[#1A6B3C] font-medium">
              Will be sent via WhatsApp Business API to {count} opted-in
              customers
            </p>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-5 pt-3 border-t border-[#F0F0F0]">
          <button className="btn-ghost flex-shrink-0" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary flex-1 justify-center"
            onClick={() => setSent(true)}
          >
            <Zap size={14} /> Send to {count} Customers
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CustomersSegments() {
  const [campaign, setCampaign] = useState(null);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <p className="text-sm text-text-muted">
          Pre-built segments — click to launch a WhatsApp campaign instantly
        </p>
        <button className="btn-primary">
          <Plus size={14} /> Custom Segment
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {SEGMENTS.map((seg) => (
            <SegmentCard
              key={seg.id}
              segment={seg}
              onLaunch={(s, count) => setCampaign({ segment: s, count })}
            />
          ))}
        </div>

        {/* Custom segment builder teaser */}
        <div className="mt-4 bg-white rounded-xl border border-dashed border-[#CCCCCC] p-6 text-center">
          <Plus size={24} className="text-text-muted mx-auto mb-2 opacity-40" />
          <p className="text-[14px] font-semibold text-text-primary mb-1">
            Build a Custom Segment
          </p>
          <p className="text-[12px] text-text-muted mb-3">
            Combine filters: visits, spend, last visit, tier, source, favourite
            item
          </p>
          <button className="btn-outline text-xs py-[6px] px-4">
            Open Segment Builder
          </button>
        </div>
      </div>

      {campaign && (
        <CampaignModal
          segment={campaign.segment}
          count={campaign.count}
          onClose={() => setCampaign(null)}
        />
      )}
    </div>
  );
}
