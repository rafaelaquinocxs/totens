import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Plus } from "lucide-react";

export default function Finance() {
  const transactions = [
    {
      id: 1,
      description: "Pagamento Premium - Totem #45",
      amount: 1500.00,
      type: "income",
      date: "22/03/2024",
    },
    {
      id: 2,
      description: "Manutenção - Totem #32",
      amount: 350.00,
      type: "expense",
      date: "21/03/2024",
    },
    {
      id: 3,
      description: "Pagamento Basic - Totem #28",
      amount: 800.00,
      type: "income",
      date: "20/03/2024",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
          <button className="premium-button">
            <Plus className="w-5 h-5" />
            Nova Transação
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="premium-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-accent/10 rounded-full">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Receitas (Mês)</p>
                <h2 className="text-2xl font-bold">R$ 15.800,00</h2>
              </div>
            </div>
          </Card>
          
          <Card className="premium-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-destructive/10 rounded-full">
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Despesas (Mês)</p>
                <h2 className="text-2xl font-bold">R$ 4.200,00</h2>
              </div>
            </div>
          </Card>
        </div>

        <Card className="premium-card">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`font-medium ${
                    transaction.type === 'income' 
                      ? 'text-accent' 
                      : 'text-destructive'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    R$ {transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
