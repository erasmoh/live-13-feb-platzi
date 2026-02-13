"use client";

import { useState } from "react";
import { Category, TransactionType } from "@/types/transaction";
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

type CategoryFormProps = {
  onAdd: (category: Category) => void;
};

const emojiOptions = [
  "💼", "💻", "📈", "🎁", "🍔", "🚗", "🏠", "🎬",
  "💊", "🛍️", "📚", "📱", "✈️", "🎮", "🐶", "⚽",
  "🎵", "💇", "🧹", "🔧", "☕", "🍕", "🏋️", "🎨",
  "💡", "🚌", "🏥", "👶", "💐", "🎂", "🧾", "💸",
];

export function CategoryForm({ onAdd }: CategoryFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [type, setType] = useState<TransactionType>("expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !emoji) return;

    const category: Category = {
      id: name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      name,
      emoji,
      type,
    };

    onAdd(category);
    setName("");
    setEmoji("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full px-6 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <span className="text-lg mr-1">🏷️</span> Nueva categoria
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            <span className="text-2xl mr-2">🏷️</span>
            Nueva categoria
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType("expense")}
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
              onClick={() => setType("income")}
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
            <Label htmlFor="cat-name">Nombre</Label>
            <Input
              id="cat-name"
              placeholder="Ej: Mascotas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Icono</Label>
            <div className="grid grid-cols-8 gap-2">
              {emojiOptions.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`flex items-center justify-center rounded-xl p-2 text-2xl transition-all duration-150 ${
                    emoji === e
                      ? "bg-foreground text-background shadow-md scale-110"
                      : "bg-muted hover:bg-muted/70"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {emoji && name && (
            <div className="flex items-center gap-3 rounded-2xl bg-muted p-4">
              <span className="text-3xl">{emoji}</span>
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">
                  {type === "income" ? "Ingreso" : "Gasto"}
                </p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={!name || !emoji}
            className="w-full rounded-full py-6 text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            Crear categoria
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
