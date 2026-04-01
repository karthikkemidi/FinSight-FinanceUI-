import { useState, useMemo, useRef } from "react";
import { Search, ArrowUpDown, Plus, Pencil, Trash2, Upload } from "lucide-react";
import { Transaction, categories, type Role } from "@/data/mockData";

interface TransactionsTableProps {
  transactions: Transaction[];
  role: Role;
  onAdd: (t: Omit<Transaction, "id">) => void;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
  onImport: (items: Omit<Transaction, "id">[]) => void;
}

const TransactionsTable = ({ transactions, role, onAdd, onEdit, onDelete, onImport }: TransactionsTableProps) => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState<"date" | "amount">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [showForm, setShowForm] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [groupingView, setGroupingView] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: categories[0],
    amount: "",
    type: "expense" as "income" | "expense",
  });

  const filtered = useMemo(() => {
    const result = transactions.filter((t) => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === "all" || t.type === filterType;
      const matchCategory = filterCategory === "all" || t.category === filterCategory;
      const matchStart = !startDate || new Date(t.date) >= new Date(startDate);
      const matchEnd = !endDate || new Date(t.date) <= new Date(endDate);
      return matchSearch && matchType && matchCategory && matchStart && matchEnd;
    });
    result.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortField === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });
    return result;
  }, [transactions, search, filterType, filterCategory, startDate, endDate, sortField, sortDir]);

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

  const grouped = useMemo(() => {
    const map = new Map<string, { total: number; count: number; income: number; expense: number }>();
    filtered.forEach((t) => {
      const entry = map.get(t.category) ?? { total: 0, count: 0, income: 0, expense: 0 };
      entry.total += t.amount * (t.type === "income" ? 1 : -1);
      entry.count += 1;
      entry[t.type] += t.amount;
      map.set(t.category, entry);
    });
    return Array.from(map.entries()).map(([category, v]) => ({ category, ...v })).sort((a, b) => b.total - a.total);
  }, [filtered]);

  const handleImportFile = async (file: File) => {
    const text = await file.text();
    const ext = file.name.toLowerCase();
    let items: Omit<Transaction, "id">[] = [];
    try {
      if (ext.endsWith(".json")) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          items = parsed
            .map((t) => ({
              date: t.date,
              description: t.description,
              category: t.category,
              amount: Number(t.amount),
              type: t.type,
            }))
            .filter((t) => t.date && t.description && t.category && !Number.isNaN(t.amount) && (t.type === "income" || t.type === "expense"));
        }
      } else if (ext.endsWith(".csv")) {
        const lines = text.trim().split(/\r?\n/);
        const [, ...rows] = lines;
        items = rows
          .map((line) => line.split(","))
          .map(([date, description, category, amount, type]) => ({
            date: date?.trim(),
            description: description?.trim(),
            category: category?.trim(),
            amount: Number(amount),
            type: type?.trim() as "income" | "expense",
          }))
          .filter((t) => t.date && t.description && t.category && !Number.isNaN(t.amount) && (t.type === "income" || t.type === "expense"));
      }
    } catch (e) {
      console.error("Failed to import file", e);
      return;
    }
    if (items.length) onImport(items);
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
            onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}
            className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Start date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="End date"
          />
          {role === "admin" && (
            <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Add
            </button>
          )}
          {role === "admin" && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json"
                className="hidden"
                id="top-import-trigger"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImportFile(file);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-secondary text-foreground border border-border hover:bg-accent transition-colors"
              >
                <Upload className="h-4 w-4" /> Import CSV/JSON
              </button>
            </>
          )}
          <button
            onClick={() => setGroupingView((v) => !v)}
            className="px-3 py-2 text-sm rounded-lg bg-secondary text-foreground border border-border hover:bg-accent transition-colors"
          >
            {groupingView ? "View transactions" : "Group by category"}
          </button>
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
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as "income" | "expense" })} className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
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

      {groupingView ? (
        <div className="glass-card p-4 border border-border mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Category grouping</h4>
            <span className="text-xs text-muted-foreground">Totals (income - expense)</span>
          </div>
          {grouped.length === 0 && <p className="text-sm text-muted-foreground">No data for current filters.</p>}
          <div className="space-y-2">
            {grouped.map((g) => (
              <div key={g.category} className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{g.category}</span>
                  <span className="text-xs text-muted-foreground">
                    {g.count} item{g.count === 1 ? "" : "s"} · Income ${g.income.toFixed(2)} · Expense ${g.expense.toFixed(2)}
                  </span>
                </div>
                <span className={`text-sm font-semibold ${g.total >= 0 ? "text-success" : "text-destructive"}`}>
                  {g.total >= 0 ? "+" : "-"}${Math.abs(g.total).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

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
              <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors transition-transform duration-150 hover:-translate-y-[1px]">
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
