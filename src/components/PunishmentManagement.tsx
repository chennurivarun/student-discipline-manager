import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreatePunishmentForm } from "./CreatePunishmentForm";

interface Punishment {
  id: string;
  studentId: string;
  studentName: string;
  type: string;
  description: string;
  date: string;
  status: "active" | "resolved";
}

export function PunishmentManagement() {
  const [punishments] = useState<Punishment[]>([
    {
      id: "1",
      studentId: "STU001",
      studentName: "John Doe",
      type: "Warning",
      description: "Late submission of assignment",
      date: "2024-02-20",
      status: "active",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Punishment Management</h2>
        <CreatePunishmentForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Punishments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {punishments.map((punishment) => (
                <TableRow key={punishment.id}>
                  <TableCell>{punishment.studentId}</TableCell>
                  <TableCell>{punishment.studentName}</TableCell>
                  <TableCell>{punishment.type}</TableCell>
                  <TableCell>{punishment.description}</TableCell>
                  <TableCell>{punishment.date}</TableCell>
                  <TableCell>
                    <span className={`capitalize ${punishment.status === 'active' ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {punishment.status}
                    </span>
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