export type TransactionType = "income" | "expense";

export type Category = {
  id: string;
  name: string;
  emoji: string;
  type: TransactionType;
};

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
};
