import { TransactionType } from "@/types/transaction";

type FilterOption = "all" | TransactionType;

type TransactionFilterProps = {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
};

const filters: { value: FilterOption; label: string; emoji: string }[] = [
  { value: "all", label: "Todos", emoji: "📋" },
  { value: "income", label: "Ingresos", emoji: "📈" },
  { value: "expense", label: "Gastos", emoji: "📉" },
];

export function TransactionFilter({
  activeFilter,
  onFilterChange,
}: TransactionFilterProps) {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.value
              ? "bg-foreground text-background shadow-md"
              : "bg-card text-muted-foreground hover:bg-muted shadow-sm"
          }`}
        >
          <span className="text-base">{filter.emoji}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
}
