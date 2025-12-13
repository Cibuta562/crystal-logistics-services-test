"use client";

import { createContext, useContext, useMemo, useState } from "react";

type QuoteFormContextValue = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const QuoteFormContext = createContext<QuoteFormContextValue | undefined>(
  undefined
);

export function QuoteFormProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo<QuoteFormContextValue>(
    () => ({
      open,
      openModal: () => setOpen(true),
      closeModal: () => setOpen(false),
    }),
    [open]
  );

  return (
    <QuoteFormContext.Provider value={value}>
      {children}
    </QuoteFormContext.Provider>
  );
}

export function useQuoteForm(): QuoteFormContextValue {
  const ctx = useContext(QuoteFormContext);
  if (!ctx) {
    throw new Error("useQuoteForm must be used within <QuoteFormProvider>");
  }
  return ctx;
}
