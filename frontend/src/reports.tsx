import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, Filter, Monitor, Users, Clock } from "lucide-react";

interface TotemReport {
  id: string;
  name: string;
  location: string;
  dailyViews: {
    date: string;
    views: number;
  }[];
  audienceData: {
    age: string;
    percentage: number;
  }[];
  peakHours: {
    hour: string;
    views: number;
  }[];
}

export default function Reports() {
  const selectedTotem: TotemReport = {
    id: "1",
    name: "Totem do Shopping",
    location: "Entrada Principal",
    dailyViews: [
      { date: '01/03', views: 4000 },
      { date: '07/03', views: 3000 },
      { date: '14/03', views: 2000 },
      { date: '21/03', views: 2780 },
      { date: '28/03', views: 1890 },
    ],
    audienceData: [
      { age: "18-24", percentage: 30 },
      { age: "25-34", percentage: 45 },
      { age: "35-44", percentage: 15 },
      { age: "45+", percentage: 10 },
    ],
    peakHours: [
      { hour: "10h", views: 250 },
      { hour: "12h", views: 420 },
      { hour: "14h", views: 380 },
      { hour: "16h", views: 520 },
      { hour: "18h", views: 650 },
      { hour: "20h", views: 480 },
    ],
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <div className="flex gap-4">
            <button className="premium-button">
              <Filter className="w-5 h-5" />
              Filtrar
            </button>
            <button className="premium-button">
              <Download className="w-5 h-5" />
              Exportar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="premium-card">
            <div className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative w-48 h-64 bg-secondary/50 rounded-lg flex flex-col items-center justify-center">
                  <Monitor className="w-24 h-24 text-accent mb-4" />
                  <div className="text-center">
                    <h3 className="font-semibold">{selectedTotem.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTotem.location}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-4">Visualizações por Período</h2>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedTotem.dailyViews}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
                        <XAxis dataKey="date" stroke="#E0E0E0" />
                        <YAxis stroke="#E0E0E0" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1C2526',
                            border: '1px solid #2E2E2E',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="views" 
                          stroke="#00A3E0" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="premium-card">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-semibold">Perfil do Público</h2>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedTotem.audienceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
                      <XAxis dataKey="age" stroke="#E0E0E0" />
                      <YAxis stroke="#E0E0E0" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1C2526',
                          border: '1px solid #2E2E2E',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="percentage" fill="#00A3E0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            <Card className="premium-card">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-semibold">Horários de Pico</h2>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedTotem.peakHours}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
                      <XAxis dataKey="hour" stroke="#E0E0E0" />
                      <YAxis stroke="#E0E0E0" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1C2526',
                          border: '1px solid #2E2E2E',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="views" fill="#00A3E0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
