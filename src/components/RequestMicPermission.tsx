import React from 'react';
import { Mic } from 'lucide-react';

import { usePermission } from '@/context/PermissionContext';

const RequestMicPermission = () => {
  const { requestMicrophonePermission } = usePermission();

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex flex-col items-center gap-4">
        <Mic size={32} />
        <p className="text-center">
          To transcribe your voice notes, we need microspanhone access.
        </p>
      </div>
      <button
        className="flex flex-col items-center gap-4 py-2.5  rounded-md text-slate-950 bg-slate-50 hover:bg-slate-50/80 transition-colors w-full"
        onClick={requestMicrophonePermission}>
        Allow
      </button>
    </div>
  );
};

export {
  RequestMicPermission
};