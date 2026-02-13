import { Transaction, Category } from "@/types/transaction";

type TransactionListProps = {
  transactions: Transaction[];
  categories: Category[];
};

export function TransactionList({ transactions, categories }: TransactionListProps) {
  const getCategoryEmoji = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.emoji ?? "💳";
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name ?? "Otro";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <span className="text-6xl mb-4">🔍</span>
        <p className="text-lg">No hay transacciones</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <span className="text-3xl">
            {getCategoryEmoji(transaction.categoryId)}
          </span>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">
              {transaction.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {getCategoryName(transaction.categoryId)} · {formatDate(transaction.date)}
            </p>
          </div>

          <p
            className={`text-lg font-semibold tabular-nums ${
              transaction.type === "income"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}$
            {transaction.amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
