// app/office/page.tsx
"use client";

import dynamic from "next/dynamic";

const Office = dynamic(() => import("@/components/Office"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-franca-green mx-auto mb-4"></div>
        <p className="text-white text-lg">Carregando Franca Office...</p>
      </div>
    </div>
  ),
});

export default function OfficePage() {
  return <Office />;
}
