
import { useAuth } from "@/contexts/AuthContext";
import { Home, ClipboardList, UserCircle, LogOut } from "lucide-react";
import { StudentDashboard } from "@/components/StudentDashboard";
import { StaffDashboard } from "@/components/StaffDashboard";
import { PunishmentManagement } from "@/components/PunishmentManagement";
import { StudentPunishments } from "@/components/StudentPunishments";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type View = "overview" | "punishments" | "profile";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<View>("overview");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
      <div className="p-4 md:p-6 fade-in">
        <h2 className="text-2xl font-bold mb-4 slide-in">Profile</h2>
        <div className="space-y-4 glass-card p-4 md:p-6 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="p-4 glass-card bg-white/80 dark:bg-black/20 backdrop-blur-sm border-b animate-in slide-in-from-top duration-500">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold">{isMobile ? "SM" : "Student Management"}</h2>
          <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
        </div>
      </header>

      <main className="flex-1 p-4 container mx-auto max-w-4xl">
        {renderContent()}
      </main>

      {/* macOS-style bottom bar */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 glass-card dark:bg-black/40 bg-white/80 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 shadow-lg animate-in slide-in-from-bottom duration-500 px-2">
        <div className="flex items-center justify-around space-x-2 p-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setCurrentView(item.view)}
              className={cn(
                "flex flex-col items-center p-2 rounded-full transition-all duration-300 hover:scale-110 min-w-[4rem]",
                currentView === item.view 
                  ? "bg-primary/20 text-primary scale-105" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              )}
            >
              <item.icon className="h-6 w-6 animate-in fade-in duration-700" />
              <span className="text-xs mt-1 hidden md:block">{item.label}</span>
            </button>
          ))}
          <div className="w-px h-8 bg-border mx-2" />
          <button
            onClick={handleLogout}
            className="flex flex-col items-center p-2 rounded-full transition-all duration-300 hover:scale-110 text-destructive hover:text-destructive/80 hover:bg-destructive/10 min-w-[4rem]"
          >
            <LogOut className="h-6 w-6 animate-in fade-in duration-700" />
            <span className="text-xs mt-1 hidden md:block">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
