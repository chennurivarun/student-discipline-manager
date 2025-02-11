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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Punishment Management</h2>
        <CreatePunishmentForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Punishments</CardTitle>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {punishments.map((punishment) => (
                <TableRow key={punishment.id}>
                  <TableCell className="font-medium">{punishment.studentId}</TableCell>
                  <TableCell>{punishment.studentName}</TableCell>
                  <TableCell>{punishment.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{punishment.description}</TableCell>
                  <TableCell className="hidden sm:table-cell">{punishment.date}</TableCell>
                  <TableCell>
                    <span className={`capitalize ${punishment.status === 'active' ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
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
