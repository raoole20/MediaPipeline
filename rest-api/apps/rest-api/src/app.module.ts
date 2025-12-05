import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FilesModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
