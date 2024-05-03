'use client'
import React from 'react';

import { usePermission } from '@/context/PermissionContext';
import { CreateNote } from '@/components/CreateNote';
import { RequestMicPermission } from '@/components/RequestMicPermission';

const NoteAccessControl = () => {
  const { permission } = usePermission();

  switch (permission) {
    case 'loading':
      return null;

    case "prompt":
      return <RequestMicPermission />;

    case "granted":
      return (
        <CreateNote />
      );

    case "denied":
      // Todo: Provide instructions to allow access if denied previously
      return (
        <h1 className="text-2xl text-center">
          We need access to your microphone!
        </h1>
      );

    case "unavailable":
      return (
        <h1 className="text-2xl">
          Sorry, you can&apos;t use this app!
        </h1>
      );

    default:
      return <RequestMicPermission />;
  }
};

export {
  NoteAccessControl
};