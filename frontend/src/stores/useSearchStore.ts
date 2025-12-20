import { create } from "zustand";
import { DateRange } from "react-day-picker";

export type GuestType = "adults" | "children" | "infants" | "pets";

interface SearchState {
  location: string;
  date: DateRange | undefined;
  guests: Record<GuestType, number>;

  setLocation: (location: string) => void;
  setDate: (date: DateRange | undefined) => void;
  setGuests: (guests: Record<GuestType, number>) => void;
  updateGuest: (type: GuestType, delta: number) => void;
  reset: () => void;
  resetLocation: () => void;
  resetDate: () => void;
  resetGuests: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  location: "",
  date: undefined,
  guests: {
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  },

  setLocation: (location) => set({ location }),
  setDate: (date) => set({ date }),
  setGuests: (guests) => set({ guests }),
  updateGuest: (type, delta) =>
    set((state) => {
      const newValue = Math.max(0, state.guests[type] + delta);
      return {
        guests: {
          ...state.guests,
          [type]: newValue,
        },
      };
    }),
  reset: () =>
    set({
      location: "",
      date: undefined,
      guests: {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
      },
    }),
  resetLocation: () => set({ location: "" }),
  resetDate: () => set({ date: undefined }),
  resetGuests: () =>
    set({
      guests: {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
      },
    }),
}));
