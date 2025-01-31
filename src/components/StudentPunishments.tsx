import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface Punishment {
  id: string;
  type: string;
  description: string;
  date: string;
  status: "active" | "resolved";
}

export function StudentPunishments() {
  const [punishments] = useState<Punishment[]>([
    {
      id: "1",
      type: "Warning",
      description: "Late submission of assignment",
      date: "2024-02-20",
      status: "active",
    },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Punishments</h2>

      <Card>
        <CardHeader>
          <CardTitle>Punishment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {punishments.map((punishment) => (
                <TableRow key={punishment.id}>
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