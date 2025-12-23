import { motion } from "motion/react";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { useSearchStore } from "@/stores/useSearchStore";
import { useTranslations } from "next-intl";

type LocationSearchBarProps = {
  activeSection: "location" | "time" | "guests" | null;
  setActiveSection: (section: "location" | "time" | "guests" | null) => void;
  location: string;
  setLocation: (location: string) => void;
};

export function LocationSearchBar({ activeSection, setActiveSection, location, setLocation }: LocationSearchBarProps) {
  const { resetLocation } = useSearchStore();
  const tHeader = useTranslations("Header");

  return (
    <div
      className={`flex-1 relative h-full rounded-full transition-colors duration-200 ${
        !activeSection ? "hover:bg-gray-100" : activeSection !== "location" ? "hover:bg-gray-200" : ""
      }`}
      onClick={() => setActiveSection("location")}
    >
      {activeSection === "location" && (
        <motion.div
          layoutId="activeSection"
          className="absolute inset-0 bg-white shadow-lg rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <div className="relative z-10 flex items-center justify-between px-6 py-2 w-full h-full cursor-pointer">
        <div>
          <Label className="cursor-pointer text-sm font-bold block">{tHeader("SearchBar.location")}</Label>
          <input
            type="text"
            className="text-sm text-gray-600 truncate bg-transparent outline-none placeholder:text-gray-600 w-full cursor-pointer"
            placeholder={tHeader("SearchBar.locationPlaceholder")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setActiveSection("location")}
          />
        </div>
        {location.trim() !== "" && (
          <div
            role="button"
            tabIndex={0}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors z-20"
            onClick={(e) => {
              e.stopPropagation();
              resetLocation();
            }}
          >
            <X className="w-4 h-4 text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}
