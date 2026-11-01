"use client";

import React, { useState, useEffect } from "react";
import { X, Settings, Cpu, Database, Check, Sliders, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, updateProfile } = useAuth();
  const [engineMode, setEngineMode] = useState<"offline" | "ipc" | "http">(
    user?.settings?.defaultEngineMode || "offline"
  );
  const [resultsPerPage, setResultsPerPage] = useState<number>(
    user?.settings?.resultsPerPage || 10
  );
  const [telemetry, setTelemetry] = useState<boolean>(
    user?.settings?.enableTelemetry ?? true
  );
  const [emailNotifications, setEmailNotifications] = useState<boolean>(
    user?.settings?.emailNotifications ?? true
  );
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user?.settings) {
      setEngineMode(user.settings.defaultEngineMode || "offline");
      setResultsPerPage(user.settings.resultsPerPage || 10);
      setTelemetry(user.settings.enableTelemetry ?? true);
      setEmailNotifications(user.settings.emailNotifications ?? true);
    }
  }, [user, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      settings: {
        ...user.settings,
        defaultEngineMode: engineMode,
        resultsPerPage,
        enableTelemetry: telemetry,
        emailNotifications,
      },
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-semibold text-gray-900">Account Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Engine Execution Target */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Search Engine Target</span>
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "offline",
                  title: "Offline C++ Harness (Track B Strict)",
                  desc: "Zero network egress, SIMD vectorization, in-memory postings",
                },
                {
                  id: "ipc",
                  title: "Local IPC Socket Daemon",
                  desc: "Sub-millisecond stdio/named pipe streaming",
                },
                {
                  id: "http",
                  title: "Crow / HTTP REST Bridge",
                  desc: "Standard JSON payload adapter for networked queries",
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    engineMode === opt.id
                      ? "border-blue-600 bg-blue-50/50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="engineMode"
                    value={opt.id}
                    checked={engineMode === opt.id}
                    onChange={() => setEngineMode(opt.id as any)}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{opt.title}</div>
                    <div className="text-[11px] text-gray-500">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="pt-2 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-800">Results Per Page</div>
                <div className="text-[11px] text-gray-500">Number of ranked KWIC hits per page</div>
              </div>
              <select
                value={resultsPerPage}
                onChange={(e) => setResultsPerPage(Number(e.target.value))}
                className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2.5 py-1 text-gray-800 focus:outline-none"
              >
                <option value={5}>5 results</option>
                <option value={10}>10 results</option>
                <option value={20}>20 results</option>
                <option value={50}>50 results</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-800">Real-time Telemetry</div>
                <div className="text-[11px] text-gray-500">Record microsecond latency curves</div>
              </div>
              <input
                type="checkbox"
                checked={telemetry}
                onChange={(e) => setTelemetry(e.target.checked)}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
