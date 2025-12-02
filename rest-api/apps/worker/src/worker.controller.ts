import { Controller, Get } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) { }

  @EventPattern('process_image') // debe conincidir con el emit del servicio a
  async getHello(@Payload() data: any) {
    console.log(data);

    // logica aqui:
    // 1. recibir la imagen
    // 2. rediemnsionar
    // 2. procesar la imagen
    // 3. guardar la imagen
    // 4. enviar la imagen al servicio de storage
    // 5. enviar la imagen al servicio de catalogo
    return this.workerService.getHello();
  }
}
