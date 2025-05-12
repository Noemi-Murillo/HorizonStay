import fs from 'fs';
import path from 'path';
import stringSimilarity from 'string-similarity';

const knowledgePath = path.join(process.cwd(), 'src', 'data', 'knowledge.json');
const unsolvedPath = path.join(process.cwd(), 'src', 'data', 'unsolved.json');

type KnowledgeData = {
  [intent: string]: {
    examples: string[];
    responses: string[];
  };
};

type UnsolvedEntry = {
  question: string;
  added: string;
  reviewed: boolean;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '') 
    .replace(/[¿?!¡.,;]/g, '')     
    .trim();
}

export function getBotResponse(message: string): string {
  const normalizedMsg = normalize(message);
  let knowledge: KnowledgeData = {};

  if (fs.existsSync(knowledgePath)) {
    try {
      knowledge = JSON.parse(fs.readFileSync(knowledgePath, 'utf-8'));
    } catch (error) {
      console.error("Error al leer knowledge.json:", error);
      knowledge = {};
    }
  }

  let bestResponse = "";
  let bestScore = 0;

  for (const [intent, entry] of Object.entries(knowledge)) {
    const result = stringSimilarity.findBestMatch(
      normalizedMsg,
      entry.examples.map(k => normalize(k))
    );
    const best = result.bestMatch;

    if (best.rating > bestScore) {
      bestScore = best.rating;
      bestResponse = entry.responses[Math.floor(Math.random() * entry.responses.length)];
    }
  }

  if (bestScore >= 0.5) {
    return bestResponse;
  } else if (bestScore >= 0.3) {
    return `🤔 No estoy seguro, pero podría estar relacionado con esto:\n"${bestResponse}"`;
  }

  storeUnsolved(message);
  return "Lo siento, aún no tengo una respuesta para eso.";
}

function storeUnsolved(question: string) {
  let pending: UnsolvedEntry[] = [];

  if (fs.existsSync(unsolvedPath)) {
    try {
      pending = JSON.parse(fs.readFileSync(unsolvedPath, 'utf-8'));
    } catch (error) {
      console.error("Error al leer unsolved.json:", error);
      pending = [];
    }
  }

  const alreadyExists = pending.some(
    (entry) => normalize(entry.question) === normalize(question)
  );

  if (!alreadyExists) {
    pending.push({
      question,
      added: new Date().toISOString(),
      reviewed: false
    });

    try {
      fs.writeFileSync(unsolvedPath, JSON.stringify(pending, null, 2), 'utf-8');
    } catch (error) {
      console.error("Error al guardar en unsolved.json:", error);
    }
  }
}
