import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { content } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant. Your goal is to generate a short title for a note the user wants to store on an app of notes." },
        { role: "user", content },
      ],
      model: "gpt-3.5-turbo",
      tools: [
        {
          type: "function",
          function: {
            name: "set_title",
            description: "Sets the title for the note which content was provided by the user.",
            parameters: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Title for the note."
                }
              },
              required: ["title"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "set_title" } }
    });

    let noteTitle;
    response.choices[0].message.tool_calls?.forEach((call) => {
      const { title } = JSON.parse(call.function.arguments);
      noteTitle = title;
    });

    return Response.json({ title: noteTitle }, { status: 200 });
  } catch (error) {
    return Response.json({ title: "New note" }, { status: 200 });
  }
}
