// components/StatusSelector.tsx

"use client";

import { useStore } from "@/lib/store";
import { STATUS, UserStatus } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function StatusSelector() {
  const { currentUser, setUserStatus } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!currentUser) return null;

  const currentStatus = STATUS[currentUser.status];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-gray-200 hover:border-franca-green transition-all shadow-sm"
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: currentStatus.color }}
        ></span>
        <span className="font-medium text-sm text-gray-700">{currentStatus.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-48 animate-fade-in z-50">
          {(Object.entries(STATUS) as [UserStatus, typeof STATUS[UserStatus]][]).map(
            ([key, status]) => (
              <button
                key={key}
                onClick={() => {
                  setUserStatus(key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  currentUser.status === key ? "bg-franca-green/10" : ""
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: status.color }}
                ></span>
                <span className="text-sm font-medium text-gray-700">{status.label}</span>
                {currentUser.status === key && (
                  <span className="ml-auto text-franca-green">✓</span>
                )}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}