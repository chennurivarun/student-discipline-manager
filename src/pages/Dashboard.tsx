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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type View = "overview" | "punishments" | "profile";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<View>("overview");
  const navigate = useNavigate();

  const studentMenuItems = [
    { icon: Home, label: "Overview", view: "overview" as const },
    { icon: ClipboardList, label: "My Punishments", view: "punishments" as const },
    { icon: UserCircle, label: "Profile", view: "profile" as const },
  ];

  const staffMenuItems = [
    { icon: Home, label: "Overview", view: "overview" as const },
    { icon: ClipboardList, label: "Manage Punishments", view: "punishments" as const },
    { icon: UserCircle, label: "Profile", view: "profile" as const },
  ];

  const menuItems = user?.role === "student" ? studentMenuItems : staffMenuItems;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const renderContent = () => {
    if (currentView === "overview") {
      return user?.role === "student" ? <StudentDashboard /> : <StaffDashboard />;
    }
    if (currentView === "punishments") {
      return user?.role === "student" ? <StudentPunishments /> : <PunishmentManagement />;
    }
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">ID</p>
            <p className="font-medium">{user?.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Department</p>
            <p className="font-medium">{user?.department}</p>
          </div>
          {user?.role === 'student' && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="font-medium">{user?.year}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Semester</p>
                <p className="font-medium">{user?.semester}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Student Management</h2>
            <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      onClick={() => setCurrentView(item.view)}
                      className={`flex items-center gap-2 w-full ${
                        currentView === item.view ? 'text-primary' : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 w-full text-destructive">
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
