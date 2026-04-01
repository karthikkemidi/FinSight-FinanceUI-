import { mockTransactions, monthlyData, Transaction } from "@/data/mockData";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTransactions = async (): Promise<Transaction[]> => {
  // Simulate network latency between 450-850ms
  await wait(450 + Math.random() * 400);
  const saved = localStorage.getItem("fin-transactions");
  if (saved) {
    try {
      return JSON.parse(saved) as Transaction[];
    } catch (e) {
      console.warn("Failed to parse stored transactions, falling back to mocks", e);
    }
  }
  return mockTransactions;
};

export const fetchMonthlySeries = async () => {
  await wait(300 + Math.random() * 300);
  return monthlyData;
};
