import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function askLLM(
  question: string,
  history: { role: "user" | "assistant" | "system"; content: string }[] = []
) {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    ...history,
    { role: "user", content: question },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  return completion.choices[0].message.content || "No se encontró respuesta.";
}
