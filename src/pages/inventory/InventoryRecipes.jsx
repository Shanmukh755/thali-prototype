import { useState } from "react";
import { ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";

const RECIPES = [
  {
    dish: "Butter Chicken",
    plateCost: 86,
    price: 320,
    margin: 73,
    category: "⭐ Star",
    ingredients: [
      { name: "Chicken", qty: 0.2, unit: "kg", cost: 36, prepWaste: "10%" },
      { name: "Tomatoes", qty: 0.15, unit: "kg", cost: 6, prepWaste: "5%" },
      { name: "Butter", qty: 0.03, unit: "kg", cost: 14, prepWaste: "0%" },
      { name: "Cream", qty: 0.05, unit: "ltr", cost: 6, prepWaste: "0%" },
      { name: "Spices", qty: 0.01, unit: "kg", cost: 8, prepWaste: "0%" },
      { name: "Onions", qty: 0.1, unit: "kg", cost: 4, prepWaste: "15%" },
    ],
    costAlert: null,
  },
  {
    dish: "Chicken Biryani",
    plateCost: 124,
    price: 340,
    margin: 64,
    category: "⭐ Star",
    ingredients: [
      { name: "Chicken", qty: 0.25, unit: "kg", cost: 45, prepWaste: "10%" },
      {
        name: "Basmati Rice",
        qty: 0.15,
        unit: "kg",
        cost: 13,
        prepWaste: "0%",
      },
      { name: "Onions", qty: 0.1, unit: "kg", cost: 4, prepWaste: "15%" },
      { name: "Spices", qty: 0.02, unit: "kg", cost: 16, prepWaste: "0%" },
      { name: "Cooking Oil", qty: 0.03, unit: "ltr", cost: 4, prepWaste: "0%" },
    ],
    costAlert: "Tomato prices up 40% — margin dropped from 68% to 64%",
  },
  {
    dish: "Dal Makhani",
    plateCost: 58,
    price: 220,
    margin: 74,
    category: "⭐ Star",
    ingredients: [
      { name: "Butter", qty: 0.04, unit: "kg", cost: 19, prepWaste: "0%" },
      { name: "Cream", qty: 0.04, unit: "ltr", cost: 5, prepWaste: "0%" },
      { name: "Spices", qty: 0.01, unit: "kg", cost: 8, prepWaste: "0%" },
      { name: "Onions", qty: 0.08, unit: "kg", cost: 3, prepWaste: "15%" },
    ],
    costAlert: null,
  },
  {
    dish: "Mutton Biryani",
    plateCost: 188,
    price: 420,
    margin: 55,
    category: "🐄 Plowhorse",
    ingredients: [
      { name: "Mutton", qty: 0.25, unit: "kg", cost: 163, prepWaste: "15%" },
      {
        name: "Basmati Rice",
        qty: 0.15,
        unit: "kg",
        cost: 13,
        prepWaste: "0%",
      },
      { name: "Spices", qty: 0.02, unit: "kg", cost: 16, prepWaste: "0%" },
    ],
    costAlert: null,
  },
  {
    dish: "Paneer Tikka",
    plateCost: 92,
    price: 260,
    margin: 65,
    category: "⭐ Star",
    ingredients: [
      { name: "Paneer", qty: 0.15, unit: "kg", cost: 35, prepWaste: "5%" },
      { name: "Cream", qty: 0.03, unit: "ltr", cost: 4, prepWaste: "0%" },
      { name: "Spices", qty: 0.01, unit: "kg", cost: 8, prepWaste: "0%" },
      { name: "Onions", qty: 0.05, unit: "kg", cost: 2, prepWaste: "15%" },
    ],
    costAlert: "Paneer stock low — may affect availability",
  },
  {
    dish: "Veg Spring Roll",
    plateCost: 42,
    price: 180,
    margin: 77,
    category: "🧩 Puzzle",
    ingredients: [
      { name: "Maida", qty: 0.05, unit: "kg", cost: 2, prepWaste: "0%" },
      { name: "Cooking Oil", qty: 0.02, unit: "ltr", cost: 3, prepWaste: "0%" },
      { name: "Onions", qty: 0.05, unit: "kg", cost: 2, prepWaste: "15%" },
    ],
    costAlert: null,
  },
];

function RecipeRow({ recipe }) {
  const [expanded, setExpanded] = useState(false);
  const marginColor =
    recipe.margin > 70
      ? "text-success"
      : recipe.margin > 60
        ? "text-warning"
        : "text-danger";
  const marginBg =
    recipe.margin > 70
      ? "bg-[#E8F8F0]"
      : recipe.margin > 60
        ? "bg-[#FEF3E8]"
        : "bg-[#FDECEA]";

  return (
    <>
      <tr
        className="hover:bg-[#FAFAFA] cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <td>
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronDown size={14} className="text-text-muted" />
            ) : (
              <ChevronRight size={14} className="text-text-muted" />
            )}
            <span className="font-medium text-text-primary">{recipe.dish}</span>
            {recipe.costAlert && (
              <AlertTriangle
                size={12}
                className="text-warning"
                title={recipe.costAlert}
              />
            )}
          </div>
        </td>
        <td className="font-semibold text-[13px]">₹{recipe.plateCost}</td>
        <td className="font-semibold text-[13px]">₹{recipe.price}</td>
        <td>
          <span
            className={`text-[11px] font-semibold px-2 py-[3px] rounded-full ${marginBg} ${marginColor}`}
          >
            {recipe.margin}%
          </span>
        </td>
        <td className="text-[12px]">{recipe.category}</td>
        <td className="text-[12px] text-text-muted">
          ₹{recipe.price - recipe.plateCost} / plate
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6} className="bg-[#FAFAFA] px-8 py-3">
            {recipe.costAlert && (
              <div className="flex items-center gap-2 bg-[#FEF3E8] border border-warning/20 rounded-lg px-3 py-2 mb-3">
                <AlertTriangle
                  size={13}
                  className="text-warning flex-shrink-0"
                />
                <p className="text-[12px] text-warning font-medium">
                  {recipe.costAlert}
                </p>
              </div>
            )}
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-text-muted text-[10px] uppercase tracking-wide">
                  <th className="text-left pb-2 font-semibold">Ingredient</th>
                  <th className="text-left pb-2 font-semibold">Qty</th>
                  <th className="text-left pb-2 font-semibold">Prep Waste</th>
                  <th className="text-right pb-2 font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ing, i) => (
                  <tr key={i} className="border-t border-[#EEEEEE]">
                    <td className="py-[6px] text-text-primary">{ing.name}</td>
                    <td className="py-[6px] text-text-muted">
                      {ing.qty} {ing.unit}
                    </td>
                    <td className="py-[6px] text-text-muted">
                      {ing.prepWaste}
                    </td>
                    <td className="py-[6px] text-right font-semibold">
                      ₹{ing.cost}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-[#E0E0E0]">
                  <td
                    colSpan={3}
                    className="py-[6px] font-semibold text-text-primary"
                  >
                    Total Plate Cost
                  </td>
                  <td className="py-[6px] text-right font-bold text-primary">
                    ₹{recipe.plateCost}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
}

export default function InventoryRecipes() {
  const avgMargin = Math.round(
    RECIPES.reduce((s, r) => s + r.margin, 0) / RECIPES.length,
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="grid grid-cols-4 gap-3 mb-3 flex-shrink-0">
        {[
          {
            label: "Recipes",
            value: RECIPES.length,
            color: "text-text-primary",
          },
          {
            label: "Avg Margin",
            value: `${avgMargin}%`,
            color: "text-success",
          },
          {
            label: "Cost Alerts",
            value: RECIPES.filter((r) => r.costAlert).length,
            color: "text-warning",
          },
          {
            label: "Avg Plate Cost",
            value: `₹${Math.round(RECIPES.reduce((s, r) => s + r.plateCost, 0) / RECIPES.length)}`,
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
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Plate Cost</th>
              <th>Selling Price</th>
              <th>Gross Margin</th>
              <th>ME Category</th>
              <th>Contribution</th>
            </tr>
          </thead>
          <tbody>
            {RECIPES.map((r) => (
              <RecipeRow key={r.dish} recipe={r} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
