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
          className="glass-card relative overflow-hidden p-6 animate-fade-in transition-transform duration-300 hover:-translate-y-1 shadow-[0_25px_60px_-40px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-sm text-muted-foreground">{card.title}</span>
            <div className="p-2 rounded-lg bg-primary/10">
              <card.icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground relative z-10">
            ${card.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className={`text-xs mt-2 relative z-10 ${card.positive ? "text-success" : "text-destructive"}`}>
            {card.change} from last month
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
