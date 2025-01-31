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
} from "@/components/ui/sidebar";
import { Home, ClipboardList, UserCircle, Settings, LogOut } from "lucide-react";
import { StudentDashboard } from "@/components/StudentDashboard";
import { StaffDashboard } from "@/components/StaffDashboard";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const studentMenuItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: ClipboardList, label: "Punishments", href: "/dashboard/punishments" },
    { icon: UserCircle, label: "Profile", href: "/dashboard/profile" },
  ];

  const staffMenuItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: ClipboardList, label: "Manage Punishments", href: "/dashboard/punishments" },
    { icon: UserCircle, label: "Students", href: "/dashboard/students" },
  ];

  const menuItems = user?.role === "student" ? studentMenuItems : staffMenuItems;

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
                    <SidebarMenuButton asChild>
                      <a href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
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
        <main className="flex-1 p-6">
          {user?.role === "student" ? <StudentDashboard /> : <StaffDashboard />}
        </main>
      </div>
    </SidebarProvider>
  );
}