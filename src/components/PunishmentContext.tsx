import React, { createContext, useContext, useState } from "react";

export type PunishmentStatus = "active" | "resolved";

export interface Punishment {
  id: string;
  studentId: string;
  studentName: string;
  type: string;
  description: string;
  date: string;
  status: PunishmentStatus;
}

interface PunishmentContextType {
  punishments: Punishment[];
  addPunishment: (data: Omit<Punishment, "id" | "date" | "status">) => void;
  togglePunishmentStatus: (id: string) => void;
}

const PunishmentContext = createContext<PunishmentContextType | undefined>(
  undefined
);

export const usePunishments = () => {
  const context = useContext(PunishmentContext);
  if (!context) {
    throw new Error(
      "usePunishments must be used within a PunishmentProvider"
    );
  }
  return context;
};

export const PunishmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [punishments, setPunishments] = useState<Punishment[]>([]);

  const addPunishment = (
    data: Omit<Punishment, "id" | "date" | "status">
  ) => {
    const newPunishment: Punishment = {
      id: new Date().toISOString(), // simple unique id
      studentId: data.studentId,
      studentName: data.studentName,
      type: data.type,
      description: data.description,
      date: new Date().toISOString().split("T")[0],
      status: "active",
    };
    setPunishments((prev) => [newPunishment, ...prev]);
  };

  const togglePunishmentStatus = (id: string) => {
    setPunishments((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "resolved" : "active" }
          : p
      )
    );
  };

  return (
    <PunishmentContext.Provider
      value={{ punishments, addPunishment, togglePunishmentStatus }}
    >
      {children}
    </PunishmentContext.Provider>
  );
};
