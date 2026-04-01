import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

const SummaryCards = ({ totalBalance, totalIncome, totalExpenses }: SummaryCardsProps) => {
  const cards = [
    {
      title: "Total Balance",
      value: totalBalance,
      icon: Wallet,
      change: "+18.34%",
      positive: true,
    },
    {
      title: "Income",
      value: totalIncome,
      icon: TrendingUp,
      change: "+12.5%",
      positive: true,
    },
    {
      title: "Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      change: "+4.2%",
      positive: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className="glass-card p-6 animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">{card.title}</span>
            <div className="p-2 rounded-lg bg-primary/10">
              <card.icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            ${card.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className={`text-xs mt-2 ${card.positive ? "text-success" : "text-destructive"}`}>
            {card.change} from last month
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
