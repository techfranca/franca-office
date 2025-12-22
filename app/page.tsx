// app/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-franca-navy">
      <div className="text-center">
        <div className="animate-pulse-slow text-6xl mb-4">🏢</div>
        <p className="text-franca-green text-xl font-semibold">
          Carregando Franca Office...
        </p>
      </div>
    </div>
  );
}
