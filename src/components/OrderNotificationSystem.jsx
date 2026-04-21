import { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  CheckCircle,
  ChevronDown,
  TrendingUp,
  Clock,
  Bike,
} from "lucide-react";

// ─── Sample orders pool for simulation ───
const ORDER_POOL = [
  {
    channel: "zomato",
    orderId: "ZOM-8842",
    customerName: "Priya S.",
    items: [
      { name: "Butter Chicken", qty: 1, price: 320 },
      { name: "Garlic Naan", qty: 2, price: 60 },
    ],
    gross: 440,
    commission: 97,
    foodCost: 118,
    packaging: 15,
    deliveryEta: "28 mins",
  },
  {
    channel: "swiggy",
    orderId: "SWG-5524",
    customerName: "Rahul M.",
    items: [
      { name: "Chicken Biryani", qty: 2, price: 340 },
      { name: "Raita", qty: 2, price: 60 },
    ],
    gross: 800,
    commission: 176,
    foodCost: 248,
    packaging: 20,
    deliveryEta: "22 mins",
  },
  {
    channel: "ondc",
    orderId: "ONDC-1143",
    customerName: "Meera N.",
    items: [
      { name: "Dal Makhani", qty: 1, price: 220 },
      { name: "Tandoori Roti", qty: 3, price: 35 },
    ],
    gross: 325,
    commission: 16,
    foodCost: 92,
    packaging: 12,
    deliveryEta: "35 mins",
  },
  {
    channel: "whatsapp",
    orderId: "WA-0092",
    customerName: "Sanjay G.",
    items: [
      { name: "Paneer Tikka", qty: 2, price: 260 },
      { name: "Mango Lassi", qty: 2, price: 120 },
    ],
    gross: 760,
    commission: 0,
    foodCost: 200,
    packaging: 20,
    deliveryEta: "20 mins",
  },
  {
    channel: "zomato",
    orderId: "ZOM-8843",
    customerName: "Kavitha R.",
    items: [
      { name: "Mutton Biryani", qty: 1, price: 420 },
      { name: "Salan", qty: 1, price: 80 },
    ],
    gross: 500,
    commission: 110,
    foodCost: 188,
    packaging: 15,
    deliveryEta: "30 mins",
  },
];

const PLATFORM_CFG = {
  zomato: {
    label: "Zomato",
    color: "#E23744",
    bg: "bg-[#E23744]",
    light: "bg-[#FDE8EA]",
    text: "text-[#E23744]",
  },
  swiggy: {
    label: "Swiggy",
    color: "#FC8019",
    bg: "bg-[#FC8019]",
    light: "bg-[#FEF0E6]",
    text: "text-[#FC8019]",
  },
  ondc: {
    label: "ONDC",
    color: "#27AE60",
    bg: "bg-[#27AE60]",
    light: "bg-[#E8F8F0]",
    text: "text-success",
  },
  whatsapp: {
    label: "WhatsApp",
    color: "#25D366",
    bg: "bg-[#25D366]",
    light: "bg-[#E6F9EE]",
    text: "text-[#25D366]",
  },
};

const REJECT_REASONS = [
  "Item out of stock",
  "Kitchen too busy",
  "Restaurant closing soon",
  "Order too large",
  "Other",
];

// ─── Alarm clock / school bell — two tones alternating rapidly ───
let bellInterval = null;
let alarmCtx = null;
let alarmOsc1 = null;
let alarmOsc2 = null;
let alarmGain1 = null;
let alarmGain2 = null;
let alarmStopTimer = null;
let alarmToggle = false;

function startBell() {
  stopBell();
  try {
    alarmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const master = alarmCtx.createGain();
    master.gain.value = 0.85;
    master.connect(alarmCtx.destination);

    alarmOsc1 = alarmCtx.createOscillator();
    alarmOsc2 = alarmCtx.createOscillator();
    alarmGain1 = alarmCtx.createGain();
    alarmGain2 = alarmCtx.createGain();

    alarmOsc1.type = "square";
    alarmOsc1.frequency.value = 1000;
    alarmOsc2.type = "square";
    alarmOsc2.frequency.value = 800;

    alarmOsc1.connect(alarmGain1);
    alarmOsc2.connect(alarmGain2);
    alarmGain1.connect(master);
    alarmGain2.connect(master);

    alarmGain1.gain.value = 0.8;
    alarmGain2.gain.value = 0;

    alarmOsc1.start();
    alarmOsc2.start();

    alarmToggle = true;
    bellInterval = setInterval(() => {
      if (!alarmCtx || !alarmGain1 || !alarmGain2) return;
      alarmToggle = !alarmToggle;
      alarmGain1.gain.setValueAtTime(
        alarmToggle ? 0.8 : 0,
        alarmCtx.currentTime,
      );
      alarmGain2.gain.setValueAtTime(
        alarmToggle ? 0 : 0.8,
        alarmCtx.currentTime,
      );
    }, 80); // 80ms per tone = ~6 cycles/sec — alarm clock speed

    alarmStopTimer = setTimeout(stopBell, 10000);
  } catch (e) {}
}

