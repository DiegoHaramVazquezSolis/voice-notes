import OpenAI, { toFile } from "openai";
import https from "https";
import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { url, streamId, partialTranscription, type } = await req.json();

  const buffer: Buffer = await new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const data: Buffer[] = [];
      res.on("data", chunk => data.push(chunk));
      res.on("end", () => resolve(Buffer.concat(data)));
      res.on("error", reject);
    });
  });

  try {
    const file = await toFile(buffer, `${streamId}.${type.split("/")[1]}`, { type });

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      prompt: partialTranscription
    });

    return Response.json({ transcription: transcription.text }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}

export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse("", {
    status: 200
  })
}
