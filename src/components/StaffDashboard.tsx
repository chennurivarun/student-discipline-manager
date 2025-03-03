import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePunishments } from "./PunishmentContext";

export function StaffDashboard() {
  const { user } = useAuth();
  const { punishments } = usePunishments();

  // Calculate active cases and unique students based on current punishments
  const activeCasesCount = punishments.filter(
    (p) => p.status === "active"
  ).length;
  const totalStudentsCount = new Set(
    punishments.map((p) => p.studentId)
  ).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Staff Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Staff Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-muted-foreground">Staff ID</dt>
                <dd className="text-base font-medium">{user?.id}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Department</dt>
                <dd className="text-base font-medium">{user?.department}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Cases</span>
              <span className="text-2xl font-bold">{activeCasesCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Students</span>
              <span className="text-2xl font-bold">
                {totalStudentsCount}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