function stopBell() {
  if (bellInterval) {
    clearInterval(bellInterval);
    bellInterval = null;
  }
  if (alarmStopTimer) {
    clearTimeout(alarmStopTimer);
    alarmStopTimer = null;
  }
  try {
    if (alarmOsc1) {
      alarmOsc1.stop();
      alarmOsc1 = null;
    }
    if (alarmOsc2) {
      alarmOsc2.stop();
      alarmOsc2 = null;
    }
    if (alarmCtx) {
      alarmCtx.close();
      alarmCtx = null;
    }
  } catch (e) {}
  alarmGain1 = null;
  alarmGain2 = null;
}

function playBeep() {
  startBell();
}

// ─── Single notification card ───
function OrderCard({ order, onAccept, onReject, onDismiss }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const [dismissing, setDismissing] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const mouseStartX = useRef(null);
  const isDragging = useRef(false);
  const cardRef = useRef(null);

  const cfg = PLATFORM_CFG[order.channel] || PLATFORM_CFG.zomato;

  // ── Swipe / drag to dismiss ──
  const DISMISS_THRESHOLD = 80;

  const triggerDismiss = () => {
    stopBell();
    setDismissing(true);
    setSwipeX(-420);
    setTimeout(() => onDismiss(order.orderId), 300);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (dx < 0) setSwipeX(dx);
  };
  const onTouchEnd = () => {
    if (swipeX < -DISMISS_THRESHOLD) triggerDismiss();
    else setSwipeX(0);
    touchStartX.current = null;
  };

  const onMouseDown = (e) => {
    if (e.target.closest("button") || e.target.closest("select")) return;
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - mouseStartX.current;
    if (dx < 0) setSwipeX(dx);
  };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (swipeX < -DISMISS_THRESHOLD) triggerDismiss();
    else setSwipeX(0);
    mouseStartX.current = null;
  };

  const handleCardClick = (e) => {
    if (Math.abs(swipeX) > 5) return;
    if (e.target.closest("button") || e.target.closest("select")) return;
    setCollapsed((prev) => !prev);
  };

  const netProfit =
    order.gross - order.commission - order.foodCost - order.packaging;
  const margin = Math.round((netProfit / order.gross) * 100);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          // Auto-accept at 0
          handleAccept();
          return 0;
        }
        if (prev === 10) setShaking(true);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleAccept = useCallback(() => {
    clearInterval(intervalRef.current);
    stopBell();
    setAccepted(true);
    setTimeout(() => onAccept(order.orderId), 600);
  }, [order.orderId, onAccept]);

  const handleReject = () => {
    if (!rejectReason) return;
    clearInterval(intervalRef.current);
    stopBell();
    setRejected(true);
    setTimeout(() => onReject(order.orderId), 600);
  };

  const timerColor =
    timeLeft > 20
      ? "text-success"
      : timeLeft > 10
        ? "text-warning"
        : "text-danger";
  const timerBg =
    timeLeft > 20 ? "bg-success" : timeLeft > 10 ? "bg-warning" : "bg-danger";

  if (accepted)
    return (
      <div className="w-[340px] bg-white rounded-2xl shadow-modal border border-success overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 bg-[#E8F8F0]">
          <CheckCircle size={22} className="text-success" />
          <div>
            <p className="text-[14px] font-bold text-success">
              Order Accepted!
            </p>
            <p className="text-[11px] text-text-muted">
              {cfg.label} · {order.orderId}
            </p>
          </div>
        </div>
      </div>
    );

  if (rejected)
    return (
      <div className="w-[340px] bg-white rounded-2xl shadow-modal border border-danger overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 bg-[#FDECEA]">
          <X size={22} className="text-danger" />
          <div>
            <p className="text-[14px] font-bold text-danger">Order Rejected</p>
            <p className="text-[11px] text-text-muted">{rejectReason}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div
      ref={cardRef}
      className={`w-[340px] bg-white rounded-2xl shadow-modal border-2 overflow-hidden select-none ${shaking ? "animate-bounce" : ""} ${timeLeft <= 10 ? "border-danger" : "border-[#E0E0E0]"}`}
      style={{
        transform: `translateX(${swipeX}px)`,
        transition: dismissing
          ? "transform 0.3s ease"
          : swipeX !== 0
            ? "none"
            : "transform 0.2s ease",
        opacity: dismissing ? 0 : 1,
        cursor: swipeX < -10 ? "grabbing" : "grab",
      }}
      onClick={handleCardClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Swipe hint — shows when dragging */}
      {swipeX < -20 && (
        <div className="absolute inset-0 bg-[#FDECEA] flex items-center justify-end pr-6 z-10 pointer-events-none rounded-2xl">
          <div className="flex items-center gap-2 text-danger font-bold text-[13px]">
            <X size={18} /> Dismiss
          </div>
        </div>
      )}

      {/* Platform header */}
      <div
        className={`flex items-center justify-between px-4 py-3 ${cfg.light}`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-bold px-2 py-[2px] rounded-full text-white ${cfg.bg}`}
          >
            {cfg.label}
          </span>
          <span className="text-[12px] font-semibold text-text-primary">
            {order.orderId}
          </span>
          <span className="text-[11px] text-text-muted">
            · {order.customerName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Countdown */}
          <div className="flex items-center gap-1">
            <Clock size={11} className={timerColor} />
            <span
              className={`text-[13px] font-bold tabular-nums ${timerColor}`}
            >
              {timeLeft}s
            </span>
          </div>
          {/* Collapse indicator */}
          <ChevronDown
            size={14}
            className={`text-text-muted transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
          {/* Dismiss ✕ — closes card without rejecting */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDismiss();
            }}
            className="w-5 h-5 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-[#E0E0E0] transition-colors"
            title="Dismiss (order stays active)"
          >
            <X size={11} className="text-text-muted" />
          </button>
        </div>
      </div>

      {/* Timer bar — always visible */}
      <div className="h-[3px] bg-[#F0F0F0]">
        <div
          className={`h-full ${timerBg} transition-all duration-1000`}
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        />
      </div>

      {/* Collapsible body — click header to collapse/expand */}
      {!collapsed && (
        <div>
          {/* Items */}
          <div className="px-4 py-3 border-b border-[#F5F5F5]">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-[12px] mb-1">
                <span className="text-text-primary">
                  {item.name}{" "}
                  <span className="text-text-muted">×{item.qty}</span>
                </span>
                <span className="font-semibold">
                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          {/* Margin breakdown */}
          <div className="px-4 py-2 bg-[#F8F8F8] border-b border-[#F0F0F0]">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-text-muted">Gross ₹{order.gross}</span>
              {order.commission > 0 ? (
                <span className="text-danger">-₹{order.commission} comm.</span>
              ) : (
                <span className="text-[#25D366] font-semibold">
                  0% commission ✅
                </span>
              )}
              <div className="flex items-center gap-1">
                <TrendingUp
                  size={10}
                  className={margin >= 45 ? "text-success" : "text-warning"}
                />
                <span
                  className={`font-bold ${margin >= 45 ? "text-success" : "text-warning"}`}
                >
                  ₹{netProfit} net ({margin}%)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-text-muted">
              <Bike size={10} />
              <span>Delivery partner in ~{order.deliveryEta}</span>
            </div>
          </div>

          {/* Actions */}
          {!showReject ? (
            <div className="flex gap-2 px-4 py-3">
              <button
                onClick={() => setShowReject(true)}
                className="flex-1 py-[8px] rounded-lg border border-[#E0E0E0] text-[12px] font-semibold text-text-secondary hover:border-danger hover:text-danger transition-colors flex items-center justify-center gap-1"
              >
                <X size={13} /> Reject <ChevronDown size={11} />
              </button>
              <button
                onClick={handleAccept}
                className="flex-[2] py-[8px] rounded-lg bg-success text-white text-[13px] font-bold hover:bg-[#1E8449] transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={15} /> Accept Order
              </button>
            </div>
          ) : (
            <div className="px-4 py-3 space-y-2">
              <p className="text-[11px] font-semibold text-text-muted">
                Reason for rejection:
              </p>
              <select
                className="dropdown-select w-full text-[12px]"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              >
                <option value="">Select reason...</option>
                {REJECT_REASONS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowReject(false)}
                  className="flex-1 py-[7px] rounded-lg border border-[#E0E0E0] text-[11px] font-semibold text-text-muted hover:bg-surface transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason}
                  className="flex-1 py-[7px] rounded-lg bg-danger text-white text-[11px] font-bold disabled:opacity-40 hover:bg-[#C0392B] transition-colors"
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Collapsed state */}
      {collapsed && (
        <div className="flex gap-2 px-4 py-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(false);
              handleAccept();
            }}
            className="flex-1 py-[6px] rounded-lg bg-success text-white text-[11px] font-bold flex items-center justify-center gap-1"
          >
            <CheckCircle size={12} /> Accept
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(false);
            }}
            className="flex-1 py-[6px] rounded-lg border border-[#E0E0E0] text-[11px] font-semibold text-text-muted flex items-center justify-center gap-1"
          >
            Expand
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main notification system ───
let orderCounter = 0;

export default function OrderNotificationSystem({ triggerRef }) {
  const [queue, setQueue] = useState([]);

  // Expose trigger function via ref so Header can call it
  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = () => {
        const template = ORDER_POOL[orderCounter % ORDER_POOL.length];
        orderCounter++;
        const newOrder = {
          ...template,
          orderId: `${template.orderId.split("-")[0]}-${8842 + orderCounter}`,
          _id: Date.now(),
        };
        setQueue((prev) => [...prev, newOrder]);
        playBeep();
        // Flash tab title
        let flashing = true;
        const original = document.title;
        const interval = setInterval(() => {
          document.title = flashing
            ? `🔴 NEW ORDER — ${newOrder.orderId}`
            : "Thali";
          flashing = !flashing;
        }, 600);
        setTimeout(() => {
          clearInterval(interval);
          document.title = original;
        }, 12000);
      };
    }
  }, [triggerRef]);

  const handleAccept = (orderId) => {
    setTimeout(
      () => setQueue((prev) => prev.filter((o) => o.orderId !== orderId)),
      700,
    );
  };

  const handleReject = (orderId) => {
    setTimeout(
      () => setQueue((prev) => prev.filter((o) => o.orderId !== orderId)),
      700,
    );
  };

  const handleDismiss = (orderId) => {
    // Dismiss = close the card but order is NOT rejected — it stays in Online Orders
    setQueue((prev) => prev.filter((o) => o.orderId !== orderId));
  };

  if (queue.length === 0) return null;

  // Card height is ~280px, peek offset = 60px per card
  const PEEK = 60;

  return (
    <div
      className="fixed right-6 z-[900]"
      style={{ bottom: "24px", width: "340px", height: 0 }}
    >
      {queue.map((order, idx) => {
        // idx 0 = newest/top card (fully visible at bottom)
        // idx 1 = second card, peeking PEEK px above idx 0
        // idx 2 = third card, peeking PEEK px above idx 1
        const bottomOffset = idx * PEEK;
        const zIndex = 900 - idx;
        const scale = 1 - idx * 0.025;
        const opacity = idx > 4 ? 0.3 : 1 - idx * 0.07;

        return (
          <div
            key={order._id}
            style={{
              position: "absolute",
              bottom: `${bottomOffset}px`,
              right: 0,
              zIndex,
              transform: `scale(${scale})`,
              transformOrigin: "bottom right",
              opacity,
              transition:
                "bottom 0.3s ease, transform 0.3s ease, opacity 0.3s ease",
              animation: idx === 0 ? "slideInRight 0.3s ease-out" : "none",
            }}
          >
            <OrderCard
              order={order}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          </div>
        );
      })}

      {/* "N orders waiting" badge — floats above the stack */}
      {queue.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: `${queue.length * PEEK + 8}px`,
            right: 0,
            zIndex: 910,
          }}
          className="bg-danger text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md"
        >
          {queue.length} orders waiting
        </div>
      )}
    </div>
  );
}
