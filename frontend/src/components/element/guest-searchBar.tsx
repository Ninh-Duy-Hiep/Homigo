import { motion } from "motion/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { useSearchStore } from "@/stores/useSearchStore";
import GuestCounter from "./guest-counter";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { useMemo } from "react";

type GuestSearchBarProps = {
  activeSection: "location" | "time" | "guests" | null;
  setActiveSection: (section: "location" | "time" | "guests" | null) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export function GuestSearchBar({ activeSection, setActiveSection, containerRef }: GuestSearchBarProps) {
  const { location, date, guests, updateGuest, resetGuests } = useSearchStore();

  const totalGuests = useMemo(() => {
    return Object.values(guests).reduce((acc, curr) => acc + curr, 0);
  }, [guests]);

  return (
    <div
      className={`flex-1 cursor-pointer relative h-full rounded-full transition-colors duration-200 ${
        !activeSection ? "hover:bg-gray-100" : activeSection !== "guests" ? "hover:bg-gray-200" : ""
      }`}
    >
      {activeSection === "guests" && (
        <motion.div
          layoutId="activeSection"
          className="absolute inset-0 bg-white shadow-lg rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <Popover open={activeSection === "guests"} onOpenChange={(open) => setActiveSection(open ? "guests" : null)}>
        <PopoverTrigger asChild>
          <div
            className={`relative z-10 flex items-center justify-between px-6 py-2 w-full h-full cursor-pointer text-left`}
          >
            <div className="flex flex-row items-center justify-between overflow-hidden mr-12 w-full">
              <div className="flex flex-col">
                <Label className="cursor-pointer text-sm font-bold px-1 block">Khách</Label>
                <div className="text-sm text-gray-600 truncate">
                  {totalGuests > 0 ? `${totalGuests} khách` : "Thêm khách"}
                </div>
              </div>
              {totalGuests > 0 && (
                <div
                  role="button"
                  tabIndex={0}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetGuests();
                  }}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-4"
          align="end"
          sideOffset={10}
          onInteractOutside={(e) => {
            if (containerRef.current && containerRef.current.contains(e.target as Node)) {
              e.preventDefault();
            }
          }}
        >
          <GuestCounter guests={guests} onChange={updateGuest} />
        </PopoverContent>
      </Popover>

      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
        <Button
          size="icon"
          className="rounded-full h-10 w-10 bg-primary text-white shadow-sm hover:scale-105 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            console.log({ location, date, guests });
          }}
        >
          <Search className="h-4 w-4 font-bold" />
        </Button>
      </div>
    </div>
  );
}
