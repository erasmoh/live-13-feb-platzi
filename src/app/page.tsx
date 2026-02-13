"use client";

import { useState } from "react";
import { Transaction, TransactionType, Category } from "@/types/transaction";
import { mockTransactions, categories as defaultCategories } from "@/data/mock-transactions";
import { BalanceSummary } from "@/components/balance-summary";
import { TransactionList } from "@/components/transaction-list";
import { TransactionFilter } from "@/components/transaction-filter";
import { TransactionForm } from "@/components/transaction-form";
import { CategoryForm } from "@/components/category-form";
import { ThemeToggle } from "@/components/theme-toggle";

type FilterOption = "all" | TransactionType;

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [filter, setFilter] = useState<FilterOption>("all");

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const handleAddCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-4xl mr-2">💰</span>
              Mis Finanzas
            </h1>
            <p className="mt-1 text-muted-foreground">
              Controla tus ingresos y gastos
            </p>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <CategoryForm onAdd={handleAddCategory} />
            <TransactionForm onAdd={handleAddTransaction} categories={categories} />
          </div>
        </header>

        <section className="mb-8">
          <BalanceSummary transactions={transactions} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Transacciones</h2>
            <TransactionFilter activeFilter={filter} onFilterChange={setFilter} />
          </div>
          <TransactionList transactions={sortedTransactions} categories={categories} />
        </section>
        <footer className="mt-12 border-t pt-6 pb-4 text-center text-sm text-muted-foreground">
          Hecho con mucho ❤️ en un live de Platzi
        </footer>
      </div>
    </div>
  );
}
