"use client";

import React from "react";
import { useAuth } from "@/components/context/AuthContext";

export default function UserInfo() {
  const { user } = useAuth();

  return (
    <div className="px-6 mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm">
            {user?.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
      </div>
    </div>
  );
}