import { createOpenAI } from '@ai-sdk/openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { streamText } from 'ai';

@Injectable()
export class AiService {
  constructor(private readonly configService: ConfigService) {}

  async generate(prompt: string) {
    const openAIBaseUrl = this.configService.get<string>('OPENAI_BASE_URL');
    const openaiApiKey = this.configService.get<string>('OPENAI_API_KEY');
    const openai = createOpenAI({
      baseURL: openAIBaseUrl,
      apiKey: openaiApiKey,
    });
    return await streamText({
      model: openai('gpt-4o-mini'),
      prompt: prompt,
    });
  }
}
