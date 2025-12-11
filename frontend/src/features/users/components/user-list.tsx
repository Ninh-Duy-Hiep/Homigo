"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { ApiResponse } from "@/types/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "../types";

interface UserListProps {
  data?: ApiResponse<User[]>;
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export function UserList({ data, isLoading, onEdit, onDelete }: UserListProps) {
  if (data?.data?.length === 0) {
    return <div className="text-center py-10 text-gray-500">No users found.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.data?.map((user) => (
        <Card key={user?.id}>
          <CardHeader className="flex flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-lg">{user?.fullName}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <div className="flex flex-row flex-wrap gap-2 justify-end">
              <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => onDelete(user?.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            {/* <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 rounded-full">{user?.role}</span> */}
          </CardHeader>
          <CardContent className="flex gap-2"></CardContent>
        </Card>
      ))}
    </div>
  );
}
