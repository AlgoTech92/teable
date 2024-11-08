import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AiService } from './ai.service';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}
  @Post()
  async generate(@Body('prompt') prompt: string, @Res() res: Response) {
    const result = await this.aiService.generate(prompt);
    result.pipeTextStreamToResponse(res);
  }
}
