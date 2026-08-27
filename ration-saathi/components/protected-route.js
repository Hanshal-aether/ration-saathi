"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("ration_saathi_logged_in") === "true";
      if (!isLoggedIn) {
        router.replace("/login");
        return;
      }
      setIsReady(true);
    }
  }, [router]);

  if (!isReady) return null;

  return children;
}
