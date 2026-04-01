export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

export type Role = "viewer" | "admin";

export const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-03-01", description: "Salary Deposit", category: "Salary", amount: 5200, type: "income" },
  { id: "2", date: "2026-03-02", description: "Grocery Store", category: "Food & Dining", amount: 142.5, type: "expense" },
  { id: "3", date: "2026-03-03", description: "Electric Bill", category: "Bills & Utilities", amount: 89.99, type: "expense" },
  { id: "4", date: "2026-03-05", description: "Uber Ride", category: "Transportation", amount: 24.5, type: "expense" },
  { id: "5", date: "2026-03-06", description: "Netflix Subscription", category: "Entertainment", amount: 15.99, type: "expense" },
  { id: "6", date: "2026-03-07", description: "Freelance Payment", category: "Freelance", amount: 1200, type: "income" },
  { id: "7", date: "2026-03-08", description: "Restaurant Dinner", category: "Food & Dining", amount: 67.8, type: "expense" },
  { id: "8", date: "2026-03-10", description: "Gas Station", category: "Transportation", amount: 45.0, type: "expense" },
  { id: "9", date: "2026-03-11", description: "Online Shopping", category: "Shopping", amount: 199.99, type: "expense" },
  { id: "10", date: "2026-03-12", description: "Pharmacy", category: "Healthcare", amount: 32.5, type: "expense" },
  { id: "11", date: "2026-03-14", description: "Dividend Income", category: "Investment", amount: 350, type: "income" },
  { id: "12", date: "2026-03-15", description: "Gym Membership", category: "Healthcare", amount: 49.99, type: "expense" },
  { id: "13", date: "2026-03-16", description: "Coffee Shop", category: "Food & Dining", amount: 18.75, type: "expense" },
  { id: "14", date: "2026-03-18", description: "Movie Tickets", category: "Entertainment", amount: 28.0, type: "expense" },
  { id: "15", date: "2026-03-20", description: "Internet Bill", category: "Bills & Utilities", amount: 59.99, type: "expense" },
  { id: "16", date: "2026-03-22", description: "Clothing Store", category: "Shopping", amount: 156.0, type: "expense" },
  { id: "17", date: "2026-03-25", description: "Freelance Project", category: "Freelance", amount: 800, type: "income" },
  { id: "18", date: "2026-03-27", description: "Groceries", category: "Food & Dining", amount: 98.3, type: "expense" },
  { id: "19", date: "2026-03-28", description: "Car Insurance", category: "Bills & Utilities", amount: 125.0, type: "expense" },
  { id: "20", date: "2026-03-30", description: "Concert Tickets", category: "Entertainment", amount: 85.0, type: "expense" },
];

export const monthlyData = [
  { month: "Oct", balance: 12400, income: 5800, expenses: 3200 },
  { month: "Nov", balance: 14200, income: 6200, expenses: 4800 },
  { month: "Dec", balance: 13100, income: 5500, expenses: 6600 },
  { month: "Jan", balance: 15800, income: 7200, expenses: 4500 },
  { month: "Feb", balance: 16500, income: 6800, expenses: 5100 },
  { month: "Mar", balance: 18250, income: 7550, expenses: 5800 },
];
