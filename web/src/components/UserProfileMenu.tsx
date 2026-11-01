"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  User as UserIcon,
  LogOut,
  Settings,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAuth, getInitials } from "@/lib/auth-context";
import { AuthModal } from "./AuthModal";
import { UserProfileModal } from "./UserProfileModal";
import { AccountSettingsModal } from "./AccountSettingsModal";
import { PageView } from "./Navbar";

interface UserProfileMenuProps {
  setCurrentView?: (view: PageView) => void;
  className?: string;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  setCurrentView,
  className = "",
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Unauthenticated State: Display Google-style "Sign In" CTA
  if (!isAuthenticated || !user) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setShowAuthModal(true)}
          title="Sign in to IndexX"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm hover:shadow transition"
        >
          <UserIcon className="w-3.5 h-3.5" />
          <span>Sign in</span>
        </button>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  // Authenticated State: Dynamic Avatar & Account Dropdown Menu
  return (
    <div ref={menuRef} className={`relative ${className}`}>
      {/* Trigger Button: User Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={`${user.name} (${user.email})`}
        aria-label="User Account Menu"
        className="w-8 h-8 rounded-full overflow-hidden text-white flex items-center justify-center font-semibold text-xs shadow-sm hover:ring-2 hover:ring-blue-300 focus:outline-none transition shrink-0"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs tracking-wider">
            {getInitials(user.name)}
          </div>
        )}
      </button>

      {/* Account Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 text-xs text-gray-700 space-y-3.5">
          {/* User Profile Card Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-100 shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                {getInitials(user.name)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-gray-900 text-sm truncate">
                {user.name}
              </div>
              <div className="text-gray-500 text-xs truncate" title={user.email}>
                {user.email}
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-[10px] text-blue-600 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>Authenticated Session</span>
              </div>
            </div>
          </div>

          {/* Account Menu Actions */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setShowProfileModal(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-700 transition group"
            >
              <div className="flex items-center gap-2.5">
                <UserIcon className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition" />
                <span className="font-medium">My Profile</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={() => {
                setShowSettingsModal(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-700 transition group"
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition" />
                <span className="font-medium">Account Settings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Preserved Engine Connection & Corpus Target Sections */}
          <div className="p-2.5 rounded-xl bg-gray-50/80 border border-gray-100 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-500">Engine Connection:</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Offline Harness
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-500">Corpus Target:</span>
              <span className="font-mono text-gray-800 font-medium">
                250 MB / 50k queries
              </span>
            </div>
          </div>

          {/* Benchmark Lab Shortcut (Preserved) */}
          {setCurrentView && (
            <div>
              <button
                onClick={() => {
                  setCurrentView("benchmark");
                  setIsOpen(false);
                }}
                className="w-full text-center py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 font-medium text-gray-700 transition"
              >
                Manage Benchmark Lab
              </button>
            </div>
          )}

          {/* Sign Out Option */}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-red-600 hover:bg-red-50 font-medium transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
      <AccountSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
};
