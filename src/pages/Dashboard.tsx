import { useAuth } from "@/contexts/AuthContext";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Home, ClipboardList, UserCircle, Settings, LogOut } from "lucide-react";
import { StudentDashboard } from "@/components/StudentDashboard";
import { StaffDashboard } from "@/components/StaffDashboard";
import { PunishmentManagement } from "@/components/PunishmentManagement";
import { StudentPunishments } from "@/components/StudentPunishments";
import { useState } from "react";

type View = "overview" | "punishments" | "profile";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<View>("overview");

  const studentMenuItems = [
    { icon: Home, label: "Overview", view: "overview" as const },
    { icon: ClipboardList, label: "Punishments", view: "punishments" as const },
    { icon: UserCircle, label: "Profile", view: "profile" as const },
  ];

  const staffMenuItems = [
    { icon: Home, label: "Overview", view: "overview" as const },
    { icon: ClipboardList, label: "Manage Punishments", view: "punishments" as const },
    { icon: UserCircle, label: "Profile", view: "profile" as const },
  ];

  const menuItems = user?.role === "student" ? studentMenuItems : staffMenuItems;

  const renderContent = () => {
    if (currentView === "overview") {
      return user?.role === "student" ? <StudentDashboard /> : <StaffDashboard />;
    }
    if (currentView === "punishments") {
      return user?.role === "student" ? <StudentPunishments /> : <PunishmentManagement />;
    }
    return <div>Profile view coming soon</div>;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Student Management</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      onClick={() => setCurrentView(item.view)}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={logout} className="flex items-center gap-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}