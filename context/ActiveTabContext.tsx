"use client";

// context code
import { createContext, useState } from "react";

export const TabContext = createContext<any>(null);

export const ActiveTabProvider = ({ children }: any) => {
  const [activeTitle, setActiveTitle] = useState("");

  return (
    <TabContext.Provider value={{ activeTitle, setActiveTitle }}>
      {children}
    </TabContext.Provider>
  );
};
