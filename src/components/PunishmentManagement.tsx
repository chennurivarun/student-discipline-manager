import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CreatePunishmentForm, PunishmentFormData } from "./CreatePunishmentForm";
import { usePunishments } from "./PunishmentContext";

export function PunishmentManagement() {
  const { punishments, addPunishment, togglePunishmentStatus } =
    usePunishments();

  const handleAddPunishment = (data: PunishmentFormData) => {
    addPunishment({
      studentId: data.studentId,
      studentName: data.studentName,
      type: data.type,
      description: data.description,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Punishment Management</h2>
        <CreatePunishmentForm onSuccess={handleAddPunishment} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Punishments</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {punishments.map((punishment) => (
                <TableRow key={punishment.id}>
                  <TableCell className="font-medium">
                    {punishment.studentId}
                  </TableCell>
                  <TableCell>{punishment.studentName}</TableCell>
                  <TableCell>{punishment.type}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {punishment.description}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {punishment.date}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`capitalize ${
                        punishment.status === "active"
                          ? "text-destructive font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {punishment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePunishmentStatus(punishment.id)}
                    >
                      {punishment.status === "active"
                        ? "Mark Resolved"
                        : "Mark Active"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
