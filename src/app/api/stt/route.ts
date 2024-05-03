import OpenAI from "openai";
import fs from "fs";
import path from "path";
import https from "https";
import type { NextApiRequest } from "next"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextApiRequest) {
  const { url, streamId } = await req.json();

  const tempFilePath = path.join(process.cwd(), `public/voice-notes/${streamId}.webm`);

  await fs.promises.mkdir(path.dirname(tempFilePath), { recursive: true });

  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(tempFilePath);
    https.get(url, function(response) {
      response.pipe(fileStream);
      response.on('end', resolve);
      response.on('error', reject);
    });
  });

  const fileStream = fs.createReadStream(tempFilePath);
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fileStream,
      model: "whisper-1",
    });

    try {
      await fs.promises.unlink(tempFilePath);
    } catch (error) {
      console.log("\n== error ==\n", error, "\n");
      // File not found
    }

    return Response.json({ transcription: transcription.text }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}