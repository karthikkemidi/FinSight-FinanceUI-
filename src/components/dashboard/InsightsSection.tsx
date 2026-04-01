import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Transaction, monthlyData } from "@/data/mockData";

interface InsightsSectionProps {
  transactions: Transaction[];
}

const InsightsSection = ({ transactions }: InsightsSectionProps) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const byCategory: Record<string, number> = {};
  expenses.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });
  const sorted = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const topCategory = sorted[0];

  const current = monthlyData[monthlyData.length - 1];
  const previous = monthlyData[monthlyData.length - 2];
  const balanceChange = ((current.balance - previous.balance) / previous.balance * 100).toFixed(1);
  const expenseChange = ((current.expenses - previous.expenses) / previous.expenses * 100).toFixed(1);

  const insights = [
    {
      icon: BarChart3,
      title: "Highest Spending",
      value: topCategory ? topCategory[0] : "N/A",
      detail: topCategory ? `$${topCategory[1].toFixed(2)} this month` : "Add expenses to generate insights",
      color: "text-warning",
    },
    {
      icon: TrendingUp,
      title: "Balance Growth",
      value: `${Number(balanceChange) > 0 ? "+" : ""}${balanceChange}%`,
      detail: `$${current.balance.toLocaleString()} current`,
      color: Number(balanceChange) > 0 ? "text-success" : "text-destructive",
    },
    {
      icon: TrendingDown,
      title: "Expense Trend",
      value: `${Number(expenseChange) > 0 ? "+" : ""}${expenseChange}%`,
      detail: `vs $${previous.expenses.toLocaleString()} last month`,
      color: Number(expenseChange) > 0 ? "text-destructive" : "text-success",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((insight, i) => (
        <div key={insight.title} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${600 + i * 100}ms` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <insight.icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{insight.title}</span>
          </div>
          <p className={`text-xl font-bold ${insight.color}`}>{insight.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{insight.detail}</p>
        </div>
      ))}
    </div>
  );
};

export default InsightsSection;
