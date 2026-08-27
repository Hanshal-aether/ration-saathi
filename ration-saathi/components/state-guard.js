"use client";
import { useStateContext } from "./providers";
import { ComingSoonScreen } from "./coming-soon";

export function StateGuard({ children }) {
  const { state } = useStateContext();
  
  if (state !== "Maharashtra") {
    return <ComingSoonScreen />;
  }
  
  return children;
}
