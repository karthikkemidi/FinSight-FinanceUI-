import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";
import { useState } from "react";
import { Transaction } from "@/data/mockData";

interface SpendingChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 65%, 60%)",
  "hsl(350, 80%, 60%)",
  "hsl(190, 80%, 50%)",
];

const CATEGORY_ICONS: Record<string, string> = {
  "Food & Dining": "🍽️",
  Shopping: "🛍️",
  Transportation: "🚌",
  "Bills & Utilities": "🧾",
  Entertainment: "🎬",
  Healthcare: "💊",
  Salary: "💼",
  Freelance: "🧑‍💻",
  Investment: "📈",
  Travel: "✈️",
  Groceries: "🥕",
  Other: "💳",
};

const SpendingChart = ({ transactions }: SpendingChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const expenses = transactions.filter((t) => t.type === "expense");
  const byCategory: Record<string, number> = {};
  expenses.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });
  const data = Object.entries(byCategory)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card p-6 h-full flex flex-col animate-fade-in transition-transform duration-300 hover:-translate-y-1" style={{ animationDelay: "400ms" }}>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Statistics</p>
        <h3 className="text-lg font-semibold text-foreground">Spending by Category</h3>
      </div>
      {data.length === 0 ? (
        <div className="h-[200px] flex-1 flex items-center justify-center text-sm text-muted-foreground">
          No expense data yet. Add expenses to see the breakdown.
        </div>
      ) : (
      <div className="flex flex-col lg:flex-row items-center gap-4 flex-1">
        <div className="h-[240px] w-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                dataKey="value"
                paddingAngle={3}
                activeIndex={activeIndex ?? undefined}
                activeShape={(props) => {
                  const { outerRadius, ...rest } = props;
                  return (
                    <g>
                      <Sector {...rest} innerRadius={60} outerRadius={outerRadius + 6} stroke="none" />
                      <Sector {...rest} innerRadius={outerRadius + 8} outerRadius={outerRadius + 12} fillOpacity={0.18} stroke="none" />
                    </g>
                  );
                }}
                onMouseEnter={(_, idx) => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(null)}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} style={{ outline: "none" }} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 40%, 10%)",
                  border: "1px solid hsl(222, 20%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 96%)",
                }}
                labelStyle={{ color: "hsl(210, 40%, 96%)" }}
                itemStyle={{ color: "hsl(210, 40%, 96%)" }}
                formatter={(value: number) => [`$${value.toFixed(2)}`]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {data.map((item, i) => {
            const icon = CATEGORY_ICONS[item.name] ?? "💳";
            return (
              <div key={item.name} className="flex items-center justify-between text-sm select-none pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-base" style={{ backgroundColor: `${COLORS[i % COLORS.length]}20`, color: COLORS[i % COLORS.length] }}>
                    {icon}
                  </span>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-foreground font-medium">{((item.value / total) * 100).toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
};

export default SpendingChart;
