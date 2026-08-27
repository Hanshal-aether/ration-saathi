"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LangCtx = createContext();
const StateCtx = createContext();

export const useLang = () => useContext(LangCtx);
export const useStateContext = () => useContext(StateCtx);

const STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Ladakh"];

export function Providers({ children }) {
  const [lang, setLang] = useState("en");
  const [state, setState] = useState(null);
  const [stateSelected, setStateSelected] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("ration_saathi_state");
      const savedStateSelected = localStorage.getItem("ration_saathi_state_selected");
      if (savedState) {
        setState(savedState);
        setStateSelected(savedStateSelected === "true");
      }
      setIsHydrated(true);
    }
  }, []);

  const updateState = (newState) => {
    setState(newState);
    localStorage.setItem("ration_saathi_state", newState);
    localStorage.setItem("ration_saathi_state_selected", "true");
    setStateSelected(true);
  };

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <StateCtx.Provider value={{ state, setState: updateState, stateSelected, setStateSelected, allStates: STATES, isHydrated }}>
        {children}
      </StateCtx.Provider>
    </LangCtx.Provider>
  );
}
