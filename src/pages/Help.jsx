import { useState } from "react";
import {
  MessageSquare,
  BookOpen,
  Video,
  Zap,
  CheckCircle,
  Clock,
  ChevronRight,
  Search,
  Star,
  Send,
  X,
} from "lucide-react";

// ─── SLA config ───
const SLA_CONFIG = {
  billing: { label: "Billing Issues", sla: "< 30 min", color: "text-danger" },
  general: { label: "General Issues", sla: "< 4 hours", color: "text-warning" },
  feature: { label: "Feature Requests", sla: "< 24 hours", color: "text-info" },
};

// ─── FAQ data ───
const FAQS = [
  {
    q: "How do I add a new menu item?",
    a: "Go to Menu Management → Items & Categories → click 'Add Item'. Fill in the name, price, category, and platform availability. Changes sync to all platforms in one click.",
    category: "Menu",
  },
  {
    q: "Why is my Zomato order not appearing?",
    a: "Check your internet connection first. Then go to Settings → Integrations → Zomato and verify the connection status. If it shows 'Connected', try toggling Busy Mode off. If the issue persists, contact support.",
    category: "Orders",
  },
  {
    q: "How do I process a refund?",
    a: "Go to Payments → Transactions, find the transaction, click 'Refund', select the reason, and confirm. Refunds are processed within 3-5 business days to the customer's original payment method.",
    category: "Payments",
  },
  {
    q: "How do I set up the WhatsApp briefing?",
    a: "Go to Settings → Integrations → WhatsApp Business and connect your WhatsApp Business API account. Once connected, the daily briefing is automatically sent at 8:00 AM every morning.",
    category: "AI",
  },
  {
    q: "Can I use Thali offline?",
    a: "Yes! Thali is offline-first. Billing, KOT, and payments all work without internet. Orders are queued and synced automatically when connectivity is restored. The sync status is always visible in the top header.",
    category: "General",
  },
  {
    q: "How do I migrate from PetPooja?",
    a: "Go to Settings → Integrations → PetPooja Migration. The tool imports your menu, customer database, sales history (last 12 months), supplier list, and recipes. A dedicated onboarding specialist will assist you for the first 30 days.",
    category: "General",
  },
  {
    q: "How are loyalty points calculated?",
    a: "Customers earn 10 points per ₹1 spent. Points can be redeemed at ₹1 per 10 points. Tier upgrades happen automatically: Bronze (0-₹8k), Silver (₹8k-₹25k), Gold (₹25k-₹50k), Platinum (₹50k+).",
    category: "CRM",
  },
  {
    q: "How do I raise a dispute with Zomato?",
    a: "Go to Reports → Aggregator Reconciliation. Find the discrepancy, click 'Raise Dispute'. Thali auto-generates the dispute with order details and sends it to the platform. Expected resolution: 3-5 business days.",
    category: "Payments",
  },
];

// ─── Video tutorials ───
const TUTORIALS = [
  {
    title: "Getting Started with Thali",
    duration: "4:32",
    category: "Basics",
    views: "2.4k",
    thumb: "🚀",
  },
  {
    title: "Setting Up Your Menu",
    duration: "6:18",
    category: "Menu",
    views: "1.8k",
    thumb: "🍽️",
  },
  {
    title: "Processing Your First Order",
    duration: "3:45",
    category: "Billing",
    views: "3.1k",
    thumb: "🧾",
  },
  {
    title: "Connecting Zomato & Swiggy",
    duration: "5:22",
    category: "Online",
    views: "2.9k",
    thumb: "📱",
  },
  {
    title: "Understanding AI Briefings",
    duration: "4:10",
    category: "AI",
    views: "1.6k",
    thumb: "🤖",
  },
  {
    title: "Inventory & Recipe Costing",
    duration: "7:44",
    category: "Inventory",
    views: "1.2k",
    thumb: "📦",
  },
];

