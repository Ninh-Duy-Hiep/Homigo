"use client";

import React, { useState, useRef } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu, X } from "lucide-react";

export function MobileFloatingButton() {
  const { toggleSidebar, openMobile, isMobile } = useSidebar();

  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number }>({ startX: 0, startY: 0 });

  if (!isMobile) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX, startY: e.clientY };
    setIsDragging(false);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons > 0 || e.pointerType === "touch") {
      const deltaX = Math.abs(e.clientX - dragRef.current.startX);
      const deltaY = Math.abs(e.clientY - dragRef.current.startY);

      if (deltaX > 5 || deltaY > 5) {
        setIsDragging(true);
      }

      const newX = Math.min(Math.max(0, e.clientX - 24), window.innerWidth - 48);
      const newY = Math.min(Math.max(0, e.clientY - 24), window.innerHeight - 48);

      setPosition({ x: newX, y: newY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    (e.target as Element).releasePointerCapture(e.pointerId);
    if (!isDragging) {
      toggleSidebar();
    }
    setIsDragging(false);
  };

  return (
    <div
      className="fixed z-50 cursor-move touch-none"
      style={
        position
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              transition: isDragging ? "none" : "background-color 0.2s",
            }
          : {
              bottom: "100px",
              right: "20px",
              transition: "background-color 0.2s",
            }
      }
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <button
        className={`
          flex h-12 w-12 items-center justify-center rounded-full shadow-xl 
          transition-all duration-200 active:scale-95 border border-white/20
          ${openMobile ? "bg-red-500 hover:bg-red-600" : "bg-[#adacaf]"}
          text-white
        `}
      >
        {openMobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
}
