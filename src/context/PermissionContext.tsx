import React, { createContext, useContext, useState, ReactNode } from 'react';

type PermissionStatus = "checking" | "denied" | "granted" | "unavailable";

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
  const [permission, setPermission] = useState<PermissionStatus>("checking");

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
  };

  return (
    <PermissionContext.Provider value={{ permission, requestMicrophonePermission }}>
      {children}
    </PermissionContext.Provider>
  );
};