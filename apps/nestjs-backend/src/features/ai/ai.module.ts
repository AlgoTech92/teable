import { Module } from '@nestjs/common';
import { SettingModule } from '../setting/setting.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  imports: [SettingModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
