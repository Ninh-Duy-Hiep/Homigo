"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { GuestType } from "@/stores/useSearchStore";

interface GuestCounterProps {
  guests: Record<GuestType, number>;
  onChange: (type: GuestType, delta: number) => void;
}

export default function GuestCounter({ guests, onChange }: GuestCounterProps) {
  const guestLabels: Record<GuestType, string> = {
    adults: "Người lớn",
    children: "Trẻ em",
    infants: "Em bé",
    pets: "Thú cưng",
  };

  const guestSubLabel: Record<GuestType, string> = {
    adults: "Từ 13 tuổi trở lên",
    children: "Từ 2 - 12 tuổi",
    infants: "Dưới 2 tuổi",
    pets: "Thú cưng đi cùng",
  };

  return (
    <div className="flex flex-col gap-4">
      {(["adults", "children", "infants", "pets"] as GuestType[]).map((type) => (
        <div key={type} className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{guestLabels[type]}</span>
            <span className="text-sm text-muted-foreground">{guestSubLabel[type]}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => onChange(type, -1)}
              disabled={guests[type] <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-4 text-center">{guests[type]}</span>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => onChange(type, 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
