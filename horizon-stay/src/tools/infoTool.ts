import { askLLM } from '@/services/openai';

type ToolResponse = {
  content: { type: "text"; text: string }[];
};

export async function infoTool(input: { pregunta: string }): Promise<ToolResponse> {
  const answer = await askLLM(input.pregunta);

  return {
    content: [
      {
        type: "text",
        text: answer,
      },
    ],
  };
}
