import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { MapPin, UploadCloud, ChartBar, DollarSign, Settings, LogOut, Calendar, FileVideo, MonitorPlay } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: MapPin, label: "Totems", href: "/" },
    { icon: Calendar, label: "Campanhas", href: "/campaigns" },
    { 
      icon: FileVideo, 
      label: "Media", 
      href: "/media",
      submenu: [
        { icon: UploadCloud, label: "Upload de Mídia", href: "/media/upload" },
        { icon: MonitorPlay, label: "Mídia Programática", href: "/media/programmatic" }
      ]
    },
    { icon: ChartBar, label: "Reports", href: "/reports" },
    { icon: DollarSign, label: "Finance", href: "/finance" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border/10">
          <SidebarContent>
            <SidebarGroup>
              <div className="p-4">
                <h1 className="text-xl font-semibold text-accent">DOOH Manager</h1>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      {item.submenu ? (
                        <div className="space-y-1">
                          <SidebarMenuButton
                            asChild
                            className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent hover:text-white rounded-md transition-colors"
                          >
                            <button>
                              <item.icon className="w-5 h-5" />
                              <span>{item.label}</span>
                            </button>
                          </SidebarMenuButton>
                          <div className="pl-4 space-y-1">
                            {item.submenu.map((subitem) => (
                              <SidebarMenuButton
                                key={subitem.label}
                                asChild
                                className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent hover:text-white rounded-md transition-colors w-full"
                                onClick={() => navigate(subitem.href)}
                              >
                                <button>
                                  <subitem.icon className="w-4 h-4" />
                                  <span>{subitem.label}</span>
                                </button>
                              </SidebarMenuButton>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent hover:text-white rounded-md transition-colors"
                          onClick={() => navigate(item.href)}
                        >
                          <button>
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </button>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4">
              <button className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-destructive rounded-md transition-colors w-full">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="container py-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}