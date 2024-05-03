'use client'
import { useCallback, useEffect, useState, useRef } from 'react';

const mimeType = "audio/webm";

export default function Home() {
  const [permission, setPermission] = useState<"checking" | "denied" | "granted">("checking");
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<"recording" | "inactive">("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

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

      // Unique stream id event.srcElement.stream.id
      // chunk id: localAudioChunks.length
      localAudioChunks.push(event.data);
    };

    // Generate chunks for (near) real-time transcription
    setInterval(() => {
      if (mediaRecorder.current.state !== "inactive") {
        mediaRecorder.current.requestData();
      }
    }, 1000);

    setAudioChunks(localAudioChunks);
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
    </main>
  );
}
