import { Controller, Get, Logger } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import type { FileMessageDto } from './dto/file-message.dto';

@Controller()
export class WorkerController {
  private readonly logger = new Logger(WorkerController.name);
  constructor(private readonly workerService: WorkerService) { }

  @EventPattern('process_image')
  async getHello(@Payload() data: FileMessageDto) {
    this.logger.log('Desde micro servicio: ' + data.originalname);

    return this.workerService.fileManager(data);
  }
}
