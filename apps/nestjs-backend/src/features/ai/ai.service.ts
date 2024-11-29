import { createOpenAI } from '@ai-sdk/openai';
import { Injectable } from '@nestjs/common';
import { streamText } from 'ai';
import { SettingService } from '../setting/setting.service';

export enum Task {
  Translation = 'translation',
  Coding = 'coding',
}

@Injectable()
export class AiService {
  constructor(private readonly settingService: SettingService) {}

  // eslint-disable-next-line @typescript-eslint/naming-convention
  static taskModelMap = {
    [Task.Coding]: 'codingModel',
    [Task.Translation]: 'translationModel',
  };

  private async getModelConfig(task: Task) {
    const { aiConfig } = await this.settingService.getSetting();
    // aiConfig?.codingModel model@provider
    const currentTaskModel = AiService.taskModelMap[task];
    const [model, provider] =
      (aiConfig?.[currentTaskModel as keyof typeof aiConfig] as string)?.split('@') || [];
    const llmProviders = aiConfig?.llmProviders || [];

    const providerConfig = llmProviders.find(
      (p) => p.name.toLowerCase() === provider.toLowerCase()
    );

    if (!providerConfig) {
      throw new Error('AI provider configuration is not set');
    }

    return { model, baseUrl: providerConfig.baseUrl, apiKey: providerConfig.apiKey };
  }

  async generate(prompt: string, task: Task = Task.Coding) {
    const { baseUrl, apiKey, model } = await this.getModelConfig(task);

    if (!baseUrl || !apiKey) {
      throw new Error('AI configuration is not set');
    }

    const openai = createOpenAI({
      baseURL: baseUrl,
      apiKey,
    });

    return await streamText({
      model: openai(model),
      prompt: prompt,
    });
  }
}
