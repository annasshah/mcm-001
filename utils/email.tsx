"use client";
import { useContext } from "react";
import { TabContext } from "@/context/ActiveTabContext";

export const useSelectedEmails = () => {
  const { selectedEmails } = useContext(TabContext);
  const emails = selectedEmails;
  return emails;
};
