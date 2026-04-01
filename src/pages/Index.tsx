import { useState, useMemo } from "react";
import { mockTransactions, Transaction, Role } from "@/data/mockData";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceChart from "@/components/dashboard/BalanceChart";
import SpendingChart from "@/components/dashboard/SpendingChart";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import InsightsSection from "@/components/dashboard/InsightsSection";
import RoleSwitcher from "@/components/dashboard/RoleSwitcher";

const Index = () => {
  const [role, setRole] = useState<Role>("viewer");
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const { totalIncome, totalExpenses, totalBalance } = useMemo(() => {
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome, totalExpenses, totalBalance: totalIncome - totalExpenses };
  }, [transactions]);

  const handleAdd = (data: Omit<Transaction, "id">) => {
    setTransactions((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
  };

  const handleEdit = (updated: Transaction) => {
    setTransactions((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">FinDash</h1>
          </div>
          <RoleSwitcher role={role} onRoleChange={setRole} />
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
