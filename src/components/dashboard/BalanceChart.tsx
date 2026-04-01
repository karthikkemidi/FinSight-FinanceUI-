import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { monthlyData } from "@/data/mockData";

const BalanceChart = () => {
  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Statistics</p>
          <h3 className="text-lg font-semibold text-foreground">Monthly Balance Trend</h3>
        </div>
        <span className="text-success text-sm font-medium">+18.34% ↑</span>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
            <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
            <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 40%, 10%)",
                border: "1px solid hsl(222, 20%, 18%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 96%)",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
            />
            <Area type="monotone" dataKey="balance" stroke="hsl(217, 91%, 60%)" fill="url(#balanceGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceChart;
