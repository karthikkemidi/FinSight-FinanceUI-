import { useState, useMemo } from "react";
import { Search, ArrowUpDown, Plus, Pencil, Trash2 } from "lucide-react";
import { Transaction, categories, type Role } from "@/data/mockData";

interface TransactionsTableProps {
  transactions: Transaction[];
  role: Role;
  onAdd: (t: Omit<Transaction, "id">) => void;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionsTable = ({ transactions, role, onAdd, onEdit, onDelete }: TransactionsTableProps) => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [sortField, setSortField] = useState<"date" | "amount">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [showForm, setShowForm] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: categories[0],
    amount: "",
    type: "expense" as "income" | "expense",
  });

  const filtered = useMemo(() => {
    let result = transactions.filter((t) => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === "all" || t.type === filterType;
      return matchSearch && matchType;
    });
    result.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortField === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });
    return result;
  }, [transactions, search, filterType, sortField, sortDir]);

  const toggleSort = (field: "date" | "amount") => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  };

  const resetForm = () => {
    setFormData({ date: "", description: "", category: categories[0], amount: "", type: "expense" });
    setShowForm(false);
    setEditingTx(null);
  };

  const handleSubmit = () => {
    if (!formData.date || !formData.description || !formData.amount) return;
    if (editingTx) {
      onEdit({ ...editingTx, ...formData, amount: parseFloat(formData.amount) });
    } else {
      onAdd({ ...formData, amount: parseFloat(formData.amount) });
    }
    resetForm();
  };

  const startEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setFormData({ date: tx.date, description: tx.description, category: tx.category, amount: String(tx.amount), type: tx.type });
    setShowForm(true);
  };

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "500ms" }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-foreground">Transactions</h3>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-48"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {role === "admin" && (
            <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Add
            </button>
          )}
        </div>
      </div>

      {showForm && role === "admin" && (
        <div className="mb-6 p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as any })} className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">{editingTx ? "Update" : "Add"}</button>
            <button onClick={resetForm} className="px-4 py-2 text-sm rounded-lg bg-secondary text-foreground hover:bg-accent transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium cursor-pointer" onClick={() => toggleSort("date")}>
                <span className="flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3" /></span>
              </th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Description</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden sm:table-cell">Category</th>
              <th className="text-right py-3 px-2 text-muted-foreground font-medium cursor-pointer" onClick={() => toggleSort("amount")}>
                <span className="flex items-center justify-end gap-1">Amount <ArrowUpDown className="h-3 w-3" /></span>
              </th>
              {role === "admin" && <th className="text-right py-3 px-2 text-muted-foreground font-medium">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-2 text-muted-foreground">{new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                <td className="py-3 px-2 text-foreground">{tx.description}</td>
                <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{tx.category}</td>
                <td className={`py-3 px-2 text-right font-medium ${tx.type === "income" ? "text-success" : "text-foreground"}`}>
                  {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                </td>
                {role === "admin" && (
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => startEdit(tx)} className="p-1.5 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => onDelete(tx.id)} className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No transactions found.</p>}
      </div>
    </div>
  );
};

export default TransactionsTable;
