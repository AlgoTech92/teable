import { Controller, Param, Patch } from '@nestjs/common';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { AdminService } from './admin.service';

@Controller('api/admin')
@Permissions('instance|update')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('/plugin/:pluginId/publish')
  async publishPlugin(@Param('pluginId') pluginId: string): Promise<void> {
    await this.adminService.publishPlugin(pluginId);
  }
}
