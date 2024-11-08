import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';

@Module({
  imports: [ConfigModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
