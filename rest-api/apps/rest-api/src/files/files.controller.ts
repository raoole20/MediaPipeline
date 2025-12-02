import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Inject,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    @Inject('IMAGE_SERVICE')
    private readonly client: ClientProxy,
  ) { }

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

    this.client.emit('process_image', file);

    return this.filesService.create(file);
  }
}
