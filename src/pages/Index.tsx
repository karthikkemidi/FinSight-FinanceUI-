import { useMemo } from "react";
import { mockTransactions, Transaction, Role } from "@/data/mockData";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceChart from "@/components/dashboard/BalanceChart";
import SpendingChart from "@/components/dashboard/SpendingChart";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import InsightsSection from "@/components/dashboard/InsightsSection";
import RoleSwitcher from "@/components/dashboard/RoleSwitcher";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Index = () => {
  const [role, setRole] = useLocalStorage<Role>("fin-role", "viewer");
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>("fin-transactions", mockTransactions);

  const { totalIncome, totalExpenses, totalBalance } = useMemo(() => {
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome, totalExpenses, totalBalance: totalIncome - totalExpenses };
  }, [transactions]);

  const handleAdd = (data: Omit<Transaction, "id">) => {
    if (role !== "admin") return;
    setTransactions((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
  };

  const handleEdit = (updated: Transaction) => {
    if (role !== "admin") return;
    setTransactions((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = (id: string) => {
    if (role !== "admin") return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleReset = () => {
    setTransactions(mockTransactions);
  };

  const handleExport = () => {
    if (!transactions.length) return;
    const headers = ["Date", "Description", "Category", "Amount", "Type"];
    const rows = transactions.map((t) => [t.date, t.description, t.category, t.amount, t.type].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FinDash</h1>
              <p className="text-xs text-muted-foreground">Personal finance pulse at a glance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher role={role} onRoleChange={setRole} />
            <button
              onClick={handleExport}
              className="px-3 py-2 text-sm rounded-lg border border-border bg-secondary text-foreground hover:bg-accent transition-colors"
              disabled={!transactions.length}
            >
              Export CSV
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Reset Data
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        <SummaryCards totalBalance={totalBalance} totalIncome={totalIncome} totalExpenses={totalExpenses} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <BalanceChart />
          </div>
          <div className="lg:col-span-2">
            <SpendingChart transactions={transactions} />
          </div>
        </div>

        <InsightsSection transactions={transactions} />

        <TransactionsTable transactions={transactions} role={role} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
    </div>
  );
};

export default Index;
