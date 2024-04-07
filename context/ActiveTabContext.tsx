"use client";

// context code
import { createContext, useState } from "react";

export const TabContext = createContext<any>(null);

export const ActiveTabProvider = ({ children }: any) => {
  const [activeTitle, setActiveTitle] = useState("");
  const [pageViewsByPeriod, setPageViewsByPeriod] = useState("");
  const [pageViewsByDay, setPageViewsByDay] = useState("");
  const [pageViewsByWeek, setPageViewsByWeek] = useState("");

  return (
    <TabContext.Provider value={{ activeTitle, setActiveTitle,pageViewsByPeriod, setPageViewsByPeriod }}>
      {children}
    </TabContext.Provider>
  );
};
