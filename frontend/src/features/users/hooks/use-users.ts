"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/axios";
import { useDebounce } from "@/hooks/use-debounce";
import { ApiResponse } from "@/types/api";
import { User, UserFilter } from "../types";
import { usersService } from "../api/users.service";

export function useUsers() {
  const [users, setUsers] = useState<ApiResponse<User[]>>();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<UserFilter>({ page: 1, limit: 10, search: "" });
  const { success, error } = useToast();

  const debouncedName = useDebounce(filters.search, 500);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);

      const apiFilters = {
        page: filters.page,
        limit: filters.limit,
        ...(debouncedName ? { search: debouncedName } : {}),
      };

      const response = await usersService.getUsers(apiFilters);
      setUsers(response || []);
    } catch (err) {
      error("Error", { description: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  }, [filters.page, filters.limit, debouncedName, error]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const deleteUser = async (id: string) => {
    try {
      success("Deleted", { description: "User deleted successfully" });
      loadUsers();
    } catch (err) {
      error("Error", { description: getErrorMessage(err) });
    }
  };

  const setFilter = (newFilter: Partial<UserFilter>) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  return {
    users,
    loading,
    filters,
    setFilter,
    refresh: loadUsers,
    deleteUser,
  };
}
