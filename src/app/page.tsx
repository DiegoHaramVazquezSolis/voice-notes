'use client'
import { useCallback, useEffect, useState, useRef } from 'react';

import { uploadChunk } from '@/services/storage';

const mimeType = "audio/webm";

export default function Home() {
  const [permission, setPermission] = useState<"checking" | "denied" | "granted">("checking");
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<"recording" | "inactive">("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [transcription, setTranscription] = useState("");

  const getMicrophonePermission = useCallback(async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission("granted");
        setStream(streamData);
      } catch (err) {
        setPermission("denied");
      }
    } else {
      // MediaRecorder API not supported in browser
    }
  }, []);

  useEffect(() => {
    getMicrophonePermission();
  }, [getMicrophonePermission]);

  const startRecording = async () => {
    setRecordingStatus("recording");

    const media = new MediaRecorder(stream!, {
      mimeType,
    });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    const localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = async (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;

      localAudioChunks.push(event.data);

      const eventTarget = event.target as MediaRecorder;

      try {
        // Not actually chunks, but the full audio every time. Two reasons for that:
        // 1. It gets a better transcription
        // 2. Couldn't find a way to handle each chunk independently
        const chunkUrl = await uploadChunk(localAudioChunks, eventTarget.stream.id);

        const response = await fetch('/api/stt', {
          method: 'POST',
          body: JSON.stringify({
            url: chunkUrl,
            streamId: eventTarget.stream.id,
          }),
        });

        if (response.status === 200) {
          const { transcription } = await response.json();
          setTranscription(transcription);
        }
      } catch (error) {
      }
    };

    // Request data every certain time to get (near) real-time transcription
    setInterval(() => {
      if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
        mediaRecorder.current.requestData();
      }
    }, 750);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  return (
    <main className="mx-auto w-full h-screen max-w-lg p-24 flex flex-col">
      {permission === "checking" ?
        <div>
          Loading
        </div>
        :
        null
      }
      {permission === "denied" ?
        <button className="bg-slate-50 p-4 text-slate-950 font-bold rounded-md m-4" onClick={getMicrophonePermission} type="button">
          Get Microphone
        </button>
        :
        null
      }
      {permission === "granted" && recordingStatus === "inactive" ?
        <button className="bg-slate-50 p-4 text-slate-950 font-bold rounded-md m-4" onClick={startRecording} type="button">
          Start Recording
        </button>
        :
        null
      }
      {recordingStatus === "recording" ?
        <button className="bg-slate-50 p-4 text-slate-950 font-bold rounded-md m-4" onClick={stopRecording} type="button">
          Stop Recording
        </button>
        :
        null
      }
      <h1 className="text-slate-50 text-2xl">
        {transcription}
      </h1>
    </main>
  );
}
