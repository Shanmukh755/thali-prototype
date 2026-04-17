import { useState } from "react";
import { Star, Gift, Trophy, ChevronRight } from "lucide-react";
import { CUSTOMERS } from "../../data/mockData";

const TIER_CFG = {
  Platinum: {
    icon: "💎",
    bg: "bg-[#F3F3F3]",
    text: "text-[#555]",
    next: null,
    nextAt: null,
    color: "#9E9E9E",
  },
  Gold: {
    icon: "🥇",
    bg: "bg-[#FFFDE7]",
    text: "text-[#F9A825]",
    next: "Platinum",
    nextAt: 50000,
    color: "#F9A825",
  },
  Silver: {
    icon: "🥈",
    bg: "bg-[#F5F5F5]",
    text: "text-[#757575]",
    next: "Gold",
    nextAt: 25000,
    color: "#9E9E9E",
  },
  Bronze: {
    icon: "🥉",
    bg: "bg-[#FDF3E7]",
    text: "text-[#CD7F32]",
    next: "Silver",
    nextAt: 8000,
    color: "#CD7F32",
  },
};

const TIER_COUNTS = {
  Platinum: CUSTOMERS.filter((c) => c.tier === "Platinum").length,
  Gold: CUSTOMERS.filter((c) => c.tier === "Gold").length,
  Silver: CUSTOMERS.filter((c) => c.tier === "Silver").length,
  Bronze: CUSTOMERS.filter((c) => c.tier === "Bronze").length,
};

const CHALLENGES = [
  {
    id: 1,
    title: "Weekend Warrior",
    desc: "Order 3 times this weekend",
    reward: "2× points",
    active: true,
    expires: "Sun 20 Apr",
  },
  {
    id: 2,
    title: "Biryani Lover",
    desc: "Order Biryani 5 times this month",
    reward: "Free Lassi",
    active: true,
    expires: "30 Apr",
  },
  {
    id: 3,
    title: "Bring a Friend",
    desc: "Refer a new customer",
    reward: "₹100 off",
    active: true,
    expires: "Ongoing",
  },
  {
    id: 4,
    title: "Breakfast Club",
    desc: "Visit before 11 AM twice",
    reward: "50 bonus pts",
    active: false,
    expires: "Ended",
  },
];

export default function CustomersLoyalty() {
  const totalPoints = CUSTOMERS.reduce((s, c) => s + c.loyaltyPoints, 0);

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-4">
      {/* Tier overview */}
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(TIER_CFG).map(([tier, cfg]) => (
          <div
            key={tier}
            className={`rounded-xl border p-4 ${cfg.bg} border-[${cfg.color}]/20`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{cfg.icon}</span>
              <span className={`text-[22px] font-bold ${cfg.text}`}>
                {TIER_COUNTS[tier]}
              </span>
            </div>
            <p className={`text-[13px] font-bold ${cfg.text}`}>{tier}</p>
            <p className="text-[10px] text-text-muted mt-[2px]">
              {tier === "Platinum"
                ? "Top tier"
                : `Next: ${cfg.next} at ₹${cfg.nextAt?.toLocaleString("en-IN")}`}
            </p>
          </div>
        ))}
      </div>

      {/* Points summary */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[14px] font-semibold text-text-primary">
            Points Overview
          </p>
          <span className="text-xs text-text-muted">All customers</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-[28px] font-bold text-primary">
              {totalPoints.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-text-muted">Total Points Issued</p>
          </div>
          <div className="text-center">
            <p className="text-[28px] font-bold text-success">
              ₹{Math.round(totalPoints * 0.1).toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-text-muted">Redeemable Value</p>
          </div>
          <div className="text-center">
            <p className="text-[28px] font-bold text-info">10</p>
            <p className="text-[11px] text-text-muted">Points per ₹1 spent</p>
          </div>
        </div>
      </div>

      {/* Top loyalty customers */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[#F5F5F5]">
          <Trophy size={15} className="text-[#F9A825]" />
          <p className="text-[14px] font-semibold text-text-primary">
            Top Loyalty Members
          </p>
        </div>
        <div>
          {[...CUSTOMERS]
            .sort((a, b) => b.loyaltyPoints - a.loyaltyPoints)
            .slice(0, 5)
            .map((c, i) => {
              const tier = TIER_CFG[c.tier] || TIER_CFG.Bronze;
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-3 px-5 py-3 border-b border-[#F5F5F5] last:border-b-0"
                >
                  <span className="text-[16px] font-bold text-text-muted w-6 text-center">
                    #{i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-[13px]">
                      {c.name[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-text-primary">
                      {c.name}
                    </p>
                    <p className="text-[10px] text-text-muted">
                      {c.visits} visits · ₹
                      {c.totalSpent.toLocaleString("en-IN")} spent
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-[2px] rounded-full ${tier.bg} ${tier.text}`}
                  >
                    {tier.icon} {c.tier}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star size={11} className="text-[#F9A825]" fill="#F9A825" />
                    <span className="text-[13px] font-bold text-text-primary">
                      {c.loyaltyPoints}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Challenges */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5F5F5]">
          <p className="text-[14px] font-semibold text-text-primary">
            Active Challenges
          </p>
          <button className="btn-outline text-xs py-[4px] px-3">
            + New Challenge
          </button>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {CHALLENGES.map((ch) => (
            <div
              key={ch.id}
              className={`rounded-xl border p-4 ${ch.active ? "border-[#EEEEEE] bg-white" : "border-[#EEEEEE] bg-[#FAFAFA] opacity-60"}`}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-[13px] font-semibold text-text-primary">
                  {ch.title}
                </p>
                {ch.active ? (
                  <span className="text-[9px] font-bold bg-[#E8F8F0] text-success px-2 py-[2px] rounded-full">
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-[9px] font-bold bg-[#F5F5F5] text-[#888] px-2 py-[2px] rounded-full">
                    ENDED
                  </span>
                )}
              </div>
              <p className="text-[11px] text-text-muted mb-2">{ch.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-primary bg-[#FFF5F5] px-2 py-[2px] rounded">
                  🎁 {ch.reward}
                </span>
                <span className="text-[10px] text-text-muted">
                  {ch.expires}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
