"use client";

import { useUsers } from "../hooks/use-users";
import { UserList } from "./user-list";
import { UserFormDialog } from "./user-form-dialog";
import { useState } from "react";
import { UserFilters } from "./user-filters";
import { User } from "../types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function UserView() {
  const { users, loading, filters, setFilter, refresh, deleteUser } = useUsers();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreate = () => {
    setSelectedUser(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsSheetOpen(true);
  };

  const handleFormSubmit = async (values: any) => {
    console.log("Submit:", values);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users Management</h2>
          <p className="text-muted-foreground">Manage your system users and their permissions here.</p>
        </div>

        <Button onClick={handleCreate} className="w-full md:w-auto">
          <Plus className="h-5 w-5" /> Add New User
        </Button>
      </div>

      <UserFilters filters={filters} onFilterChange={setFilter} />

      <UserList data={users} isLoading={loading} onEdit={handleEdit} onDelete={deleteUser} />

      <UserFormDialog
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        userToEdit={selectedUser}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
