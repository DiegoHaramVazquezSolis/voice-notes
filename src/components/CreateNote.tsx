import React, { useRef, useState } from "react";
import { Mic, Save } from "lucide-react";
import { toast } from "sonner";

import { useNotes } from "@/context/NotesContext";
import { uploadChunk } from "@/services/storage";
import { Button } from "@/components/ui/Button";

const mimeType = "audio/webm";

const CreateNote = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<"recording" | "inactive">("inactive");
  const [transcription, setTranscription] = useState("");
  const { addNote } = useNotes();

  const startRecording = async () => {
    setRecordingStatus("recording");

    const streamData = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    const media = new MediaRecorder(streamData, {
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

        const response = await fetch("/api/stt", {
          method: "POST",
          body: JSON.stringify({
            url: chunkUrl,
            streamId: eventTarget.stream.id,
            partialTranscription: transcription,
          }),
        });

        if (response.status === 200) {
          const { transcription: updatedTranscription } = await response.json();
          setTranscription(updatedTranscription);
        }
      } catch (error) {
      }
    };

    // Request data every certain time to get (near) real-time transcription
    let interval: number | undefined = undefined;
    interval = setInterval(() => {
      if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
        mediaRecorder.current.requestData();
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  const saveNote = () => {
    addNote(transcription);
    setTranscription("");

    toast.success("Note saved!");
  };

  const isRecording = recordingStatus === "recording"
  const buttonStyle = isRecording ? "animate-pulse scale-125" : "scale-100"
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen w-screen gap-8">
      <div className="flex justify-center items-center w-1/2">
        <button
          className={`bg-slate-50 hover:bg-slate-50/90 transition-all ease-in-out duration-500 h-[20vh] w-[20vh] ${buttonStyle} rounded-full flex items-center justify-center`}
          onClick={isRecording ? stopRecording : startRecording}>
          <Mic className="text-slate-950" size={48} />
        </button>
      </div>
      <div className="w-1/2">
        <div className="flex items-center mx-auto p-4 shadow-lg rounded-lg text-center">
          {transcription && isRecording ?
            <p>{transcription}</p>
            :
            null
          }
          {transcription && !isRecording ?
            <div className="flex flex-col gap-2 items-start">
              <textarea className="bg-transparent border-slate-800 border-2 rounded-lg p-2" cols={50} rows={10} value={transcription} onChange={(e) => setTranscription(e.target.value)} />
              <Button onClick={saveNote}>
                <Save />
                Save note
              </Button>
            </div>
            :
            null
          }
          {!transcription && !isRecording ?
            <p>Press the button and start talking to create a note.</p>
            :
            null
          }
        </div>
      </div>
    </div>
  );
};

export {
  CreateNote
};