import { useState } from "react";
import {
  Star,
  AlertTriangle,
  ExternalLink,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const FEEDBACK = [
  {
    id: 1,
    customer: "Ananya K.",
    rating: 5,
    comment: "Amazing food and service! The Butter Chicken was perfect.",
    date: "17 Apr",
    channel: "QR Bill",
    responded: false,
    platform: null,
  },
  {
    id: 2,
    customer: "Vikram S.",
    rating: 2,
    comment: "Waited 45 minutes for food. Staff was not attentive.",
    date: "17 Apr",
    channel: "Zomato",
    responded: false,
    platform: "zomato",
  },
  {
    id: 3,
    customer: "Priya S.",
    rating: 4,
    comment: "Great ambience and food. Slightly slow service on a busy night.",
    date: "16 Apr",
    channel: "QR Bill",
    responded: true,
    platform: null,
  },
  {
    id: 4,
    customer: "Sanjay G.",
    rating: 5,
    comment: "Best biryani in Koramangala! Will definitely come back.",
    date: "16 Apr",
    channel: "QR Bill",
    responded: false,
    platform: null,
  },
  {
    id: 5,
    customer: "Meera N.",
    rating: 3,
    comment: "Food was good but the Dal Makhani was too salty today.",
    date: "15 Apr",
    channel: "Swiggy",
    responded: true,
    platform: "swiggy",
  },
  {
    id: 6,
    customer: "Rahul M.",
    rating: 1,
    comment: "Order was wrong and took forever. Very disappointed.",
    date: "15 Apr",
    channel: "Zomato",
    responded: false,
    platform: "zomato",
  },
  {
    id: 7,
    customer: "Kavitha R.",
    rating: 4,
    comment: "Loved the Paneer Tikka. Delivery was on time.",
    date: "14 Apr",
    channel: "ONDC",
    responded: true,
    platform: "ondc",
  },
  {
    id: 8,
    customer: "Arjun P.",
    rating: 5,
    comment:
      "Excellent experience as always. The staff remembered my preferences!",
    date: "14 Apr",
    channel: "QR Bill",
    responded: false,
    platform: null,
  },
];

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? "text-[#F9A825]" : "text-[#E0E0E0]"}
          fill={i <= rating ? "#F9A825" : "#E0E0E0"}
        />
      ))}
    </div>
  );
}

export default function CustomersFeedback() {
  const [filter, setFilter] = useState("all");
  const [feedback, setFeedback] = useState(FEEDBACK);

  const avgRating = (
    feedback.reduce((s, f) => s + f.rating, 0) / feedback.length
  ).toFixed(1);
  const negative = feedback.filter((f) => f.rating <= 2);
  const positive = feedback.filter((f) => f.rating >= 4);

  const filtered =
    filter === "all"
      ? feedback
      : filter === "negative"
        ? feedback.filter((f) => f.rating <= 2)
        : filter === "positive"
          ? feedback.filter((f) => f.rating >= 4)
          : feedback.filter((f) => f.channel.toLowerCase() === filter);

  const markResponded = (id) =>
    setFeedback((prev) =>
      prev.map((f) => (f.id === id ? { ...f, responded: true } : f)),
    );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-3 flex-shrink-0">
        {[
          {
            label: "Avg Rating",
            value: `⭐ ${avgRating}`,
            color: "text-[#F9A825]",
          },
          {
            label: "Total Reviews",
            value: feedback.length,
            color: "text-text-primary",
          },
          {
            label: "Positive (4-5)",
            value: positive.length,
            color: "text-success",
          },
          {
            label: "Negative (1-2)",
            value: negative.length,
            color: "text-danger",
          },
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

      {/* Negative alert */}
      {negative.filter((f) => !f.responded).length > 0 && (
        <div className="flex items-center gap-3 bg-[#FDECEA] border border-danger/20 rounded-xl px-4 py-3 mb-3 flex-shrink-0">
          <AlertTriangle size={15} className="text-danger flex-shrink-0" />
          <p className="text-[12px] text-danger font-medium flex-1">
            {negative.filter((f) => !f.responded).length} negative review
            {negative.filter((f) => !f.responded).length > 1 ? "s" : ""} need
            your response
          </p>
          <button
            onClick={() => setFilter("negative")}
            className="text-[11px] font-semibold text-danger border border-danger rounded px-2 py-[3px] hover:bg-[#FDECEA] transition-colors"
          >
            View All
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-[4px] mb-3 flex-shrink-0">
        {[
          { id: "all", label: "All" },
          { id: "negative", label: "⚠️ Negative" },
          { id: "positive", label: "✅ Positive" },
          { id: "QR Bill", label: "QR Bill" },
          { id: "Zomato", label: "Zomato" },
          { id: "Swiggy", label: "Swiggy" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-[11px] font-semibold px-3 py-[5px] rounded-lg border transition-all ${filter === f.id ? "bg-primary text-white border-primary" : "bg-white text-text-muted border-[#E0E0E0] hover:border-[#CCC]"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feedback list */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filtered.map((f) => (
          <div
            key={f.id}
            className={`bg-white rounded-xl border p-4 ${f.rating <= 2 ? "border-danger/30" : "border-[#EEEEEE]"}`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-[12px]">
                    {f.customer[0]}
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">
                    {f.customer}
                  </p>
                  <div className="flex items-center gap-2 mt-[1px]">
                    <StarRow rating={f.rating} />
                    <span className="text-[10px] text-text-muted">
                      {f.date} · {f.channel}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {f.responded ? (
                  <span className="text-[10px] font-semibold text-success bg-[#E8F8F0] px-2 py-[2px] rounded-full">
                    Responded ✅
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-warning bg-[#FEF3E8] px-2 py-[2px] rounded-full">
                    Pending
                  </span>
                )}
              </div>
            </div>

            <p className="text-[12px] text-text-secondary leading-relaxed mb-3">
              "{f.comment}"
            </p>

            <div className="flex items-center gap-2">
              {!f.responded && (
                <button
                  onClick={() => markResponded(f.id)}
                  className="btn-primary text-xs py-[5px] px-3"
                >
                  <MessageSquare size={11} /> Respond
                </button>
              )}
              {f.rating >= 4 && !f.responded && (
                <button className="btn-outline text-xs py-[5px] px-3">
                  <ExternalLink size={11} /> Nudge Google Review
                </button>
              )}
              {f.platform && (
                <span
                  className={`text-[10px] font-bold px-2 py-[2px] rounded-full ml-auto ${
                    f.platform === "zomato"
                      ? "bg-[#FDE8EA] text-[#E23744]"
                      : f.platform === "swiggy"
                        ? "bg-[#FEF0E6] text-[#FC8019]"
                        : "bg-[#E8F8F0] text-success"
                  }`}
                >
                  {f.platform.charAt(0).toUpperCase() + f.platform.slice(1)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
