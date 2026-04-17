import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  X,
  ChevronDown,
  Globe,
  Clock,
  AlertTriangle,
  RefreshCw,
  Upload,
} from "lucide-react";
import { MENU_ITEMS, MENU_CATEGORIES } from "../data/mockData";

// ─── Menu Engineering badge config ───
const ME_CONFIG = {
  star: {
    label: "⭐ Star",
    bg: "bg-[#E8F8F0]",
    text: "text-success",
    tip: "High volume, high margin. Feature prominently.",
  },
  plowhorse: {
    label: "🐄 Plowhorse",
    bg: "bg-[#EBF5FB]",
    text: "text-info",
    tip: "High volume, low margin. Consider raising price 5-8%.",
  },
  puzzle: {
    label: "🧩 Puzzle",
    bg: "bg-[#FEF3E8]",
    text: "text-warning",
    tip: "Low volume, high margin. Improve placement & photos.",
  },
  dog: {
    label: "🐕 Dog",
    bg: "bg-[#FDECEA]",
    text: "text-danger",
    tip: "Low volume, low margin. Consider removing.",
  },
};

// ─── Platform toggle pill ───
function PlatformPill({ label, active, color, onChange }) {
  return (
    <button
      onClick={onChange}
      className={[
        "text-[10px] font-bold px-2 py-[3px] rounded-full border transition-all",
        active
          ? `${color} border-transparent`
          : "bg-white text-text-muted border-[#E0E0E0]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── Veg indicator ───
function VegDot({ veg }) {
  return (
    <div
      className={`w-[13px] h-[13px] rounded-sm border-[1.5px] flex items-center justify-center flex-shrink-0 ${veg ? "border-success" : "border-danger"}`}
    >
      {veg ? (
        <div className="w-[5px] h-[5px] rounded-full bg-success" />
      ) : (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "3px solid transparent",
            borderRight: "3px solid transparent",
            borderBottom: "6px solid #E74C3C",
          }}
        />
      )}
    </div>
  );
}

// ─── Item Edit Modal ───
function ItemEditModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    name: item?.name ?? "",
    category: item?.category ?? MENU_CATEGORIES[0],
    price: item?.price ?? 0,
    zomatoPrice: item?.zomatoPrice ?? 0,
    swiggyPrice: item?.swiggyPrice ?? 0,
    description: item?.description ?? "",
    veg: item?.veg ?? true,
    available: item?.available ?? true,
    zomato: item?.zomato ?? true,
    swiggy: item?.swiggy ?? true,
    ondc: item?.ondc ?? false,
    prepTime: item?.prepTime ?? 10,
  });

  const isNew = !item;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-[520px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#F0F0F0]">
          <p className="text-[16px] font-semibold text-text-primary">
            {isNew ? "Add New Item" : `Edit — ${item.name}`}
          </p>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* Name + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Item Name</label>
              <input
                className="form-input"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. Butter Chicken"
              />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select
                className="dropdown-select w-full"
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
              >
                {MENU_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="form-label">In-store Price (₹)</label>
              <input
                type="number"
                className="form-input"
                value={form.price}
                onChange={(e) =>
                  setForm((p) => ({ ...p, price: Number(e.target.value) }))
                }
              />
            </div>
            <div>
              <label className="form-label">Zomato Price (₹)</label>
              <input
                type="number"
                className="form-input"
                value={form.zomatoPrice}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    zomatoPrice: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <label className="form-label">Swiggy Price (₹)</label>
              <input
                type="number"
                className="form-input"
                value={form.swiggyPrice}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    swiggyPrice: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>

          {/* Description + Prep time */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="form-label">Description</label>
              <input
                className="form-input"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Short description for online menus"
              />
            </div>
            <div>
              <label className="form-label">Prep Time (min)</label>
              <input
                type="number"
                className="form-input"
                value={form.prepTime}
                onChange={(e) =>
                  setForm((p) => ({ ...p, prepTime: Number(e.target.value) }))
                }
              />
            </div>
          </div>

          {/* Veg toggle + availability */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setForm((p) => ({ ...p, veg: true }))}
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-[5px] rounded-lg border transition-all ${form.veg ? "bg-[#E8F8F0] text-success border-success" : "bg-white text-text-muted border-[#E0E0E0]"}`}
              >
                <div className="w-[10px] h-[10px] rounded-sm border border-success flex items-center justify-center">
                  <div className="w-[4px] h-[4px] rounded-full bg-success" />
                </div>{" "}
                Veg
              </button>
              <button
                onClick={() => setForm((p) => ({ ...p, veg: false }))}
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-[5px] rounded-lg border transition-all ${!form.veg ? "bg-[#FDECEA] text-danger border-danger" : "bg-white text-text-muted border-[#E0E0E0]"}`}
              >
                <div
                  className="w-[10px] h-[10px] rounded-sm border border-danger flex items-center justify-center"
                  style={{ borderColor: "#E74C3C" }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "3px solid transparent",
                      borderRight: "3px solid transparent",
                      borderBottom: "6px solid #E74C3C",
                    }}
                  />
                </div>{" "}
                Non-veg
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setForm((p) => ({ ...p, available: !p.available }))
                }
                className={`w-9 h-5 rounded-full transition-colors ${form.available ? "bg-primary" : "bg-[#CCC]"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow transition-all mt-[2px] ${form.available ? "ml-[18px]" : "ml-[2px]"}`}
                />
              </button>
              <span className="text-xs text-text-secondary font-medium">
                {form.available ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          {/* Platform toggles */}
          <div>
            <label className="form-label mb-2">Active on Platforms</label>
            <div className="flex gap-2">
              {[
                {
                  key: "zomato",
                  label: "Zomato",
                  color: "bg-[#E23744] text-white",
                },
                {
                  key: "swiggy",
                  label: "Swiggy",
                  color: "bg-[#FC8019] text-white",
                },
                {
                  key: "ondc",
                  label: "ONDC",
                  color: "bg-[#27AE60] text-white",
                },
              ].map((p) => (
                <PlatformPill
                  key={p.key}
                  label={p.label}
                  active={form[p.key]}
                  color={p.color}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, [p.key]: !prev[p.key] }))
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-5 pt-3 border-t border-[#F0F0F0]">
          <button className="btn-ghost flex-shrink-0" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary flex-1 justify-center"
            onClick={() => {
              onSave(form);
              onClose();
            }}
          >
            <CheckCircle size={14} /> {isNew ? "Add Item" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Items & Categories tab ───
function ItemsTab({ items, setItems }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const categories = ["All", ...MENU_CATEGORIES];

  const filtered = items.filter((item) => {
    const matchCat =
      activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleAvailable = (id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i)),
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const saveItem = (form) => {
    if (editItem) {
      setItems((prev) =>
        prev.map((i) => (i.id === editItem.id ? { ...i, ...form } : i)),
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          popular: false,
          menuEngineering: "puzzle",
          tags: [],
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-3 flex-shrink-0">
        <div className="relative flex-1 max-w-[280px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
          <input
            className="form-input pl-9 text-[13px] w-full"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-[4px] flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-semibold px-3 py-[5px] rounded-lg border transition-all ${activeCategory === cat ? "bg-primary text-white border-primary" : "bg-white text-text-muted border-[#E0E0E0] hover:border-[#CCC]"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          className="btn-primary ml-auto"
          onClick={() => {
            setEditItem(null);
            setShowAdd(true);
          }}
        >
          <Plus size={14} /> Add Item
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-3 flex-shrink-0">
        {[
          {
            label: "Total Items",
            value: items.length,
            color: "text-text-primary",
          },
          {
            label: "Available",
            value: items.filter((i) => i.available).length,
            color: "text-success",
          },
          {
            label: "Unavailable",
            value: items.filter((i) => !i.available).length,
            color: "text-danger",
          },
          {
            label: "Online (any)",
            value: items.filter((i) => i.zomato || i.swiggy || i.ondc).length,
            color: "text-info",
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

      {/* Table */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>In-store</th>
              <th>Zomato</th>
              <th>Swiggy</th>
              <th>Platforms</th>
              <th>ME</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const me = ME_CONFIG[item.menuEngineering] || ME_CONFIG.puzzle;
              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#FAFAFA] transition-colors"
                >
                  <td>
                    <div className="flex items-center gap-2">
                      <VegDot veg={item.veg} />
                      <div>
                        <p className="text-[13px] font-medium text-text-primary">
                          {item.name}
                        </p>
                        {item.description && (
                          <p className="text-[10px] text-text-muted truncate max-w-[160px]">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-xs text-text-muted">{item.category}</td>
                  <td className="font-semibold text-[13px]">₹{item.price}</td>
                  <td className="text-[12px] text-[#E23744] font-medium">
                    {item.zomato ? (
                      `₹${item.zomatoPrice}`
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="text-[12px] text-[#FC8019] font-medium">
                    {item.swiggy ? (
                      `₹${item.swiggyPrice}`
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-1">
                      {item.zomato && (
                        <span className="text-[9px] font-bold bg-[#FDE8EA] text-[#E23744] px-[5px] py-[2px] rounded">
                          Z
                        </span>
                      )}
                      {item.swiggy && (
                        <span className="text-[9px] font-bold bg-[#FEF0E6] text-[#FC8019] px-[5px] py-[2px] rounded">
                          S
                        </span>
                      )}
                      {item.ondc && (
                        <span className="text-[9px] font-bold bg-[#E8F8F0] text-success px-[5px] py-[2px] rounded">
                          O
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${me.bg} ${me.text}`}
                      title={me.tip}
                    >
                      {me.label}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleAvailable(item.id)}
                      className={`text-[10px] font-semibold px-2 py-[3px] rounded-full transition-all ${item.available ? "bg-[#E8F8F0] text-success" : "bg-[#FDECEA] text-danger"}`}
                    >
                      {item.available ? "✅ Available" : "❌ Off"}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditItem(item);
                          setShowAdd(true);
                        }}
                        className="btn-ghost py-[4px] px-2 text-[11px]"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="btn-ghost py-[4px] px-2 text-[11px] hover:text-danger hover:border-danger"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <ItemEditModal
          item={editItem}
          onClose={() => setShowAdd(false)}
          onSave={saveItem}
        />
      )}
    </div>
  );
}

// ─── Modifiers & Add-ons tab ───
const MODIFIER_GROUPS = [
  {
    id: 1,
    name: "Spice Level",
    required: true,
    multiSelect: false,
    options: [
      { name: "Mild", price: 0 },
      { name: "Medium", price: 0 },
      { name: "Hot", price: 0 },
      { name: "Extra Hot", price: 0 },
    ],
  },
  {
    id: 2,
    name: "Add-ons",
    required: false,
    multiSelect: true,
    options: [
      { name: "Extra Butter", price: 30 },
      { name: "Extra Cheese", price: 40 },
      { name: "Extra Gravy", price: 25 },
      { name: "Raita", price: 60 },
    ],
  },
  {
    id: 3,
    name: "Size",
    required: true,
    multiSelect: false,
    options: [
      { name: "Half", price: 0 },
      { name: "Full", price: 80 },
    ],
  },
  {
    id: 4,
    name: "Bread Choice",
    required: false,
    multiSelect: false,
    options: [
      { name: "Butter Naan", price: 50 },
      { name: "Garlic Naan", price: 60 },
      { name: "Tandoori Roti", price: 35 },
      { name: "Paratha", price: 55 },
    ],
  },
];

function ModifiersTab() {
  const [groups, setGroups] = useState(MODIFIER_GROUPS);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-text-muted">
          Modifier groups apply to items during ordering. Customers choose from
          these options.
        </p>
        <button className="btn-primary">
          <Plus size={14} /> New Group
        </button>
      </div>
      {groups.map((group) => (
        <div
          key={group.id}
          className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5F5F5]">
            <div className="flex items-center gap-3">
              <p className="text-[14px] font-semibold text-text-primary">
                {group.name}
              </p>
              <span
                className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${group.required ? "bg-[#FDECEA] text-danger" : "bg-[#F5F5F5] text-text-muted"}`}
              >
                {group.required ? "Required" : "Optional"}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${group.multiSelect ? "bg-[#EBF5FB] text-info" : "bg-[#F5F5F5] text-text-muted"}`}
              >
                {group.multiSelect ? "Multi-select" : "Single select"}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost py-[4px] px-3 text-xs">
                <Edit2 size={12} /> Edit
              </button>
              <button className="btn-ghost py-[4px] px-3 text-xs hover:text-danger">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
          <div className="px-5 py-3 flex flex-wrap gap-2">
            {group.options.map((opt, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-surface rounded-lg px-3 py-2 border border-[#EEEEEE]"
              >
                <span className="text-[12px] font-medium text-text-primary">
                  {opt.name}
                </span>
                {opt.price > 0 && (
                  <span className="text-[11px] text-primary font-semibold">
                    +₹{opt.price}
                  </span>
                )}
                <button className="text-text-muted hover:text-danger ml-1">
                  <X size={11} />
                </button>
              </div>
            ))}
            <button className="flex items-center gap-1 text-[11px] text-primary border border-dashed border-primary rounded-lg px-3 py-2 hover:bg-[#FFF5F5] transition-colors">
              <Plus size={11} /> Add option
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Platform Sync tab ───
function PlatformSyncTab({ items }) {
  const [syncing, setSyncing] = useState(null);
  const [synced, setSynced] = useState({
    zomato: true,
    swiggy: true,
    ondc: false,
  });

  const platforms = [
    {
      key: "zomato",
      label: "Zomato",
      color: "#E23744",
      bg: "bg-[#FDE8EA]",
      text: "text-[#E23744]",
      items: items.filter((i) => i.zomato).length,
    },
    {
      key: "swiggy",
      label: "Swiggy",
      color: "#FC8019",
      bg: "bg-[#FEF0E6]",
      text: "text-[#FC8019]",
      items: items.filter((i) => i.swiggy).length,
    },
    {
      key: "ondc",
      label: "ONDC",
      color: "#27AE60",
      bg: "bg-[#E8F8F0]",
      text: "text-success",
      items: items.filter((i) => i.ondc).length,
    },
  ];

  const handleSync = (key) => {
    setSyncing(key);
    setTimeout(() => {
      setSyncing(null);
      setSynced((prev) => ({ ...prev, [key]: true }));
    }, 1800);
  };

  return (
    <div className="space-y-4">
      {/* Info banner */}
      <div className="flex items-start gap-3 bg-[#EBF5FB] border border-info/20 rounded-xl px-4 py-3">
        <Globe size={16} className="text-info mt-[1px] flex-shrink-0" />
        <div>
          <p className="text-[13px] font-semibold text-text-primary">
            Single editor — sync to all platforms in one click
          </p>
          <p className="text-[11px] text-text-muted mt-[2px]">
            Edit your menu once here. Push changes to Zomato, Swiggy, and ONDC
            simultaneously. Platform-specific pricing is preserved.
          </p>
        </div>
      </div>

      {/* Platform cards */}
      <div className="grid grid-cols-3 gap-4">
        {platforms.map((p) => (
          <div
            key={p.key}
            className={`rounded-xl border p-5 ${p.bg} border-[${p.color}]/20`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[15px] font-bold ${p.text}`}>
                {p.label}
              </span>
              {synced[p.key] ? (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-success">
                  <CheckCircle size={11} /> Synced
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-warning">
                  Pending sync
                </span>
              )}
            </div>
            <p className="text-[22px] font-bold text-text-primary mb-1">
              {p.items}
            </p>
            <p className="text-[11px] text-text-muted mb-4">
              items active on {p.label}
            </p>
            <button
              onClick={() => handleSync(p.key)}
              disabled={syncing === p.key}
              className="w-full btn-primary justify-center text-xs py-[7px] disabled:opacity-60"
            >
              {syncing === p.key ? (
                <>
                  <RefreshCw size={12} className="animate-spin" /> Syncing...
                </>
              ) : (
                <>
                  <RefreshCw size={12} /> Sync to {p.label}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Sync all */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold text-text-primary">
              Sync All Platforms
            </p>
            <p className="text-[12px] text-text-muted mt-[2px]">
              Push all menu changes to Zomato, Swiggy, and ONDC at once
            </p>
          </div>
          <button
            onClick={() => {
              setSyncing("all");
              setTimeout(() => {
                setSyncing(null);
                setSynced({ zomato: true, swiggy: true, ondc: true });
              }, 2200);
            }}
            disabled={syncing === "all"}
            className="btn-primary disabled:opacity-60"
          >
            {syncing === "all" ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Syncing all...
              </>
            ) : (
              <>
                <Globe size={14} /> Sync All Platforms
              </>
            )}
          </button>
        </div>
      </div>

      {/* Items not on any platform */}
      {items.filter((i) => !i.zomato && !i.swiggy && !i.ondc).length > 0 && (
        <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[#F5F5F5]">
            <AlertTriangle size={14} className="text-warning" />
            <p className="text-[13px] font-semibold text-text-primary">
              Items not on any platform
            </p>
            <span className="text-[10px] font-bold bg-[#FEF3E8] text-warning px-2 py-[2px] rounded-full ml-auto">
              {items.filter((i) => !i.zomato && !i.swiggy && !i.ondc).length}{" "}
              items
            </span>
          </div>
          <div className="px-5 py-3 flex flex-wrap gap-2">
            {items
              .filter((i) => !i.zomato && !i.swiggy && !i.ondc)
              .map((item) => (
                <span
                  key={item.id}
                  className="text-[11px] bg-surface border border-[#EEEEEE] rounded-lg px-3 py-[5px] text-text-secondary"
                >
                  {item.name}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Menu Scheduling tab ───
const SCHEDULES = [
  {
    id: 1,
    name: "Breakfast Menu",
    days: "Mon–Sun",
    from: "7:00 AM",
    to: "11:00 AM",
    categories: ["Beverages"],
    active: true,
  },
  {
    id: 2,
    name: "Lunch Menu",
    days: "Mon–Sun",
    from: "11:00 AM",
    to: "3:00 PM",
    categories: ["Mains", "Breads", "Rice & Biryani"],
    active: true,
  },
  {
    id: 3,
    name: "Evening Snacks",
    days: "Mon–Sun",
    from: "3:00 PM",
    to: "6:00 PM",
    categories: ["Starters", "Beverages"],
    active: true,
  },
  {
    id: 4,
    name: "Dinner Menu",
    days: "Mon–Sun",
    from: "6:00 PM",
    to: "11:00 PM",
    categories: [
      "Starters",
      "Mains",
      "Breads",
      "Rice & Biryani",
      "Beverages",
      "Desserts",
    ],
    active: true,
  },
  {
    id: 5,
    name: "Late Night",
    days: "Fri–Sat",
    from: "11:00 PM",
    to: "1:00 AM",
    categories: ["Starters", "Beverages"],
    active: false,
  },
];

function SchedulingTab() {
  const [schedules, setSchedules] = useState(SCHEDULES);

  const toggleActive = (id) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-text-muted">
          Menus auto-switch based on time. No manual toggling needed.
        </p>
        <button className="btn-primary">
          <Plus size={14} /> New Schedule
        </button>
      </div>

      {/* Current active schedule banner */}
      <div className="flex items-center gap-3 bg-[#E8F8F0] border border-success/20 rounded-xl px-4 py-3">
        <Clock size={16} className="text-success flex-shrink-0" />
        <div>
          <p className="text-[13px] font-semibold text-success">
            Dinner Menu is active now
          </p>
          <p className="text-[11px] text-text-muted">
            6:00 PM – 11:00 PM · Showing: Starters, Mains, Breads, Rice &
            Biryani, Beverages, Desserts
          </p>
        </div>
        <span className="ml-auto text-[10px] font-bold bg-success text-white px-2 py-[3px] rounded-full">
          LIVE
        </span>
      </div>

      {/* Schedule list */}
      {schedules.map((s) => (
        <div
          key={s.id}
          className={`bg-white rounded-xl border overflow-hidden transition-all ${s.active ? "border-[#EEEEEE]" : "border-[#EEEEEE] opacity-60"}`}
        >
          <div className="flex items-center gap-4 px-5 py-4">
            {/* Toggle */}
            <button
              onClick={() => toggleActive(s.id)}
              className={`w-9 h-5 rounded-full transition-colors flex-shrink-0 ${s.active ? "bg-primary" : "bg-[#CCC]"}`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow transition-all mt-[2px] ${s.active ? "ml-[18px]" : "ml-[2px]"}`}
              />
            </button>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-text-primary">
                  {s.name}
                </p>
                {s.active && s.name === "Dinner Menu" && (
                  <span className="text-[9px] font-bold bg-success text-white px-[5px] py-[1px] rounded-full">
                    ACTIVE NOW
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-[11px] text-text-muted">
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {s.from} – {s.to}
                </span>
                <span>{s.days}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1 max-w-[280px]">
              {s.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] bg-surface border border-[#EEEEEE] rounded px-2 py-[2px] text-text-secondary"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-1 flex-shrink-0">
              <button className="btn-ghost py-[4px] px-2">
                <Edit2 size={12} />
              </button>
              <button className="btn-ghost py-[4px] px-2 hover:text-danger">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main MenuManagement page ───
const TABS = [
  { id: "items", label: "Items & Categories" },
  { id: "modifiers", label: "Modifiers & Add-ons" },
  { id: "sync", label: "Platform Sync" },
  { id: "schedule", label: "Menu Scheduling" },
];

export default function MenuManagement() {
  const [activeTab, setActiveTab] = useState("items");
  const [items, setItems] = useState(MENU_ITEMS);

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] font-semibold text-text-primary">
            Menu Management
          </h1>
          <p className="text-[13px] text-text-muted mt-[2px]">
            {items.length} items · {MENU_CATEGORIES.length} categories · Edit
            once, sync everywhere
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost">
            <Upload size={14} /> Import
          </button>
          <button className="btn-primary" onClick={() => setActiveTab("sync")}>
            <Globe size={14} /> Sync All Platforms
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-[5px] mb-4 flex-shrink-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={[
              "px-4 py-[7px] rounded-lg text-xs font-semibold border transition-all",
              activeTab === t.id
                ? "bg-primary text-white border-primary"
                : "bg-white text-text-secondary border-[#E0E0E0] hover:bg-surface",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "items" && (
          <ItemsTab items={items} setItems={setItems} />
        )}
        {activeTab === "modifiers" && (
          <div className="overflow-y-auto h-full">
            <ModifiersTab />
          </div>
        )}
        {activeTab === "sync" && (
          <div className="overflow-y-auto h-full">
            <PlatformSyncTab items={items} />
          </div>
        )}
        {activeTab === "schedule" && (
          <div className="overflow-y-auto h-full">
            <SchedulingTab />
          </div>
        )}
      </div>
    </div>
  );
}
