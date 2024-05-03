'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type PermissionStatus = "loading" | "prompt" | "denied" | "granted" | "unavailable";

interface PermissionContextType {
  permission: PermissionStatus;
  requestMicrophonePermission: () => Promise<void>;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }
  return context;
};

export const PermissionProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [permission, setPermission] = useState<PermissionStatus>("loading");

  useEffect(() => {
    async function queryMicPermission() {
      if ("MediaRecorder" in window) {
        try {
          const res = await navigator.permissions.query({ name: "microphone" });
          setPermission(res.state);
        } catch (err) {
          setPermission("denied");
        }
      } else {
        setPermission("unavailable");
      }
    }

    queryMicPermission();
  }, []);

  const requestMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        setPermission("granted");
      } catch (err) {
        setPermission("denied");
      }
    } else {
      setPermission("unavailable");
    }
  }

  return (
    <PermissionContext.Provider value={{ permission, requestMicrophonePermission }}>
      {children}
    </PermissionContext.Provider>
  );
};