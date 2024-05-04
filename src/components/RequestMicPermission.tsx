import React from 'react';
import { Mic } from 'lucide-react';

import { usePermission } from '@/context/PermissionContext';
import { Button } from '@/components/ui/Button';

const RequestMicPermission = () => {
  const { requestMicrophonePermission } = usePermission();

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex flex-col items-center gap-4">
        <Mic size={32} />
        <p className="text-center">
          To transcribe your voice notes, we need microphone access.
        </p>
      </div>
      <Button onClick={requestMicrophonePermission}>
        Allow
      </Button>
    </div>
  );
};

export {
  RequestMicPermission
};