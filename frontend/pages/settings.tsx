import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Bell, Shield, CreditCard, User } from "lucide-react";

export default function Settings() {
  const settingsSections = [
    {
      icon: User,
      title: "Perfil",
      description: "Gerencie suas informações pessoais e preferências",
    },
    {
      icon: Bell,
      title: "Notificações",
      description: "Configure como você quer ser notificado",
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Gerencie senhas e autenticação em duas etapas",
    },
    {
      icon: CreditCard,
      title: "Faturamento",
      description: "Gerencie seus métodos de pagamento e faturas",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        </div>

        <div className="grid gap-6">
          {settingsSections.map((section) => (
            <Card 
              key={section.title} 
              className="premium-card hover:border-accent/50 cursor-pointer transition-all"
            >
              <div className="p-6 flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <section.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
