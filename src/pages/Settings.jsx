import { useState } from "react";
import {
  Store,
  MapPin,
  Receipt,
  Printer,
  CreditCard,
  Globe,
  Bell,
  Shield,
  Package,
  FileText,
  CheckCircle,
  ChevronRight,
  Save,
  Palette,
} from "lucide-react";
import { RESTAURANT } from "../data/mockData";
import { useTheme, THEMES } from "../context/ThemeContext";

// ─── Section nav items ───
const SECTIONS = [
  { id: "theme", label: "Appearance & Theme", icon: Palette },
  { id: "profile", label: "Restaurant Profile", icon: Store },
  { id: "tax", label: "Tax & Billing", icon: Receipt },
  { id: "printers", label: "Printers & Devices", icon: Printer },
  { id: "payments", label: "Payment Gateways", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Data & Privacy", icon: Shield },
  { id: "subscription", label: "Subscription & Billing", icon: Package },
];

// ─── Reusable form row ───
function FormRow({ label, hint, children }) {
  return (
    <div className="flex items-start gap-6 py-4 border-b border-[#F5F5F5] last:border-b-0">
      <div className="w-[200px] flex-shrink-0">
        <p className="text-[13px] font-medium text-text-primary">{label}</p>
        {hint && <p className="text-[11px] text-text-muted mt-[2px]">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

// ─── Toggle row ───
function ToggleRow({ label, hint, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#F5F5F5] last:border-b-0">
      <div>
        <p className="text-[13px] font-medium text-text-primary">{label}</p>
        {hint && <p className="text-[11px] text-text-muted mt-[1px]">{hint}</p>}
      </div>
      <button
        onClick={onChange}
        className={`w-9 h-5 rounded-full transition-colors flex-shrink-0 ${value ? "bg-primary" : "bg-[#CCC]"}`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow transition-all mt-[2px] ${value ? "ml-[18px]" : "ml-[2px]"}`}
        />
      </button>
    </div>
  );
}

// ─── Save button ───
function SaveBar({ onSave, saved }) {
  return (
    <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#EEEEEE]">
      {saved ? (
        <span className="flex items-center gap-2 text-[12px] text-success font-semibold">
          <CheckCircle size={14} /> Changes saved
        </span>
      ) : (
        <span className="text-[12px] text-text-muted">Unsaved changes</span>
      )}
      <button onClick={onSave} className="btn-primary text-xs py-[7px] px-4">
        <Save size={13} /> Save Changes
      </button>
    </div>
  );
}

// ─── Section: Restaurant Profile ───
function ProfileSection() {
  const [form, setForm] = useState({ ...RESTAURANT });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setSaved(false);
  };

  return (
    <div>
      <FormRow label="Restaurant Name" hint="Shown on bills and online menus">
        <input
          className="form-input"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </FormRow>
      <FormRow label="Branch Name" hint="e.g. Koramangala, Indiranagar">
        <input
          className="form-input"
          value={form.branch}
          onChange={(e) => set("branch", e.target.value)}
        />
      </FormRow>
      <FormRow label="Owner Name">
        <input
          className="form-input"
          value={form.owner}
          onChange={(e) => set("owner", e.target.value)}
        />
      </FormRow>
      <FormRow label="Phone Number">
        <input
          className="form-input"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
      </FormRow>
      <FormRow label="GSTIN" hint="15-digit GST Identification Number">
        <input
          className="form-input font-mono"
          value={form.gstin}
          onChange={(e) => set("gstin", e.target.value)}
        />
      </FormRow>
      <FormRow label="Address">
        <textarea
          className="form-input resize-none"
          rows={2}
          value={form.address}
          onChange={(e) => set("address", e.target.value)}
        />
      </FormRow>
      <FormRow label="Operating Hours">
        <div className="flex items-center gap-3">
          <input className="form-input w-[100px]" defaultValue="11:00 AM" />
          <span className="text-text-muted text-sm">to</span>
          <input className="form-input w-[100px]" defaultValue="11:00 PM" />
        </div>
      </FormRow>
      <FormRow label="Cuisine Type">
        <select className="dropdown-select w-full max-w-[240px]">
          <option>North Indian</option>
          <option>South Indian</option>
          <option>Chinese</option>
          <option>Multi-cuisine</option>
          <option>Fast Food / QSR</option>
        </select>
      </FormRow>
      <SaveBar onSave={() => setSaved(true)} saved={saved} />
    </div>
  );
}

// ─── Section: Tax & Billing ───
function TaxSection() {
  const [saved, setSaved] = useState(false);
  const [billPrefix, setBillPrefix] = useState("SG");
  const [billStart, setBillStart] = useState("1001");
  const [gstReg, setGstReg] = useState(true);

  return (
    <div>
      <FormRow
        label="GST Registration"
        hint="Toggle if your restaurant is GST registered"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setGstReg(!gstReg);
              setSaved(false);
            }}
            className={`w-9 h-5 rounded-full transition-colors ${gstReg ? "bg-primary" : "bg-[#CCC]"}`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow transition-all mt-[2px] ${gstReg ? "ml-[18px]" : "ml-[2px]"}`}
            />
          </button>
          <span className="text-[12px] text-text-muted">
            {gstReg ? "GST Registered" : "Not Registered"}
          </span>
        </div>
      </FormRow>
      <FormRow
        label="Default GST Rate"
        hint="Applied to items without a specific rate"
      >
        <select className="dropdown-select w-[120px]">
          <option>5%</option>
          <option>12%</option>
          <option>18%</option>
        </select>
      </FormRow>
      <FormRow label="Bill Number Prefix" hint="e.g. SG → SG-1001, SG-1002...">
        <input
          className="form-input w-[120px] font-mono"
          value={billPrefix}
          onChange={(e) => {
            setBillPrefix(e.target.value);
            setSaved(false);
          }}
        />
      </FormRow>
      <FormRow label="Bill Number Start">
        <input
          type="number"
          className="form-input w-[120px]"
          value={billStart}
          onChange={(e) => {
            setBillStart(e.target.value);
            setSaved(false);
          }}
        />
      </FormRow>
      <FormRow label="Invoice Template">
        <select className="dropdown-select w-[200px]">
          <option>Standard (with logo)</option>
          <option>Compact (thermal)</option>
          <option>Detailed (with itemised GST)</option>
        </select>
      </FormRow>
      <FormRow label="Service Charge" hint="Optional service charge on bills">
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="form-input w-[80px]"
            defaultValue="0"
          />
          <span className="text-text-muted text-sm">%</span>
          <span className="text-[11px] text-text-muted">(0 = disabled)</span>
        </div>
      </FormRow>
      <SaveBar onSave={() => setSaved(true)} saved={saved} />
    </div>
  );
}

// ─── Section: Printers & Devices ───
function PrintersSection() {
  const PRINTERS = [
    {
      id: 1,
      name: "Billing Counter",
      type: "Thermal 80mm",
      ip: "192.168.1.101",
      status: "online",
      assigned: "Billing",
    },
    {
      id: 2,
      name: "Kitchen Station",
      type: "Thermal 80mm",
      ip: "192.168.1.102",
      status: "online",
      assigned: "KOT",
    },
    {
      id: 3,
      name: "Bar Printer",
      type: "Thermal 58mm",
      ip: "192.168.1.103",
      status: "offline",
      assigned: "KOT",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[13px] text-text-muted">
          Printers discovered on your local network
        </p>
        <button className="btn-outline text-xs py-[5px] px-3">
          Scan Network
        </button>
      </div>
      {PRINTERS.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-4 bg-white rounded-xl border border-[#EEEEEE] px-5 py-4"
        >
          <Printer
            size={20}
            className={p.status === "online" ? "text-success" : "text-danger"}
          />
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-text-primary">
              {p.name}
            </p>
            <p className="text-[11px] text-text-muted">
              {p.type} · {p.ip}
            </p>
          </div>
          <select className="dropdown-select text-xs">
            <option>Billing</option>
            <option>KOT</option>
            <option>Label</option>
          </select>
          <span
            className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${p.status === "online" ? "bg-[#E8F8F0] text-success" : "bg-[#FDECEA] text-danger"}`}
          >
            {p.status === "online" ? "✅ Online" : "❌ Offline"}
          </span>
          <button className="btn-ghost text-xs py-[4px] px-3">
            Test Print
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Section: Payment Gateways ───
function PaymentsSection() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <FormRow
        label="Payment Partner"
        hint="Primary payment gateway for UPI and cards"
      >
        <select className="dropdown-select w-[200px]">
          <option>Razorpay</option>
          <option>Cashfree</option>
          <option>PayU</option>
        </select>
      </FormRow>
      <FormRow label="Merchant ID" hint="From your Razorpay dashboard">
        <input
          className="form-input font-mono"
          defaultValue="rzp_live_XXXXXXXXXX"
        />
      </FormRow>
      <FormRow label="Bank Account" hint="Settlements will be credited here">
        <div className="space-y-2">
          <input
            className="form-input"
            placeholder="Account holder name"
            defaultValue="Rajesh Kumar"
          />
          <input
            className="form-input font-mono"
            placeholder="Account number"
            defaultValue="XXXX XXXX 4321"
          />
          <input
            className="form-input"
            placeholder="IFSC Code"
            defaultValue="HDFC0001234"
          />
        </div>
      </FormRow>
      <FormRow label="UPI ID" hint="For BharatQR display at counter">
        <input className="form-input" defaultValue="spicegarden@razorpay" />
      </FormRow>
      <FormRow label="Settlement Cycle">
        <select className="dropdown-select w-[200px]">
          <option>T+1 (Next day)</option>
          <option>T+2</option>
          <option>Weekly</option>
        </select>
      </FormRow>
      <SaveBar onSave={() => setSaved(true)} saved={saved} />
    </div>
  );
}

// ─── Section: Integrations ───
function IntegrationsSection() {
  const INTEGRATIONS = [
    {
      name: "Zomato",
      icon: "🔴",
      connected: true,
      desc: "Orders, menu sync, ratings",
    },
    {
      name: "Swiggy",
      icon: "🟠",
      connected: true,
      desc: "Orders, menu sync, busy mode",
    },
    {
      name: "ONDC",
      icon: "🟢",
      connected: false,
      desc: "List once, appear everywhere",
    },
    {
      name: "WhatsApp Business",
      icon: "💬",
      connected: true,
      desc: "Briefings, campaigns, orders",
    },
    {
      name: "Tally",
      icon: "📊",
      connected: false,
      desc: "Auto-sync P&L and GST data",
    },
    {
      name: "Zoho Books",
      icon: "📒",
      connected: false,
      desc: "Cloud accounting integration",
    },
  ];

  return (
    <div className="space-y-3">
      {INTEGRATIONS.map((intg) => (
        <div
          key={intg.name}
          className="flex items-center gap-4 bg-white rounded-xl border border-[#EEEEEE] px-5 py-4"
        >
          <span className="text-2xl">{intg.icon}</span>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-text-primary">
              {intg.name}
            </p>
            <p className="text-[11px] text-text-muted">{intg.desc}</p>
          </div>
          {intg.connected ? (
            <span className="text-[10px] font-semibold bg-[#E8F8F0] text-success px-2 py-[2px] rounded-full">
              ✅ Connected
            </span>
          ) : (
            <button className="btn-outline text-xs py-[5px] px-3">
              Connect
            </button>
          )}
          {intg.connected && (
            <button className="btn-ghost text-xs py-[4px] px-2">
              Configure
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Section: Notifications ───
function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    lowStock: true,
    newOrder: true,
    negReview: true,
    dailyBriefing: true,
    staffAlert: true,
    paymentFail: true,
    fraudAlert: true,
    weeklyReport: false,
  });
  const [saved, setSaved] = useState(false);
  const toggle = (k) => {
    setPrefs((p) => ({ ...p, [k]: !p[k] }));
    setSaved(false);
  };

  const NOTIFS = [
    {
      key: "dailyBriefing",
      label: "Daily Morning Briefing",
      hint: "WhatsApp at 8:00 AM every day",
    },
    {
      key: "lowStock",
      label: "Low Stock Alerts",
      hint: "When any item falls below minimum level",
    },
    {
      key: "newOrder",
      label: "New Online Orders",
      hint: "Zomato, Swiggy, ONDC, WhatsApp",
    },
    {
      key: "negReview",
      label: "Negative Review Alert",
      hint: "1-2 star reviews on any platform",
    },
    {
      key: "fraudAlert",
      label: "Fraud Detection Alerts",
      hint: "Unusual KOT cancellations or discounts",
    },
    {
      key: "staffAlert",
      label: "Staff Anomaly Alerts",
      hint: "Cash discrepancies, unusual patterns",
    },
    {
      key: "paymentFail",
      label: "Payment Failure Alerts",
      hint: "Failed UPI or card transactions",
    },
    {
      key: "weeklyReport",
      label: "Weekly Performance Report",
      hint: "Every Monday at 9:00 AM",
    },
  ];

  return (
    <div>
      {NOTIFS.map((n) => (
        <ToggleRow
          key={n.key}
          label={n.label}
          hint={n.hint}
          value={prefs[n.key]}
          onChange={() => toggle(n.key)}
        />
      ))}
      <SaveBar onSave={() => setSaved(true)} saved={saved} />
    </div>
  );
}

// ─── Section: Data & Privacy ───
function PrivacySection() {
  return (
    <div className="space-y-4">
      <div className="bg-[#EBF5FB] border border-info/20 rounded-xl px-4 py-3">
        <p className="text-[13px] font-semibold text-info mb-1">
          DPDP Act Compliance
        </p>
        <p className="text-[11px] text-text-muted">
          Thali is compliant with India's Digital Personal Data Protection Act.
          Customer data is stored in AWS Mumbai and never shared with third
          parties without consent.
        </p>
      </div>
      {[
        {
          label: "Export Customer Data",
          desc: "Download all customer profiles and order history as CSV",
          btn: "Export",
          btnClass: "btn-outline",
        },
        {
          label: "Delete Customer Data",
          desc: "Permanently delete a customer's data on their request",
          btn: "Request",
          btnClass: "btn-outline",
        },
        {
          label: "Consent Management",
          desc: "View and manage customer marketing opt-ins",
          btn: "Manage",
          btnClass: "btn-outline",
        },
        {
          label: "Data Retention Policy",
          desc: "Transaction data retained for 7 years (GST requirement)",
          btn: "View",
          btnClass: "btn-ghost",
        },
        {
          label: "Audit Logs",
          desc: "Every action logged with user, timestamp, and device",
          btn: "View Logs",
          btnClass: "btn-ghost",
        },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between bg-white rounded-xl border border-[#EEEEEE] px-5 py-4"
        >
          <div>
            <p className="text-[13px] font-semibold text-text-primary">
              {item.label}
            </p>
            <p className="text-[11px] text-text-muted mt-[2px]">{item.desc}</p>
          </div>
          <button
            className={`${item.btnClass} text-xs py-[5px] px-3 flex-shrink-0`}
          >
            {item.btn}
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Section: Subscription ───
function SubscriptionSection() {
  return (
    <div className="space-y-4">
      {/* Current plan */}
      <div
        className="rounded-xl p-5 text-white"
        style={{ background: "linear-gradient(135deg, #CC3333, #A93226)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/70 text-[11px] mb-1">Current Plan</p>
            <p className="text-[22px] font-bold">Pro Plan</p>
            <p className="text-white/80 text-[13px] mt-1">
              ₹2,499/month · Renews 17 May 2026
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-[3px] rounded-full">
              Active
            </span>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button className="bg-white text-primary text-xs font-bold py-[7px] px-4 rounded-lg hover:bg-white/90 transition-colors">
            Upgrade to Chain
          </button>
          <button className="bg-white/20 text-white text-xs font-semibold py-[7px] px-4 rounded-lg hover:bg-white/30 transition-colors">
            View Invoice
          </button>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
        <p className="text-[14px] font-semibold text-text-primary mb-3">
          Plan Usage
        </p>
        <div className="space-y-3">
          {[
            { label: "Outlets", used: 1, limit: 1, unit: "" },
            { label: "Cloud Kitchen Brands", used: 4, limit: 5, unit: "" },
            { label: "Staff Accounts", used: 8, limit: 15, unit: "" },
            {
              label: "WhatsApp Messages",
              used: 1247,
              limit: 5000,
              unit: "/mo",
            },
          ].map((u) => {
            const pct = Math.round((u.used / u.limit) * 100);
            return (
              <div key={u.label}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-text-secondary">{u.label}</span>
                  <span className="font-semibold text-text-primary">
                    {u.used}/{u.limit}
                    {u.unit}
                  </span>
                </div>
                <div className="h-[6px] bg-[#F0F0F0] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pct > 80 ? "bg-warning" : "bg-success"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing history */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#F5F5F5]">
          <p className="text-[14px] font-semibold text-text-primary">
            Billing History
          </p>
        </div>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                date: "17 Apr 2026",
                plan: "Pro Plan",
                amount: 2499,
                status: "paid",
              },
              {
                date: "17 Mar 2026",
                plan: "Pro Plan",
                amount: 2499,
                status: "paid",
              },
              {
                date: "17 Feb 2026",
                plan: "Pro Plan",
                amount: 2499,
                status: "paid",
              },
            ].map((inv, i) => (
              <tr key={i} className="hover:bg-[#FAFAFA]">
                <td className="text-xs text-text-muted">{inv.date}</td>
                <td className="font-medium">{inv.plan}</td>
                <td className="font-semibold">
                  ₹{inv.amount.toLocaleString("en-IN")}
                </td>
                <td>
                  <span className="status-pill green text-[10px]">✅ Paid</span>
                </td>
                <td>
                  <button className="btn-ghost text-xs py-[3px] px-2">
                    <FileText size={11} /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Theme Section ───
function ThemeSection() {
  const { themeId, setThemeId, themes } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[13px] text-text-muted mb-4">
          Choose a theme for your Thali dashboard. Changes apply instantly and
          are saved automatically.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {Object.values(themes).map((theme) => {
            const isActive = themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setThemeId(theme.id)}
                className={[
                  "relative text-left rounded-2xl border-2 p-4 transition-all hover:shadow-lg",
                  isActive
                    ? "border-[var(--primary)] shadow-md"
                    : "border-[#E0E0E0] hover:border-[#CCCCCC]",
                ].join(" ")}
              >
                {/* Active checkmark */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    <CheckCircle size={14} color="white" />
                  </div>
                )}

                {/* Color swatches preview */}
                <div className="flex gap-2 mb-3">
                  {theme.preview.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-lg shadow-sm border border-black/5"
                      style={{ background: color }}
                    />
                  ))}
                </div>

                {/* Mini UI preview */}
                <div
                  className="rounded-lg overflow-hidden border border-black/5 mb-3"
                  style={{ height: "72px" }}
                >
                  {/* Sidebar strip */}
                  <div className="flex h-full">
                    <div
                      className="w-[28px] flex flex-col gap-[3px] p-[5px]"
                      style={{ background: theme.vars["--sidebar-bg"] }}
                    >
                      <div
                        className="w-full h-[4px] rounded-sm"
                        style={{ background: theme.vars["--sidebar-logo-bg"] }}
                      />
                      <div
                        className="w-full h-[3px] rounded-sm opacity-40"
                        style={{ background: theme.vars["--sidebar-text"] }}
                      />
                      <div
                        className="w-full h-[3px] rounded-sm"
                        style={{
                          background: theme.vars["--sidebar-active-text"],
                          opacity: 0.8,
                        }}
                      />
                      <div
                        className="w-full h-[3px] rounded-sm opacity-30"
                        style={{ background: theme.vars["--sidebar-text"] }}
                      />
                      <div
                        className="w-full h-[3px] rounded-sm opacity-30"
                        style={{ background: theme.vars["--sidebar-text"] }}
                      />
                    </div>
                    {/* Content area */}
                    <div
                      className="flex-1 p-[5px]"
                      style={{ background: theme.vars["--page-bg"] }}
                    >
                      <div className="flex gap-[3px] mb-[4px]">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex-1 h-[12px] rounded"
                            style={{
                              background: theme.vars["--card-bg"],
                              border: `1px solid ${theme.vars["--border"]}`,
                            }}
                          />
                        ))}
                      </div>
                      <div
                        className="h-[28px] rounded"
                        style={{
                          background: theme.vars["--card-bg"],
                          border: `1px solid ${theme.vars["--border"]}`,
                        }}
                      >
                        <div
                          className="h-[3px] w-[40%] rounded m-[5px]"
                          style={{ background: theme.vars["--primary"] }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[13px] font-bold text-text-primary">
                  {theme.name}
                </p>
                <p className="text-[11px] text-text-muted mt-[2px]">
                  {theme.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#EBF5FB] border border-info/20 rounded-xl px-4 py-3">
        <p className="text-[12px] font-semibold text-info mb-1">💡 Tip</p>
        <p className="text-[11px] text-text-muted">
          Try each theme and see which one feels right for your restaurant. Once
          you decide, we'll hardcode the winner and remove this picker.
        </p>
      </div>
    </div>
  );
}

// ─── Main Settings page ───
const SECTION_CONTENT = {
  theme: ThemeSection,
  profile: ProfileSection,
  tax: TaxSection,
  printers: PrintersSection,
  payments: PaymentsSection,
  integrations: IntegrationsSection,
  notifications: NotificationsSection,
  privacy: PrivacySection,
  subscription: SubscriptionSection,
};

export default function Settings() {
  const [activeSection, setActiveSection] = useState("theme");
  const ActiveContent = SECTION_CONTENT[activeSection];

  return (
    <div className="fade-in flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-[20px] font-semibold text-text-primary">
          Settings
        </h1>
        <p className="text-[13px] text-text-muted mt-[2px]">
          Manage your restaurant configuration
        </p>
      </div>

      <div className="flex gap-5 flex-1 overflow-hidden">
        {/* Left nav */}
        <div className="w-[220px] flex-shrink-0 bg-white rounded-xl border border-[#EEEEEE] overflow-y-auto">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const active = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={[
                  "w-full flex items-center gap-3 px-4 py-3 text-left text-[13px] font-medium transition-all border-b border-[#F5F5F5] last:border-b-0",
                  active
                    ? "bg-[#FFF5F5] text-primary border-l-2 border-l-primary"
                    : "text-text-secondary hover:bg-surface",
                ].join(" ")}
              >
                <Icon
                  size={15}
                  className={active ? "text-primary" : "text-text-muted"}
                />
                {s.label}
                {active && (
                  <ChevronRight size={13} className="ml-auto text-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right content */}
        <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE] px-6 py-5">
          <p className="text-[16px] font-semibold text-text-primary mb-4">
            {SECTIONS.find((s) => s.id === activeSection)?.label}
          </p>
          <ActiveContent />
        </div>
      </div>
    </div>
  );
}
