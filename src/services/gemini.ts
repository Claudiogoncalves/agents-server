import { GoogleGenAI } from '@google/genai'

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mineType: string) {
  const response = await genAI.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o audio para o português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação e a formatação correta.',
      },
      {
        inlineData: {
          mimeType: mineType,
          data: audioAsBase64,
        },
      },
    ],
  })
  if (!response.text) {
    throw new Error('Nao foi possível transcrever o áudio')
  }

  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await genAI.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  })

  if (!response.embeddings?.[0].values) {
    throw new Error('Nao foi possível gerar os embeddings')
  }

  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n')

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergnuta de forma clara e precisa em portugues do Brasil.

    CONTEXTO: 
    ${context}


    PERGUNTA:
    ${question}

    INSTRUCOES: 
    - Use apenas infromacoes contidas no contexto enviado;
    - Se a resposta nao for encontrada no contexto, apenas responda que nao possui informacoes suficientes para responder;
    - Seja objetivo;
    - Mantenha um tom eductivo e profissional;
    - Cite trechos relevantes do contexto se apropriado;
    - Se for citar o contexto, utilize o termo "Conteudo da aula";
  
  `.trim()

  const response = await genAI.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('Falha ao gerar resposta pelo Gemini')
  }

  return response.text
}
