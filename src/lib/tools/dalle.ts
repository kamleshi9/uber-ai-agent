import { openai } from '../openai';

export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
    });

    return response.data?.[0]?.url ?? '';
  } catch (error) {
    throw new Error(`Failed to generate image: ${error}`);
  }
}