// ─── What's new ───
const WHATS_NEW = [
  {
    version: "v2.4.1",
    date: "17 Apr 2026",
    items: [
      "Delivery partner ETA now shown on KDS tickets",
      "Waste prediction AI improved — 15% more accurate",
      "Fixed: Swiggy order sync delay on peak hours",
    ],
  },
  {
    version: "v2.4.0",
    date: "10 Apr 2026",
    items: [
      "New: Menu Scheduling — auto-switch menus by time",
      "New: Fraud Detection alerts in Thali Intelligence",
      "Improved: Quick Bill now shows loyalty points earned",
    ],
  },
  {
    version: "v2.3.5",
    date: "3 Apr 2026",
    items: [
      "New: Aggregator Reconciliation auto-dispute filing",
      "New: Staff performance leaderboard with badges",
      "Fixed: Calendar view reservation overlap issue",
    ],
  },
];

// ─── Live chat widget ───
function LiveChat({ onClose }) {
  const [messages, setMessages] = useState([
    {
      from: "support",
      text: "Hi! I'm Priya from Thali Support. How can I help you today? 😊",
      time: "now",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: input, time: "now" },
    ]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "support",
          text: "Thanks for reaching out! Let me check that for you. One moment please... ⏳",
          time: "now",
        },
      ]);
    }, 1200);
  };

  return (
    <div
      className="fixed bottom-6 right-6 w-[340px] bg-white rounded-2xl shadow-modal border border-[#E0E0E0] z-[500] flex flex-col overflow-hidden"
      style={{ height: "440px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <MessageSquare size={15} color="white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-[13px]">Thali Support</p>
          <p className="text-white/70 text-[10px]">
            Avg response: 18 min · SLA: 30 min
          </p>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#F5F5F5]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-3 py-2 text-[12px] leading-relaxed ${m.from === "user" ? "bg-primary text-white rounded-br-sm" : "bg-white text-text-primary rounded-bl-sm shadow-sm"}`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-[#EEEEEE] bg-white">
        <input
          className="flex-1 text-[12px] border border-[#E0E0E0] rounded-lg px-3 py-2 outline-none focus:border-primary"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
        >
          <Send size={13} color="white" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Help page ───
const TABS = [
  { id: "support", label: "Get Support" },
  { id: "faq", label: "FAQ" },
  { id: "tutorials", label: "Video Tutorials" },
  { id: "updates", label: "What's New" },
];

export default function Help() {
  const [activeTab, setActiveTab] = useState("support");
  const [showChat, setShowChat] = useState(false);
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [faqCategory, setFaqCategory] = useState("All");

  const faqCategories = ["All", ...new Set(FAQS.map((f) => f.category))];
  const filteredFaqs = FAQS.filter((f) => {
    const matchSearch =
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase());
    const matchCat = faqCategory === "All" || f.category === faqCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] font-semibold text-text-primary">
            Help & Support
          </h1>
          <p className="text-[13px] text-text-muted mt-[2px]">
            Support as a product — not an afterthought
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#E8F8F0] border border-success/20 rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-[11px] font-semibold text-success">
              Support Online
            </span>
          </div>
        </div>
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
        {/* ── Get Support ── */}
        {activeTab === "support" && (
          <div className="space-y-4">
            {/* SLA banner */}
            <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
              <p className="text-[14px] font-semibold text-text-primary mb-1">
                Your Support SLA
              </p>
              <p className="text-[11px] text-text-muted mb-4">
                Pro Plan — contractual response times. Missed SLA = automatic
                credit on your next bill.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(SLA_CONFIG).map((s) => (
                  <div
                    key={s.label}
                    className="bg-surface rounded-xl p-4 text-center"
                  >
                    <p className={`text-[20px] font-bold ${s.color}`}>
                      {s.sla}
                    </p>
                    <p className="text-[11px] text-text-muted mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between bg-[#E8F8F0] rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-success" />
                  <p className="text-[12px] font-semibold text-success">
                    Your avg response time this month: 18 minutes
                  </p>
                </div>
                <span className="text-[10px] text-success font-semibold">
                  Well within SLA ✅
                </span>
              </div>
            </div>

            {/* Contact channels */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: MessageSquare,
                  label: "Live Chat",
                  desc: "Fastest — avg 18 min",
                  action: "Start Chat",
                  color: "text-primary",
                  onClick: () => setShowChat(true),
                },
                {
                  icon: MessageSquare,
                  label: "WhatsApp",
                  desc: "Reply in < 30 min",
                  action: "Open WhatsApp",
                  color: "text-[#25D366]",
                  onClick: () => {},
                },
                {
                  icon: Clock,
                  label: "Schedule Call",
                  desc: "Book a 30-min call",
                  action: "Book Slot",
                  color: "text-info",
                  onClick: () => {},
                },
              ].map((ch) => {
                const Icon = ch.icon;
                return (
                  <div
                    key={ch.label}
                    className="bg-white rounded-xl border border-[#EEEEEE] p-5 text-center"
                  >
                    <Icon size={24} className={`${ch.color} mx-auto mb-2`} />
                    <p className="text-[13px] font-semibold text-text-primary">
                      {ch.label}
                    </p>
                    <p className="text-[11px] text-text-muted mt-1 mb-3">
                      {ch.desc}
                    </p>
                    <button
                      onClick={ch.onClick}
                      className="btn-primary w-full justify-center text-xs py-[7px]"
                    >
                      {ch.action}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* System status */}
            <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#F5F5F5]">
                <p className="text-[14px] font-semibold text-text-primary">
                  System Status
                </p>
              </div>
              <div className="divide-y divide-[#F5F5F5]">
                {[
                  { service: "Billing Engine", status: "operational" },
                  { service: "Zomato Integration", status: "operational" },
                  { service: "Swiggy Integration", status: "operational" },
                  { service: "WhatsApp Briefings", status: "operational" },
                  { service: "AI Intelligence", status: "operational" },
                  { service: "Payment Processing", status: "operational" },
                ].map((s) => (
                  <div
                    key={s.service}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <span className="text-[13px] text-text-primary">
                      {s.service}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-success">
                      <div className="w-2 h-2 rounded-full bg-success" />{" "}
                      Operational
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FAQ ── */}
        {activeTab === "faq" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-[320px]">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                />
                <input
                  className="form-input pl-9 text-[13px] w-full"
                  placeholder="Search FAQs..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-[4px]">
                {faqCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFaqCategory(cat)}
                    className={`text-[11px] font-semibold px-3 py-[5px] rounded-lg border transition-all ${faqCategory === cat ? "bg-primary text-white border-primary" : "bg-white text-text-muted border-[#E0E0E0]"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredFaqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#FAFAFA] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold bg-[#EBF5FB] text-info px-2 py-[2px] rounded-full">
                      {faq.category}
                    </span>
                    <p className="text-[13px] font-medium text-text-primary">
                      {faq.q}
                    </p>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`text-text-muted transition-transform flex-shrink-0 ${openFaq === i ? "rotate-90" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 border-t border-[#F5F5F5]">
                    <p className="text-[12px] text-text-secondary leading-relaxed pt-3">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Video Tutorials ── */}
        {activeTab === "tutorials" && (
          <div className="grid grid-cols-3 gap-3">
            {TUTORIALS.map((t) => (
              <div
                key={t.title}
                className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden hover:shadow-md transition-all cursor-pointer"
              >
                <div className="h-[100px] bg-[#1A1A1A] flex items-center justify-center">
                  <span className="text-5xl">{t.thumb}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold bg-[#EBF5FB] text-info px-2 py-[2px] rounded-full">
                      {t.category}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {t.duration}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-text-primary mb-1">
                    {t.title}
                  </p>
                  <p className="text-[10px] text-text-muted">{t.views} views</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── What's New ── */}
        {activeTab === "updates" && (
          <div className="space-y-4">
            {WHATS_NEW.map((release) => (
              <div
                key={release.version}
                className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden"
              >
                <div className="flex items-center gap-3 px-5 py-3 border-b border-[#F5F5F5] bg-[#FAFAFA]">
                  <span className="text-[12px] font-bold bg-primary text-white px-2 py-[2px] rounded-full">
                    {release.version}
                  </span>
                  <span className="text-[11px] text-text-muted">
                    {release.date}
                  </span>
                </div>
                <div className="px-5 py-3 space-y-2">
                  {release.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-[12px] text-text-secondary"
                    >
                      <span className="text-success mt-[1px] flex-shrink-0">
                        {item.startsWith("New:")
                          ? "✨"
                          : item.startsWith("Fixed:")
                            ? "🐛"
                            : "⚡"}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live chat widget */}
      {showChat && <LiveChat onClose={() => setShowChat(false)} />}
    </div>
  );
}
