"use client";

import { useState, useRef } from "react";
import { LayoutGroup } from "motion/react";
import { useSearchStore } from "@/stores/useSearchStore";
import { LocationSearchBar } from "./element/location-searchBar";
import { TimeSearchBar } from "./element/time-searchBar";
import { GuestSearchBar } from "./element/guest-searchBar";
import { cn } from "@/lib/utils";

export default function SearchBar({ className }: { className?: string }) {
  const { location, date, setLocation, setDate } = useSearchStore();

  const [activeSection, setActiveSection] = useState<"location" | "time" | "guests" | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn(className)}>
      <LayoutGroup id="search-bar-tabs">
        <div
          ref={searchBarRef}
          className={`flex items-center justify-between border rounded-full shadow-sm transition-all max-w-[850px] mx-auto w-full relative ${
            activeSection === null ? "bg-white" : "bg-gray-100/50"
          }`}
        >
          <LocationSearchBar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            location={location}
            setLocation={setLocation}
          />

          <TimeSearchBar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            date={date}
            setDate={setDate}
            containerRef={searchBarRef}
          />

          <GuestSearchBar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            containerRef={searchBarRef}
          />
        </div>
      </LayoutGroup>
    </div>
  );
}
