import { motion } from "motion/react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useSearchStore } from "@/stores/useSearchStore";
import { Calendar } from "../ui/calendar";
import { vi } from "date-fns/locale";

type TimeSearchBarProps = {
  activeSection: "location" | "time" | "guests" | null;
  setActiveSection: (section: "location" | "time" | "guests" | null) => void;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export function TimeSearchBar({ activeSection, setActiveSection, date, setDate, containerRef }: TimeSearchBarProps) {
  const { resetDate } = useSearchStore();

  return (
    <div
      className={`flex-1 cursor-pointer relative h-full rounded-full transition-colors duration-200 ${
        !activeSection ? "hover:bg-gray-100" : activeSection !== "time" ? "hover:bg-gray-200" : ""
      }`}
    >
      {activeSection === "time" && (
        <motion.div
          layoutId="activeSection"
          className="absolute inset-0 bg-white shadow-lg rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <Popover open={activeSection === "time"} onOpenChange={(open) => setActiveSection(open ? "time" : null)}>
        <PopoverTrigger asChild>
          <div
            className={`relative z-10 flex flex-row justify-between items-center px-6 py-2 w-full h-full cursor-pointer text-left`}
          >
            <div>
              <Label className="cursor-pointer text-sm font-bold px-1 block">Thời gian</Label>
              <div className="text-sm text-gray-600 truncate">
                {date?.from
                  ? date.to
                    ? `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
                    : format(date.from, "dd/MM/yyyy")
                  : "Thêm ngày"}
              </div>
            </div>
            {date && (
              <div
                role="button"
                tabIndex={0}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  resetDate();
                }}
              >
                <X className="w-4 h-4 text-gray-500" />
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 animate-none!"
          align="center"
          sideOffset={10}
          onInteractOutside={(e) => {
            if (containerRef.current && containerRef.current.contains(e.target as Node)) {
              e.preventDefault();
            }
          }}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={vi}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
