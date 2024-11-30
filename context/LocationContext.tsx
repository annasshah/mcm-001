// contexts/LocationContext.tsx
"use client";

import { createContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface LocationContextType {
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
}

// Create the context with a default value of `null`
// Use `LocationContextType | null` as type so it can start as `null`
export const LocationContext = createContext<any>(null);

// Define the props for the provider
interface LocationProviderProps {
  children: ReactNode;
}

// Location provider component
export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
