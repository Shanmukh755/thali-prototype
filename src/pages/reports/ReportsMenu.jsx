const MENU_DATA = [
  {
    name: "Butter Chicken",
    orders: 312,
    margin: 68,
    me: "star",
    revenue: 99840,
    attachment: 72,
  },
  {
    name: "Dal Makhani",
    orders: 241,
    margin: 74,
    me: "star",
    revenue: 53020,
    attachment: 58,
  },
  {
    name: "Paneer Butter Masala",
    orders: 198,
    margin: 71,
    me: "star",
    revenue: 55440,
    attachment: 61,
  },
  {
    name: "Chicken Biryani",
    orders: 287,
    margin: 62,
    me: "plowhorse",
    revenue: 97580,
    attachment: 45,
  },
  {
    name: "Mutton Biryani",
    orders: 142,
    margin: 55,
    me: "plowhorse",
    revenue: 59640,
    attachment: 38,
  },
  {
    name: "Garlic Naan",
    orders: 189,
    margin: 78,
    me: "star",
    revenue: 11340,
    attachment: 82,
  },
  {
    name: "Paneer Tikka",
    orders: 94,
    margin: 65,
    me: "puzzle",
    revenue: 24440,
    attachment: 28,
  },
  {
    name: "Mushroom 65",
    orders: 48,
    margin: 68,
    me: "puzzle",
    revenue: 10560,
    attachment: 18,
  },
  {
    name: "Veg Spring Roll",
    orders: 32,
    margin: 77,
    me: "dog",
    revenue: 5760,
    attachment: 12,
  },
  {
    name: "Ice Cream",
    orders: 28,
    margin: 62,
    me: "dog",
    revenue: 3920,
    attachment: 9,
  },
];

const ME_CFG = {
  star: {
    label: "⭐ Star",
    bg: "bg-[#E8F8F0]",
    text: "text-success",
    tip: "Feature prominently. Never discount.",
  },
  plowhorse: {
    label: "🐄 Plowhorse",
    bg: "bg-[#EBF5FB]",
    text: "text-info",
    tip: "Raise price 5-8%. Reduce portion slightly.",
  },
  puzzle: {
    label: "🧩 Puzzle",
    bg: "bg-[#FEF3E8]",
    text: "text-warning",
    tip: "Improve placement. Add photo. Promote.",
  },
  dog: {
    label: "🐕 Dog",
    bg: "bg-[#FDECEA]",
    text: "text-danger",
    tip: "Consider removing or reworking.",
  },
};

export default function ReportsMenu() {
  const byME = (key) => MENU_DATA.filter((i) => i.me === key);

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-4">
      {/* ME Matrix */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
        <p className="text-[14px] font-semibold text-text-primary mb-1">
          Menu Engineering Matrix
        </p>
        <p className="text-[11px] text-text-muted mb-4">
          Auto-generated monthly · Based on sales volume × gross margin
        </p>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(ME_CFG).map(([key, cfg]) => (
            <div
              key={key}
              className={`rounded-xl border p-4 ${cfg.bg} border-transparent`}
            >
              <p className={`text-[14px] font-bold ${cfg.text} mb-1`}>
                {cfg.label}
              </p>
              <p className="text-[10px] text-text-muted italic mb-3">
                {cfg.tip}
              </p>
              <div className="space-y-1">
                {byME(key).map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between text-[12px]"
                  >
                    <span className="text-text-primary font-medium">
                      {item.name}
                    </span>
                    <span className="text-text-muted">
                      {item.orders} orders
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full table */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#F5F5F5]">
          <p className="text-[14px] font-semibold text-text-primary">
            Item Performance
          </p>
        </div>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Item</th>
              <th>Orders</th>
              <th>Revenue</th>
              <th>Margin</th>
              <th>Attachment %</th>
              <th>ME</th>
            </tr>
          </thead>
          <tbody>
            {MENU_DATA.map((item) => {
              const me = ME_CFG[item.me];
              return (
                <tr key={item.name} className="hover:bg-[#FAFAFA]">
                  <td className="font-medium">{item.name}</td>
                  <td>{item.orders}</td>
                  <td className="font-semibold">
                    ₹{item.revenue.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <span
                      className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${item.margin > 70 ? "bg-[#E8F8F0] text-success" : item.margin > 60 ? "bg-[#FEF3E8] text-warning" : "bg-[#FDECEA] text-danger"}`}
                    >
                      {item.margin}%
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-[5px] bg-[#F0F0F0] rounded-full overflow-hidden max-w-[60px]">
                        <div
                          className="h-full bg-info rounded-full"
                          style={{ width: `${item.attachment}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-text-muted">
                        {item.attachment}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${me.bg} ${me.text}`}
                    >
                      {me.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
