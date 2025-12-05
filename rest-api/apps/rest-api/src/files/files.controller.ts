import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Inject,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('files')
export class FilesController {
  private readonly logger = new Logger(FilesController.name);

  constructor(
    private readonly filesService: FilesService,
    @Inject('IMAGE_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    this.logger.log('File uploaded: ' + file.originalname);

    const fileData = {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer.toString('base64'), // Convertir a base64
    };

    // este emmit genra un id?
    // all estar en el servicio de colas? como puedo darle seguimiento y asegurarme que
    // realmente lo este cargando
    // por streming? o en trozos?
    // por ahora lo mantendre simple
    // TODO: recibir respuesta clara del serivcio y en el front mostrar que se cargo
    // TOOD: luego implementar un sistema de tracking del proceso
    this.client.emit('process_image', fileData);
    this.filesService.create(file);

    return {
      message: 'File uploaded successfully',
      data: {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      },
    };
  }
}
