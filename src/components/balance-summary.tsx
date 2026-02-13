import { Transaction } from "@/types/transaction";
import { Card, CardContent } from "@/components/ui/card";

type BalanceSummaryProps = {
  transactions: Transaction[];
};

export function BalanceSummary({ transactions }: BalanceSummaryProps) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  const cards = [
    {
      emoji: "💰",
      label: "Balance",
      amount: balance,
      color: balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400",
      bg: "bg-card",
    },
    {
      emoji: "📈",
      label: "Ingresos",
      amount: income,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-card",
    },
    {
      emoji: "📉",
      label: "Gastos",
      amount: expenses,
      color: "text-red-500 dark:text-red-400",
      bg: "bg-card",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.label}
          className={`${card.bg} border-0 shadow-sm hover:shadow-md transition-shadow duration-300`}
        >
          <CardContent className="flex items-center gap-3 p-5">
            <span className="text-4xl shrink-0">{card.emoji}</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">
                {card.label}
              </p>
              <p className={`text-xl font-bold tracking-tight truncate ${card.color}`}>
                ${card.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
