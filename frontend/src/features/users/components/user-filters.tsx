"use client";

import { Input } from "@/components/ui/input";
import { UserFilter } from "../types";
import { Search } from "lucide-react";

interface UserFiltersProps {
  filters: UserFilter;
  onFilterChange: (newFilters: Partial<UserFilter>) => void;
}

export function UserFilters({ filters, onFilterChange }: UserFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      
      <div className="flex items-center gap-2 w-full md:w-auto flex-1">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full pl-9"
            value={filters.search || ""}
            onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })} 
          />
        </div>
        
      </div>

    </div>
  );
}