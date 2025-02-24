// Campaigns.tsx - Página de gerenciamento de campanhas
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Play, Pause, BarChart3, Signal, Target, Ban, Eye, BrainCircuit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "scheduled" | "ended" | "paused" | "draft";
  startDate: string;
  endDate: string;
  totem: string;
  audience: string;
  impressions: number;
  budget?: number;
  totalSpent?: number;
  targetDemographic?: string[];
  schedule?: string;
  priority?: "high" | "medium" | "low";
  aiOptimized?: boolean;
  content?: string[];
}

export default function Campaigns() {
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Campanha de Verão 2024",
      status: "active",
      startDate: "01/03/2024",
      endDate: "30/04/2024",
      totem: "Totem do Shopping",
      audience: "Jovens 18-35",
      impressions: 15420,
      budget: 5000,
      totalSpent: 2340,
      targetDemographic: ["18-25", "25-35"],
      schedule: "8h às 22h",
      priority: "high",
      aiOptimized: true,
      content: ["video_verao.mp4", "promo_verao.jpg"]
    },
    {
      id: "2",
      name: "Promoção Outono",
      status: "scheduled",
      startDate: "01/05/2024",
      endDate: "30/06/2024",
      totem: "Totem da Praça de Alimentação",
      audience: "Famílias",
      impressions: 0,
      budget: 3000,
      priority: "medium",
      content: ["promo_outono.mp4"]
    },
    {
      id: "3",
      name: "Black Friday 2024",
      status: "draft",
      startDate: "25/11/2024",
      endDate: "27/11/2024",
      totem: "Todos os Totems",
      audience: "Compradores",
      impressions: 0,
      budget: 10000,
      priority: "high",
      aiOptimized: true,
      content: ["black_friday.mp4", "ofertas.jpg"]
    },
    {
      id: "4",
      name: "Festival Gastronômico",
      status: "active",
      startDate: "15/03/2024",
      endDate: "15/04/2024",
      totem: "Totem Praça de Alimentação",
      audience: "Foodies",
      impressions: 8750,
      budget: 4000,
      totalSpent: 1800,
      schedule: "11h às 22h",
      priority: "medium",
      content: ["festival.mp4"]
    },
    {
      id: "5",
      name: "Campanha Institucional",
      status: "paused",
      startDate: "01/01/2024",
      endDate: "31/12/2024",
      totem: "Todos os Totems",
      audience: "Geral",
      impressions: 45200,
      budget: 15000,
      totalSpent: 3750,
      priority: "low",
      content: ["institucional.mp4"]
    },
    {
      id: "6",
      name: "Lançamento Coleção Inverno",
      status: "scheduled",
      startDate: "01/06/2024",
      endDate: "31/07/2024",
      totem: "Totem Setor Moda",
      audience: "Fashion",
      impressions: 0,
      budget: 7000,
      aiOptimized: true,
      priority: "high",
      content: ["colecao_inverno.mp4", "lookbook.jpg"]
    },
    {
      id: "7",
      name: "Cinema Programação Semanal",
      status: "active",
      startDate: "01/03/2024",
      endDate: "07/03/2024",
      totem: "Totem Cinema",
      audience: "Cinéfilos",
      impressions: 3200,
      schedule: "13h às 23h",
      priority: "medium",
      content: ["cinema_prog.mp4"]
    },
    {
      id: "8",
      name: "Dia das Mães 2024",
      status: "draft",
      startDate: "01/05/2024",
      endDate: "12/05/2024",
      totem: "Todos os Totems",
      audience: "Famílias",
      impressions: 0,
      budget: 8000,
      aiOptimized: true,
      priority: "high",
      content: ["maes_2024.mp4", "ofertas_maes.jpg"]
    },
    {
      id: "9",
      name: "Happy Hour Restaurantes",
      status: "active",
      startDate: "01/03/2024",
      endDate: "31/03/2024",
      totem: "Totem Praça de Alimentação",
      audience: "Jovens Profissionais",
      impressions: 5600,
      schedule: "17h às 20h",
      priority: "medium",
      content: ["happy_hour.mp4"]
    },
    {
      id: "10",
      name: "Programação Fitness",
      status: "active",
      startDate: "01/03/2024",
      endDate: "31/03/2024",
      totem: "Totem Academia",
      audience: "Praticantes de Exercícios",
      impressions: 4200,
      schedule: "6h às 22h",
      priority: "low",
      content: ["fitness_prog.mp4"]
    },
    {
      id: "11",
      name: "Liquidação de Estoque",
      status: "ended",
      startDate: "15/02/2024",
      endDate: "29/02/2024",
      totem: "Todos os Totems",
      audience: "Geral",
      impressions: 25000,
      budget: 5000,
      totalSpent: 5000,
      priority: "high",
      content: ["liquidacao.mp4"]
    },
    {
      id: "12",
      name: "Eventos do Mês",
      status: "active",
      startDate: "01/03/2024",
      endDate: "31/03/2024",
      totem: "Totem Central",
      audience: "Geral",
      impressions: 7800,
      priority: "medium",
      content: ["eventos.mp4"]
    }
  ];

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "ended":
        return "bg-gray-500";
      case "paused":
        return "bg-yellow-500";
      case "draft":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "Ativa";
      case "scheduled":
        return "Agendada";
      case "ended":
        return "Finalizada";
      case "paused":
        return "Pausada";
      case "draft":
        return "Rascunho";
      default:
        return status;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Campanhas</h1>
          <button className="premium-button">Nova Campanha</button>
        </div>

        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="premium-card">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">{campaign.name}</h2>
                        <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                          {getStatusText(campaign.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {campaign.status === "active" ? (
                          <button className="p-2 text-accent hover:text-accent/80 transition-colors">
                            <Pause className="w-5 h-5" />
                          </button>
                        ) : campaign.status === "scheduled" || campaign.status === "paused" ? (
                          <button className="p-2 text-accent hover:text-accent/80 transition-colors">
                            <Play className="w-5 h-5" />
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{campaign.totem}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{campaign.audience}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {campaign.budget && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Signal className="w-4 h-4" />
                            <span>Budget: R$ {campaign.budget.toLocaleString()}</span>
                          </div>
                        )}
                        {campaign.totalSpent && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <BarChart3 className="w-4 h-4" />
                            <span>Gasto: R$ {campaign.totalSpent.toLocaleString()}</span>
                          </div>
                        )}
                        {campaign.schedule && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>Horário: {campaign.schedule}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        {campaign.priority && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Target className="w-4 h-4" />
                            <span>Prioridade: {campaign.priority}</span>
                          </div>
                        )}
                        {campaign.impressions > 0 && (
                          <div className="flex items-center gap-2 text-accent">
                            <Eye className="w-4 h-4" />
                            <span>Impressões: {campaign.impressions.toLocaleString()}</span>
                          </div>
                        )}
                        {campaign.aiOptimized && (
                          <div className="flex items-center gap-2 text-accent">
                            <BrainCircuit className="w-4 h-4" />
                            <span>Otimizado por IA</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {campaign.content && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">
                          Conteúdo: {campaign.content.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
