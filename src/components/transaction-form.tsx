"use client";

import { useState } from "react";
import { Transaction, TransactionType, Category } from "@/types/transaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TransactionFormProps = {
  onAdd: (transaction: Transaction) => void;
  categories: Category[];
};

export function TransactionForm({ onAdd, categories }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TransactionType>("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const filteredCategories = categories.filter((c) => c.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !categoryId || !date) return;

    const transaction: Transaction = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      type,
      categoryId,
      date,
    };

    onAdd(transaction);
    setDescription("");
    setAmount("");
    setCategoryId("");
    setDate(new Date().toISOString().split("T")[0]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="rounded-full px-6 shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <span className="text-lg mr-1">➕</span> Agregar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            <span className="text-2xl mr-2">💳</span>
            Nueva transaccion
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setType("expense");
                setCategoryId("");
              }}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-all duration-200 ${
                type === "expense"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              📉 Gasto
            </button>
            <button
              type="button"
              onClick={() => {
                setType("income");
                setCategoryId("");
              }}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-all duration-200 ${
                type === "income"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              📈 Ingreso
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripcion</Label>
            <Input
              id="description"
              placeholder="Ej: Almuerzo con amigos"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Selecciona una categoria" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {filteredCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="rounded-lg">
                    <span className="mr-2">{cat.emoji}</span>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full py-6 text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            Guardar transaccion
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
